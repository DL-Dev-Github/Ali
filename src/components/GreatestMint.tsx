import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Box, Alert } from '@mui/material';
import { useAccount } from 'wagmi';

import axios, { AxiosError } from 'axios';
import { CustomConnectButton2 } from './CustomConnectButton2';
const contractAddress = '0x58497bD9D49C5064EC0361d93ACf0c7Cb1184A73';
interface ProofData {
  proof: string[];
  allowedQuantity: string;
  phase: number;
}

const abi= [{        "inputs": [],
"name": "MAX_SUPPLY",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "MAX_MINT_PER_TX",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "phase1Enabled",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "phase2Enabled",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "openMintingEnabled",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "claimPrice",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "openMintPrice",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "claim",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "openmint",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
}]
;

const GreatestMint: React.FC = () => {
  const { address, isConnected } = useAccount();
  
  const [proofData, setProofData] = useState<ProofData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchProofData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<{ results: ProofData[] }>(`http://localhost:3069/proofsAndAllowedQuantities?address=${address}`);
      setProofData(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected ) {
        fetchProofData();
    }
    }, [isConnected]);

  return (
    <div>
     Mint Button here depending on phase
    </div>
  );
};

export default GreatestMint;
