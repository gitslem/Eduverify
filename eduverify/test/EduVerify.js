const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EduVerify", function () {
  let EduVerify, eduVerify, owner, institution, student, other;

  beforeEach(async function () {
    [owner, institution, student, other] = await ethers.getSigners();
    EduVerify = await ethers.getContractFactory("EduVerify");
    eduVerify = await EduVerify.deploy();
    // eduVerify.deployed();
  });

  it("Should approve institution", async function () {
    await eduVerify.approveInstitution(institution.address);
    expect(await eduVerify.isApprovedInstitution(institution.address)).to.be.true;
  });

  it("Should register student", async function () {
    await eduVerify.registerStudent(student.address);
    expect(await eduVerify.isStudent(student.address)).to.be.true;
  });

  it("Should issue certificate", async function () {
    await eduVerify.approveInstitution(institution.address);
    await eduVerify.registerStudent(student.address);
    const ipfsHash = "QmTestHash";
    await eduVerify.connect(institution).issueCertificate(student.address, ipfsHash, 0);
    const certs = await eduVerify.getCertificates(student.address);
    expect(certs[0].ipfsHash).to.equal(ipfsHash);
    expect(certs[0].issuedTo).to.equal(student.address);
  });

  it("Should verify certificate", async function () {
    await eduVerify.approveInstitution(institution.address);
    await eduVerify.registerStudent(student.address);
    const ipfsHash = "QmTestHash";
    await eduVerify.connect(institution).issueCertificate(student.address, ipfsHash, 0);
    expect(await eduVerify.isCertificateValid(student.address, 0)).to.be.true;
    expect(await eduVerify.verifyCertificateByHash(ipfsHash, student.address, 0)).to.be.true;
  });

  it("Should revoke certificate", async function () {
    await eduVerify.approveInstitution(institution.address);
    await eduVerify.registerStudent(student.address);
    const ipfsHash = "QmTestHash";
    await eduVerify.connect(institution).issueCertificate(student.address, ipfsHash, 0);
    await eduVerify.connect(institution).revokeCertificate(student.address, 0);
    expect(await eduVerify.isCertificateValid(student.address, 0)).to.be.false;
  });
});