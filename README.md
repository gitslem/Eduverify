# EduVerify – Blockchain Certificate Verification dApp

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![Roadmap](https://img.shields.io/badge/next%20release-v2.0-lightgrey)

https://drive.google.com/file/d/1CSzSkzAtHfSDlwQAQhviyxzYNR39Xk1f/view?usp=sharing
https://drive.google.com/file/d/1yZOzAkBTNNj55FFPSA3MASUh-f2bwKTH/view?usp=sharing


EduVerify is a full-stack decentralized application that allows institutions to issue **tamper-proof academic certificates** and enables employers or other verifiers to **check authenticity directly on the blockchain**.

This repo includes:
- **Smart Contracts** (Solidity, Hardhat)
- **Backend API** (Node.js + Express + Ethers.js)
- **Frontend UI** (React)


## 📌 Features
- Institutions can issue certificates (with hash of PDF).
- Students can be registered and linked to certs.
- Third parties can verify authenticity via blockchain.
- Certificates can expire or be revoked.
- Dev-only seed to quickly approve a test institution and student.


## 🛠️ Prerequisites
| Tool | Version (recommended) |
|------|------------------------|
| Node.js | v20 (use `nvm use 20`) |
| npm | v10+ |
| Hardhat | installed locally via `npx hardhat` |
| Git | latest |


## 🚀 Getting Started (Local Setup)

### 1. Clone Repository
```bash
git clone https://github.com/gitslem/Eduverify.git
cd Eduverify


2. Install Dependencies

Component	Commands
Root (for Hardhat)	npm install
Backend	cd backend && npm install && cd ..
Frontend	cd frontend && npm install && cd ..


3. Start Local Blockchain (Hardhat Node)

npx hardhat node

This runs a local Ethereum network at http://127.0.0.1:8545 and gives you test accounts.


4. Deploy the Contract

In a second terminal:

npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost

Copy the deployed contract address from the output — you’ll need it in the backend.


5. Run Backend API

Edit backend/index.js and update contractAddress with your deployed contract address if different.

Then run:

cd backend
node index.js

Backend runs on http://localhost:3008


6. Run Frontend

cd frontend
npm start   # or npm run dev if using Vite

Frontend runs on http://localhost:3000


🧪 Testing the App

1. Seed test accounts (approve institution + register student)

curl -X POST http://localhost:3008/seed

2. Upload a PDF → Get Hash

curl -X POST http://localhost:3008/upload \
  -F "pdf=@./cert.pdf"

3. Issue a Certificate

curl -X POST http://localhost:3008/issue \
  -H "Content-Type: application/json" \
  -d '{"student":"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","ipfsHash":"<HASH>","expiresAt":1893456000}'

4. List Certificates for Student

curl http://localhost:3008/certificates/0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

5. Verify a Certificate

curl http://localhost:3008/verify/0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC/0/<HASH>

6. Revoke a Certificate

curl -X POST http://localhost:3008/revoke \
  -H "Content-Type: application/json" \
  -d '{"student":"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","index":0}'



📂 Project Structure

.
├── contracts/         # Solidity contracts
├── scripts/           # Hardhat deployment scripts
├── artifacts/         # Compiled contract ABIs
├── backend/           # Express API server
│   └── index.js
├── frontend/          # React frontend
└── README.md



🔒 Notes
	•	Use Hardhat’s local accounts for dev.
	•	Update backend/index.js with the correct contract address each time you redeploy.
	•	Private keys in Hardhat are for testing only; never use mainnet keys.


📜 License

MIT License.
Feel free to fork and extend for your own projects.

 Team Members

Name	Role
Anslem	Project Manager
Shashwat Team Lead & Coder (Solidity + React)
Soham	Backend Developer & Knowledge Management Lead

