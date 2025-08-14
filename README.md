# EduVerify – Blockchain-Based Certificate Verification System

EduVerify is a decentralized application (dApp) that enables educational institutions to issue tamper-proof academic certificates and allows employers or other verifiers to validate them with trustless blockchain verification.



## Overview
EduVerify leverages **Ethereum smart contracts** and **decentralized storage** to create a secure, transparent, and immutable record of academic certificates.  
The platform eliminates credential fraud and simplifies verification for employers, students, and institutions.


## Features

### Core Functionalities
- **Certificate Issuance**  
  Institutions can issue certificates by uploading their details and associating them with a student's wallet address.
  
- **Certificate Verification**  
  Anyone can verify the authenticity of a certificate by entering its ID or hash.

- **Certificate Revocation** *(Optional Feature)*  
  Issuers can revoke a certificate if it’s found invalid or issued in error.

### Security & Transparency
- Access control via **OpenZeppelin’s Ownable**.
- Event logs (`CertificateIssued`, `CertificateVerified`, `CertificateRevoked`) for auditability.
- File integrity ensured using **SHA-256 hashes** stored on-chain.

### Decentralized Storage
- Certificate PDFs are stored off-chain (e.g., **IPFS**), with cryptographic hashes stored in the smart contract.
- Backend handles file hashing before blockchain storage.

### Frontend
- Built with **React** and styled with **Tailwind CSS**.
- Integrated with **Web3.js** for wallet connection and blockchain interaction.
- Fully responsive and production-ready UI.

## Tech Stack

| Layer              | Technology Used |
|--------------------|-----------------|
| Smart Contracts    | Solidity, OpenZeppelin |
| Blockchain Access  | Web3.js |
| Frontend           | React, Tailwind CSS |
| Backend            | Node.js, Express |
| Decentralized Storage | IPFS / Off-chain server |
| Version Control    | Git, GitHub |

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)
- [MetaMask](https://metamask.io/)
- [Ganache](https://trufflesuite.com/ganache/) or an Ethereum testnet account

###  Clone the Repository
```bash
git clone https://github.com/<your-username>/eduverify.git
cd eduverify

 Install Dependencies

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

 Smart Contract Deployment

# From backend or root folder
truffle migrate --network development

Or deploy to a testnet (e.g., Goerli) with Infura.

 Start Backend

cd backend
npm start

 Start Frontend

cd frontend
npm run dev

Project Structure

EduVerify/
│
├── backend/         # Node.js API & IPFS integration
├── contracts/       # Solidity smart contracts
├── frontend/        # React UI with Web3.js
├── migrations/      # Truffle migration scripts
└── README.md


 Team Members
	•	Shashwat – Project Manager
	•	Anslem – Team Lead & Coder (Solidity + React)
	•	Soham – Developer & Knowledge Management Lead (Backend + Documentation)

 Goals Achieved
	•	Secure blockchain-based certificate verification.
	•	User-friendly full-stack dApp.
	•	Prevents credential fraud and enables instant validation.
	•	Ready for deployment and real-world testing.

 License

This project is licensed under the MIT License.

