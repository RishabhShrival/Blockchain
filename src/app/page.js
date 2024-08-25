"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getContract, getAccount } from './contract'

export default function Home() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const router = useRouter();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await getAccount();
        setAccount(accounts);

        const contract = await getContract();
        setProvider(contract);

        // Save account to localStorage
        localStorage.setItem('account', accounts);

        // Redirect to dashboard
        router.push('/Dashboard');
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        router.push('/Dashboard');
      }
    } else {
      console.log('Please install MetaMask');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Blockchain Course Registration</h1>
      {!account ? (
        <button 
          onClick={connectWallet} 
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-lg font-medium text-green-600">Connected as: {account}</p>
      )}
    </div>
  );
}
