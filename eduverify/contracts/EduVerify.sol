// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EduVerify is Ownable {
    constructor() Ownable(msg.sender) {}

    struct Certificate {
        bytes32 certificateId; // Unique ID for each certificate
        string ipfsHash; // Hash of the certificate PDF
        address issuedTo; // Student address
        address issuedBy; // Institution address
        uint256 issuedAt; // Issuance timestamp
        uint256 expiresAt; // Expiry timestamp (0 if no expiry)
        bool isRevoked; // Revocation status
    }

    mapping(address => bool) public isApprovedInstitution;
    mapping(address => bool) public isStudent;
    mapping(address => Certificate[]) private studentCertificates;
    mapping(bytes32 => bool) private certificateExists; // Track used certificate IDs

    event InstitutionApproved(address indexed institution);
    event StudentAdded(address indexed student);
    event CertificateIssued(address indexed student, address indexed institution, bytes32 certificateId, string ipfsHash);
    event CertificateRevoked(address indexed student, bytes32 certificateId);
    event CertificateUpdated(address indexed student, bytes32 certificateId, string newHash);

    modifier onlyInstitution() {
        require(isApprovedInstitution[msg.sender], "Caller is not an approved institution");
        _;
    }

    modifier onlyStudent() {
        require(isStudent[msg.sender], "Caller is not a registered student");
        _;
    }

    function approveInstitution(address institution) external onlyOwner {
        require(institution != address(0), "Invalid institution address");
        isApprovedInstitution[institution] = true;
        emit InstitutionApproved(institution);
    }

    function registerStudent(address student) external onlyOwner {
        require(student != address(0), "Invalid student address");
        isStudent[student] = true;
        emit StudentAdded(student);
    }

    function issueCertificate(address student, string memory ipfsHash, uint256 expiresAt) public onlyInstitution {
        require(isStudent[student], "Recipient is not a registered student");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        bytes32 certificateId = keccak256(abi.encodePacked(student, ipfsHash, block.timestamp));
        require(!certificateExists[certificateId], "Certificate ID already exists");

        Certificate memory cert = Certificate({
            certificateId: certificateId,
            ipfsHash: ipfsHash,
            issuedTo: student,
            issuedBy: msg.sender,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            isRevoked: false
        });

        studentCertificates[student].push(cert);
        certificateExists[certificateId] = true;
        emit CertificateIssued(student, msg.sender, certificateId, ipfsHash);
    }

    function revokeCertificate(address student, uint256 index) external {
        require(index < studentCertificates[student].length, "Invalid certificate index");
        Certificate storage cert = studentCertificates[student][index];
        require(msg.sender == owner() || msg.sender == cert.issuedBy, "Unauthorized to revoke");
        require(!cert.isRevoked, "Certificate already revoked");
        cert.isRevoked = true;
        emit CertificateRevoked(student, cert.certificateId);
    }

    function updateCertificateHash(address student, uint256 index, string memory newIpfsHash) external onlyInstitution {
        require(index < studentCertificates[student].length, "Invalid certificate index");
        Certificate storage cert = studentCertificates[student][index];
        require(cert.issuedBy == msg.sender, "Not the certificate issuer");
        require(!cert.isRevoked, "Cannot update revoked certificate");
        require(bytes(newIpfsHash).length > 0, "New IPFS hash cannot be empty");
        cert.ipfsHash = newIpfsHash;
        emit CertificateUpdated(student, cert.certificateId, newIpfsHash);
    }

    function getCertificates(address student) public view returns (Certificate[] memory) {
        return studentCertificates[student];
    }

    function isCertificateValid(address student, uint256 index) public view returns (bool) {
        require(index < studentCertificates[student].length, "Invalid certificate index");
        Certificate memory cert = studentCertificates[student][index];
        return !cert.isRevoked && (cert.expiresAt == 0 || block.timestamp <= cert.expiresAt);
    }

    function verifyCertificateByHash(string memory ipfsHash, address student, uint256 index) public view returns (bool) {
        require(index < studentCertificates[student].length, "Invalid certificate index");
        Certificate memory cert = studentCertificates[student][index];
        return keccak256(abi.encodePacked(cert.ipfsHash)) == keccak256(abi.encodePacked(ipfsHash)) &&
               !cert.isRevoked &&
               (cert.expiresAt == 0 || block.timestamp <= cert.expiresAt);
    }

    function getCertificateCount(address student) public view returns (uint256) {
        return studentCertificates[student].length;
    }
}