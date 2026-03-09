import { NextResponse } from "next/server";
import { ethers } from "ethers";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const walletAddress = "0x14f32f1173d4fa8233de9853411318ad62d24795689b5fbca999d0187850188";
    const rpcUrl = "https://polygon-mainnet.g.alchemy.com/v2/tz9Za3l_09rgB3mflYQWf";
    
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const balanceWei = await provider.getBalance(walletAddress);
    
    const balancePol = ethers.formatEther(balanceWei);
    
    return NextResponse.json({
      balance: `${parseFloat(balancePol).toFixed(4)} POL`,
      raw: balancePol
    });
  } catch (error: any) {
    console.error("Balance fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance", details: error.message },
      { status: 500 }
    );
  }
}
