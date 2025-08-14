const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const { ethers } = require("ethers"); // ethers v6
const cors = require("cors");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// Ethers v6 Provider Setup

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const institutionPrivateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Account #1
const wallet = new ethers.Wallet(institutionPrivateKey, provider);
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractABI = require("../artifacts/contracts/EduVerify.json").abi;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const ownerWallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
const ownerContract = new ethers.Contract(contractAddress, contractABI, ownerWallet);

// Routes (unchanged)
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    const fileBuffer = fs.readFileSync(file.path);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
    fs.unlinkSync(file.path);
    res.json({ ipfsHash: hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/issue", async (req, res) => {
  try {
    const { student, ipfsHash, expiresAt } = req.body;
    if (!ethers.isAddress(student)) {
      return res.status(400).json({ error: "Invalid student address" });
    }
    const tx = await contract.issueCertificate(student, ipfsHash, expiresAt);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  app.get("/verify/:student/:index/:ipfsHash", async (req, res) => {
    try {
      const { student, index, ipfsHash } = req.params;
      if (!ethers.isAddress(student)) {
        return res.status(400).json({ error: "Invalid student address" });
      }
      const isValid = await contract.verifyCertificateByHash(ipfsHash, student, index);
      res.json({ isValid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/revoke", async (req, res) => {
    try {
      const { student, index } = req.body;
      if (!ethers.isAddress(student)) {
        return res.status(400).json({ error: "Invalid student address" });
      }
      const tx = await contract.revokeCertificate(student, index);
      await tx.wait();
      res.json({ success: true, txHash: tx.hash });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/certificates/:student", async (req, res) => {
    try {
      const certificates = await contract.getCertificates(req.params.student);
      
      // Convert all BigInt properties to strings
      const serialized = certificates.map(cert => {
        return {
          certificateId: cert.certificateId,
          ipfsHash: cert.ipfsHash,
          issuedTo: cert.issuedTo,
          issuedBy: cert.issuedBy,
          issuedAt: cert.issuedAt.toString(), // Convert BigInt
          expiresAt: cert.expiresAt.toString(), // Convert BigInt
          isRevoked: cert.isRevoked
        };
      });
  
      res.json(serialized);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/approve-institution", async (req, res) => {
    try {
      const tx = await ownerContract.approveInstitution(req.body.institution);
      await tx.wait();
      res.json({ success: true, txHash: tx.hash });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/register-student", async (req, res) => {
    try {
      const tx = await ownerContract.registerStudent(req.body.student);
      await tx.wait();
      res.json({ success: true, txHash: tx.hash });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(3008, () => console.log("Backend running on port 3008"));