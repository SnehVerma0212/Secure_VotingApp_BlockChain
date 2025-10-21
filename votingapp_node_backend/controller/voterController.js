import { ethers } from 'ethers';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import dataUser from '../entity/savedHash.js';
dotenv.config();

// Environment variables
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!RPC_URL || !CONTRACT_ADDRESS || !PRIVATE_KEY) {
    throw new Error("Please set RPC_URL, CONTRACT_ADDRESS, and PRIVATE_KEY in your .env file");
}


const abiPath = path.join('../votingapp_backend/artifacts/contracts/Voter.sol/voter.json');
if (!fs.existsSync(abiPath)) {
    throw new Error(`ABI file not found at ${abiPath}`);
}
const contractJSON = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const contractABI = contractJSON.abi;

const provider = new ethers.JsonRpcProvider(RPC_URL, { chainId: 31337, name: "localhost" });
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

export const newRegistration = async (req, res) => {
    const { name, id } = req.body;

    try {
        const existingUser = await dataUser.findOne({ name, id });
        if (existingUser) {
            return res.status(409).send({ message: "Candidate already registered", existingUser });
        }
        const tx = await contract.addCandidate(name, id);
        await tx.wait();
        const newUser = new dataUser({ name, hash: tx.hash ,creationId:id});
        await newUser.save();

        res.status(200).send({
            message: "Candidate added successfully",
            User: name,
            txHash: tx.hash
        });

    } catch (err) {
        console.error("Error in newRegistration:", err);
        res.status(500).send({ error: err.message || "Internal Server Error" });
    }
};

export const generateRecipt = async (req, res) => {
    const {hash} = req.params;
    try{
        const recipt = await provider.getTransactionReceipt(hash);
        if(!recipt){
            res.status(404).send({message:"Transaction receipt not found"});
        }
        res.status(200).send({recipt});
    }catch(err){
        res.send({error:err.message||"Internal Server Error"});
    }
}

