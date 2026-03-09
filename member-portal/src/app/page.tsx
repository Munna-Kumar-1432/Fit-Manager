"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Flame,
  Clock,
  Trophy,
  Calendar,
  Dumbbell,
  ChevronRight,
  TrendingUp,
  CircleUser
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function MemberPortal() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Sync user to Admin DB
    const syncUser = async () => {
      try {
        await axios.post('http://localhost:5000/api/members/sync', {
          id: user.id,
          name: user.fullName || user.firstName,
          email: user.primaryEmailAddress?.emailAddress
        });
      } catch (e) {
        console.error('Sync failed', e);
      }
    };
    syncUser();

    // The user id
    const userId = user.id;

    const fetchData = async () => {
      try {
        const [statsRes, activitiesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/member/stats/${userId}`),
          axios.get(`http://localhost:5000/api/member/activities/${userId}`)
        ]);
        setStats(statsRes.data);
        setActivities(activitiesRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isLoaded]);

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero.png" alt="Hero background" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617] h-full" />
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black italic tracking-tighter">
              POWER<span className="text-red-500">FIT</span> MEMBER
            </h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
              Welcome back, <span className="text-white">{user?.firstName || "Warrior"}</span>
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 shadow-xl shadow-red-500/10 hover:shadow-red-500/30 transition-shadow overflow-hidden">
              {isLoaded && user ? (
                <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />
              ) : (
                <Image src="/images/avatar.png" alt="Avatar" width={48} height={48} className="object-cover" />
              )}
            </div>
            <div className="hidden md:block text-right border-r border-white/10 pr-4 mr-2">
              <p className="font-bold text-sm">Warrior Status</p>
              <p className="text-green-500 text-xs font-black uppercase tracking-widest">Elite Tier</p>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Weekly Summary */}
          <div className="lg:col-span-2 space-y-8">

            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard
                icon={<Flame className="text-orange-500" />}
                label="Calories Burned"
                value={stats?.weekly?.total_calories || "1,250"}
                unit="kcal"
                sub="This Week"
                color="orange"
              />
              <SummaryCard
                icon={<Clock className="text-blue-500" />}
                label="Active Time"
                value={stats?.weekly?.total_duration || "245"}
                unit="min"
                sub="Last 7 Days"
                color="blue"
              />
              <SummaryCard
                icon={<Activity className="text-red-500" />}
                label="Avg Intensity"
                value="High"
                unit=""
                sub="Steady Growth"
                color="red"
              />
            </div>

            {/* Activity Timeline */}
            <section className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                  <Calendar className="text-red-500" /> RECENT BATTLES
                </h2>
                <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                  See Historic Data
                </button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="h-40 flex items-center justify-center text-slate-600 animate-pulse">
                    Deploying stats...
                  </div>
                ) : activities.length > 0 ? activities.map((activity, idx) => (
                  <ActivityRow key={idx} activity={activity} />
                )) : (
                  <div className="text-center text-slate-500 py-8">
                    No recent activities found. Start your journey today!
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Profile & Metrics */}
          <div className="space-y-8">

            {/* Biometrics */}
            <section className="glass rounded-3xl p-8 relative overflow-hidden group border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors"></div>

              <h2 className="text-lg font-black tracking-tight mb-8 flex items-center gap-2">
                <Trophy className="text-yellow-500" /> BIOMETRICS
              </h2>

              <div className="space-y-6 relative z-10">
                <MetricRow label="Body Weight" value={`${stats?.metrics?.weight || "75.5"} kg`} trend="+0.2" />
                <MetricRow label="Body Fat" value={`${stats?.metrics?.body_fat || "18.5"} %`} trend="-1.2" isGood />
                <MetricRow label="Current BMI" value={stats?.metrics?.bmi || "24.7"} trend="0.0" />
              </div>

              <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all z-10 relative">
                Update Stats
              </button>
            </section>

            {/* Upcoming Workout */}
            <section className="bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0">
                <Image src="/images/cardio.png" alt="Cardio" fill className="object-cover opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30 animate-pulse">
                  <Dumbbell size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">Evening Power Hour</h3>
                  <p className="text-white text-xs font-medium uppercase tracking-[0.2em] mt-1">Today @ 6:30 PM</p>
                </div>
                <p className="text-slate-300 text-xs italic">"Push harder than yesterday if you want a different tomorrow."</p>
                <button className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all w-full">
                  Check-in Now
                </button>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, unit, sub, color }: any) {
  const colors: any = {
    red: "from-red-500/20 text-red-500 border-red-500/30",
    orange: "from-orange-500/20 text-orange-500 border-orange-500/30",
    blue: "from-blue-500/20 text-blue-500 border-blue-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn("bg-gradient-to-br rounded-3xl p-6 border transition-all cursor-default relative overflow-hidden", colors[color])}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform translate-x-1/4 -translate-y-1/4">{icon}</div>
      <div className="relative z-10">
        <div className="mb-4">{icon}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black tracking-tighter text-white">{value}</span>
          <span className="text-xs font-bold text-white uppercase tracking-widest">{unit}</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white mt-2 mb-1">{label}</p>
        <p className="text-[10px] text-white/70">{sub}</p>
      </div>
    </motion.div>
  );
}

function ActivityRow({ activity }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-red-500/20 hover:bg-white/[0.07] transition-all group">
      <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-white/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
        <Dumbbell size={20} />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-white tracking-tight">{activity.activity_type}</h4>
        <p className="text-[10px] text-red-400 uppercase tracking-widest font-black">{activity.intensity} Intensity</p>
      </div>
      <div className="text-right flex items-center gap-8">
        <div className="hidden md:block text-center">
          <p className="text-sm font-black text-white">{activity.duration}</p>
          <p className="text-[9px] text-slate-500 uppercase font-black">min</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-black text-white">{activity.calories}</p>
          <p className="text-[9px] text-slate-500 uppercase font-black">kcal</p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, trend, isGood }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div>
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-white tracking-tighter">{value}</p>
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
        isGood ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
      )}>
        <TrendingUp size={10} /> {trend}
      </div>
    </div>
  );
}
