"use client";

import React from "react";
import { Calendar, Activity, TrendingUp, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityPage() {
    return (
        <div className="min-h-screen pb-20 p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        ACTIVITY <span className="text-red-500">LOG</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Track your progress
                    </p>
                </motion.div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Workouts", value: "24", icon: <Activity size={18} /> },
                    { label: "Active Minutes", value: "1,240+", icon: <TrendingUp size={18} /> },
                    { label: "Calories", value: "8,400", icon: <Activity size={18} /> },
                    { label: "Current Streak", value: "5 Days", icon: <Trophy size={18} /> },
                ].map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-4 border border-white/5">
                        <div className="text-red-500 mb-2">{stat.icon}</div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* History List */}
            <section className="glass rounded-3xl p-6 md:p-8 border border-white/5">
                <h2 className="text-lg font-black tracking-tight mb-8 flex items-center gap-2">
                    <Calendar className="text-red-500" /> HISTORICAL DATA
                </h2>

                <div className="space-y-4">
                    {[
                        { date: "Oct 24", title: "Heavy Lifter Protocol", type: "Strength", duration: "60m", cal: "450" },
                        { date: "Oct 23", title: "Endurance Run", type: "Cardio", duration: "45m", cal: "500" },
                        { date: "Oct 22", title: "Recovery Flow", type: "Yoga", duration: "30m", cal: "150" },
                        { date: "Oct 20", title: "HIIT Madness", type: "Cardio", duration: "45m", cal: "600" },
                        { date: "Oct 18", title: "Pool Sprints", type: "Swimming", duration: "40m", cal: "400" },
                    ].map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default"
                        >
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center font-black">
                                {item.date.split(" ")[1]}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.type} • {item.date}</p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                                <div className="text-center hidden sm:block">
                                    <p className="text-sm font-black text-white">{item.duration}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-red-500">{item.cal}</p>
                                    <p className="text-[9px] text-slate-500 font-black uppercase">kcal</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
