"use client";

import React from "react";
import { Dumbbell, Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WorkoutsPage() {
    const plans = [
        { title: "Strength Protocol", img: "/images/strength.png", tag: "Power", duration: "60 Min", diff: "Advanced" },
        { title: "Endurance Boost", img: "/images/cardio.png", tag: "Cardio", duration: "45 Min", diff: "Intermediate" },
        { title: "Zen Flow", img: "/images/yoga.png", tag: "Recovery", duration: "30 Min", diff: "All Levels" },
        { title: "Aqua Sprints", img: "/images/swimming.png", tag: "Endurance", duration: "40 Min", diff: "Intermediate" }
    ];

    return (
        <div className="min-h-screen pb-20 p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        PRO <span className="text-red-500">WORKOUTS</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Choose your battle
                    </p>
                </motion.div>
            </header>

            {/* Grid of Workout Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors"
                    >
                        <Image src={plan.img} alt={plan.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent p-6 flex flex-col justify-end">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-[10px] uppercase font-black tracking-widest mb-2">
                                        {plan.tag}
                                    </span>
                                    <h3 className="text-2xl font-black text-white italic tracking-tight">{plan.title}</h3>
                                    <p className="text-xs font-medium text-slate-300 mt-1">{plan.duration} • {plan.diff}</p>
                                </div>

                                <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors group-hover:scale-110 active:scale-95 shadow-xl">
                                    <Play size={20} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
