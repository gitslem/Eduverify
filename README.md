 EduVerify – Blockchain-Based Certificate Verification System

 Project Overview
EduVerify is a decentralized application (dApp) that enables educational institutions to issue tamper-proof academic certificates and allows employers or verifiers to validate them using trustless blockchain verification.  

It provides a secure, transparent, and immutable way to combat credential fraud while simplifying verification for employers, students, and institutions.  


 Features

 Core Functionalities
- Certificate Issuance – Institutions upload certificate details and associate them with a student’s wallet address.  
- Certificate Verification – Anyone can validate authenticity by entering a certificate ID or hash.  
- Certificate Revocation (optional) – Issuers can revoke certificates if invalid or issued in error.  

 Security & Transparency
- Access control with OpenZeppelin’s Ownable.  
- Event logs (`CertificateIssued`, `CertificateVerified`, `CertificateRevoked`) for full auditability.  
- SHA-256 hashing for file integrity stored on-chain.  

 Decentralized Storage
- Certificate PDFs stored off-chain via IPFS.  
- Hashes of files stored in the smart contract for verification.  
- Backend handles file hashing + blockchain interaction.  

 Frontend
- Built with React + Tailwind CSS.  
- Wallet connection and blockchain interaction using Web3.js.  
- Responsive, user-friendly UI.  



 Tech Stack

| Layer                | Technology Used |
|----------------------|-----------------|
| Smart Contracts      | Solidity, OpenZeppelin |
| Blockchain Access    | Web3.js |
| Frontend             | React, Tailwind CSS |
| Backend              | Node.js, Express |
| Decentralized Storage| IPFS / Off-chain server |
| Development Tools    | Truffle, Ganache, Infura |
| Version Control      | Git, GitHub |

---

Getting Started

 Prerequisites
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v16+)  
- [npm](https://www.npmjs.com/)  
- [MetaMask](https://metamask.io/)  
- [Ganache](https://trufflesuite.com/ganache/) or an Ethereum testnet account (e.g., Goerli via Infura)  

---

 Setup Steps (Table)

| Step | Description |
|------|-------------|
| 1 | Clone the repository |
| 2 | Install backend dependencies |
| 3 | Install frontend dependencies |
| 4 | Deploy smart contracts (local or testnet) |
| 5 | Start backend server |
| 6 | Start frontend UI |

---

 Commands

1. Clone the Repository
```bash
git clone https://github.com/gitslem/eduverify.git
cd eduverify

2. Install Dependencies

 Backend dependencies
cd backend
npm install

 Frontend dependencies
cd ../frontend
npm install

3. Deploy Smart Contracts

 From project root or backend folder
truffle migrate --network development

 Or deploy to a testnet (e.g., Goerli) using Infura
truffle migrate --network goerli

4. Start Backend

cd backend
npm start

5. Start Frontend

cd frontend
npm run dev


 Project Structure

Path	Description
backend/	Node.js API with IPFS integration
contracts/	Solidity smart contracts
frontend/	React UI (Web3.js + Tailwind CSS)
migrations/	Truffle migration scripts
README.md	Documentation



 Team Members

Name	Role
Anslem	Project Manager
Shashwat Team Lead & Coder (Solidity + React)
Soham	Backend Developer & Knowledge Management Lead



 Goals Achieved
	•	 Secure blockchain-based certificate verification
	•	 User-friendly full-stack dApp
	•	 Prevention of credential fraud + instant validation
	•	 Ready for deployment and real-world testing



References
	•	Ethereum Documentation
	•	Truffle Suite
	•	IPFS Docs
	•	OpenZeppelin Contracts

 License

MIT License © 2025
