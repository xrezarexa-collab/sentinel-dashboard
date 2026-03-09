"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CloudRainWind, ThermometerSun, Wallet, Activity, RefreshCw, Layers, ExternalLink } from "lucide-react";
import { ethers } from "ethers";

export default function MainDashboard() {
  const [balance, setBalance] = useState<string>("Loading...");
  const [profit, setProfit] = useState<string>("+$0.00");
  const [activeMarkets, setActiveMarkets] = useState(6);
  const [lastUpdate, setLastUpdate] = useState("Just now");
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchRealData = async () => {
    setIsSyncing(true);
    try {
      // User's MetaMask Wallet
      const walletAddress = "0x14f32f1173d4fa8233de9853411318ad62d24795689b5fbca999d0187850188";
      // Polygon Alchemy RPC
      const rpcUrl = "https://polygon-mainnet.g.alchemy.com/v2/tz9Za3l_09rgB3mflYQWf";

      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const balanceWei = await provider.getBalance(walletAddress);

      const balancePol = ethers.formatEther(balanceWei);
      setBalance(`${parseFloat(balancePol).toFixed(4)} POL`);

      // Profit is calculated later via actual Polymarket CTF logs, zeroed for now since it's fresh
      setProfit("+$0.00");
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Failed to fetch balance", e);
      setBalance("Error");
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchRealData();
    const interval = setInterval(fetchRealData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 justify-center items-center flex to-purple-500 rounded-2xl shadow-lg shadow-blue-500/30">
              <CloudRainWind className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Sentinel Weather Node
              </h1>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                OpenClaw Simmer Skill Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Last Synced: {lastUpdate}</span>
            <button onClick={fetchRealData} className={`p-2 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10 ${isSyncing ? 'animate-spin' : ''}`}>
              <RefreshCw className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-blue-400" />
              <h3 className="text-gray-400 font-medium">True Wallet Balance</h3>
            </div>
            <p className="text-4xl font-bold">{balance}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-green-400" />
              <h3 className="text-gray-400 font-medium">Net Profit (Testing)</h3>
            </div>
            <p className="text-4xl font-bold text-green-400">{profit}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-2">
              <ThermometerSun className="w-5 h-5 text-purple-400" />
              <h3 className="text-gray-400 font-medium">Scanning Cities</h3>
            </div>
            <p className="text-4xl font-bold">{activeMarkets} <span className="text-lg text-gray-500 font-normal">Markets</span></p>
          </motion.div>
        </div>

        {/* Integration Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-lg">OpenClaw Engine View</h2>
            </div>
            <div className="flex items-center gap-3">
              <a href="http://95.111.247.105:8080" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1">
                <ExternalLink className="w-4 h-4" /> Go to Gateway
              </a>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">Proxied Route: /openclaw</span>
            </div>
          </div>
          <div className="flex-1 bg-black/40 p-0 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <p className="text-gray-600">Proxy connecting to OpenClaw API Gateway...</p>
            </div>
            <iframe
              src="/openclaw"
              className="w-full h-full border-0 relative z-10 mix-blend-screen opacity-90 block"
              title="OpenClaw Dashboard"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
