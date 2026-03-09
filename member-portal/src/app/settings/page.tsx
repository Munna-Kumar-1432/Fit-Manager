"use client";

import React from "react";
import { Settings, User, Bell, Shield, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function SettingsPage() {
    const { user } = useUser();

    return (
        <div className="min-h-screen pb-20 p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        ACCOUNT <span className="text-red-500">SETTINGS</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Manage your digital fortress
                    </p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Nav (Mobile hidden) */}
                <div className="hidden md:block space-y-2">
                    <SettingLink icon={<User size={18} />} label="Profile" active />
                    <SettingLink icon={<Bell size={18} />} label="Notifications" />
                    <SettingLink icon={<Shield size={18} />} label="Security" />
                    <div className="pt-4 border-t border-white/5 mt-4">
                        <SignOutButton>
                            <button className="w-full text-left p-3 rounded-xl flex items-center gap-3 text-red-500 font-bold text-sm tracking-wide hover:bg-red-500/10 transition-colors">
                                <LogOut size={18} /> Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-8">
                    <section className="glass rounded-3xl p-8 border border-white/10">
                        <h2 className="text-xl font-black tracking-tight mb-8">Personal Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.fullName || "Munna Kumar"}
                                    className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.primaryEmailAddress?.emailAddress || "user@powerfit.com"}
                                    className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-slate-400 focus:outline-none focus:border-red-500 transition-colors cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2">Phone</label>
                                    <input
                                        type="text"
                                        defaultValue="+91 98765 43210"
                                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        defaultValue="1995-08-15"
                                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-xl transition-all shadow-lg shadow-red-500/20">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Mobile Sign out */}
                    <div className="md:hidden">
                        <SignOutButton>
                            <button className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest">
                                <LogOut size={18} /> Sign Out securely
                            </button>
                        </SignOutButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingLink({ icon, label, active }: any) {
    return (
        <button className={cn(
            "w-full text-left p-3 rounded-xl flex items-center gap-3 font-bold text-sm tracking-wide transition-colors",
            active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
        )}>
            {icon} {label}
        </button>
    );
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
