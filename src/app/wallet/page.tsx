"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import {
  getWalletBalance,
  getWalletStats,
  getTransactions,
  getReferralInfo,
  getReferralHistory,
  type WalletBalance,
  type WalletStats,
  type Transaction,
  type ReferralInfo,
  type ReferralHistoryItem,
} from "@/lib/api/wallet";

export default function WalletPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transactions" | "referrals">("transactions");
  const [copied, setCopied] = useState(false);
  
  // Wallet data
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [walletStats, setWalletStats] = useState<WalletStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
  const [referralHistory, setReferralHistory] = useState<ReferralHistoryItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [router]);

  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (session && !error) {
      setIsAuthenticated(true);
      await loadWalletData();
    } else {
      router.push("/auth");
    }
    setIsLoading(false);
  };

  const loadWalletData = async () => {
    setLoadingData(true);
    try {
      // Load all wallet data in parallel
      const [balanceData, statsData, transactionsData, referralData, referralHistoryData] = await Promise.all([
        getWalletBalance(),
        getWalletStats(),
        getTransactions(50, 0),
        getReferralInfo(),
        getReferralHistory(),
      ]);

      setWalletBalance(balanceData);
      setWalletStats(statsData);
      setTransactions(transactionsData.transactions);
      setReferralInfo(referralData);
      setReferralHistory(referralHistoryData.referrals);
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCopyReferral = () => {
    if (!referralInfo) return;
    navigator.clipboard.writeText(referralInfo.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    if (type === 'earned' || type === 'referral_bonus' || type === 'event_reward' || type === 'refund') {
      return (
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
      </svg>
    );
  };

  const getReferralStatusBadge = (status: ReferralHistoryItem['status']) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      rewarded: "bg-green-500/10 text-green-400 border-green-500/20",
    };
    
    return (
      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading wallet...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Wallet Header */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Pocket Branding */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-2">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #fff462, #ffb700)" }}
              >
                Pocket
              </span>
            </h1>
            <p className="text-sm text-slate-400">
              by <span style={gradientText}>unifesto</span>
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div
            className="p-8 rounded-2xl mb-8 shadow-2xl"
            style={{ background: brandGradient }}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h2 className="text-lg font-bold text-white">Wallet Balance</h2>
            </div>
            {loadingData && !walletBalance ? (
              <div className="py-4">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <p className="text-5xl font-extrabold text-white mb-2">
                  {walletBalance?.balance || 0}
                </p>
                <p className="text-white/80">{walletBalance?.currency || 'Uni Coins'}</p>
              </>
            )}
          </div>

          {/* Wallet Stats */}
          {walletStats && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <p className="text-2xl font-bold text-green-400 mb-1">+{walletStats.total_earned}</p>
                <p className="text-xs text-slate-500">Total Earned</p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <p className="text-2xl font-bold text-red-400 mb-1">-{walletStats.total_spent}</p>
                <p className="text-xs text-slate-500">Total Spent</p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm col-span-2 md:col-span-1">
                <p className="text-2xl font-bold text-white mb-1">{walletStats.total_transactions}</p>
                <p className="text-xs text-slate-500">Transactions</p>
              </div>
            </div>
          )}

          {/* Referral Card */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-[#3491ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <h2 className="text-lg font-bold text-white">Referral Program</h2>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              Invite friends and earn {walletBalance?.currency || 'Uni Coins'}!
            </p>

            {/* Referral Code */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-slate-400 mb-1">Your Code</p>
                <p className="text-2xl font-bold tracking-wider" style={gradientText}>
                  {referralInfo?.code || 'LOADING'}
                </p>
              </div>
              <button
                onClick={handleCopyReferral}
                className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-200"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[#3491ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Referral Stats */}
            <div className="flex gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-white">{referralInfo?.total_referrals || 0}</p>
                <p className="text-xs text-slate-500">Referrals</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold" style={gradientText}>{referralInfo?.total_rewards || 0}</p>
                <p className="text-xs text-slate-500">Coins Earned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
                activeTab === "transactions" ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Transaction History
              {activeTab === "transactions" && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: brandGradient }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("referrals")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
                activeTab === "referrals" ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Referral History
              {activeTab === "referrals" && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: brandGradient }}
                />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            {activeTab === "transactions" && (
              <div>
                {loadingData && transactions.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Loading transactions...</p>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-slate-400 mb-2">No transactions yet</p>
                    <p className="text-sm text-slate-600">Start earning coins by attending events!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                      <div key={transaction.id}>
                        <div className="flex items-center gap-4 p-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            transaction.amount > 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                          }`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white mb-1">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-slate-500">
                              {formatDate(transaction.created_at)}
                            </p>
                          </div>
                          <p className={`text-lg font-bold ${
                            transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                          </p>
                        </div>
                        {index < transactions.length - 1 && (
                          <div className="h-px bg-white/5" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "referrals" && (
              <div>
                {loadingData && referralHistory.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Loading referrals...</p>
                  </div>
                ) : referralHistory.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-slate-400 mb-2">No referrals yet</p>
                    <p className="text-sm text-slate-600">Share your referral code to start earning!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {referralHistory.map((referral, index) => (
                      <div key={referral.id}>
                        <div className="flex items-center justify-between p-4">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white mb-1">
                              Referral Code: {referral.referral_code}
                            </p>
                            <p className="text-xs text-slate-500">
                              {formatDate(referral.created_at)}
                            </p>
                            {referral.rewarded_at && (
                              <p className="text-xs text-green-400 mt-1">
                                Rewarded: {formatDate(referral.rewarded_at)}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {referral.status === 'rewarded' && (
                              <p className="text-lg font-bold text-green-400">
                                +{referral.reward_amount}
                              </p>
                            )}
                            {getReferralStatusBadge(referral.status)}
                          </div>
                        </div>
                        {index < referralHistory.length - 1 && (
                          <div className="h-px bg-white/5" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
