import React from "react";
import {
  ShieldCheck,
  Cloud,
  KeyRound,
  BookOpen,
  ArrowRight,
  Clock3,
  User2,
  BookMarked,
} from "lucide-react";

const data = {
  image: [
    "step1.png",
    "step2.png",
    "step3.png",
    "step4.png",
    "step5.png",
    "step6.png",
    "step7.png",
    "step8.png",
    "step9.png",
    "step10.png",
  ],

  title: "IBM App ID",

  description:
    "IBM App ID is a secure cloud-based authentication and authorization platform that helps developers add identity management, social login, and access control to applications.",

  steps: [
    "Open IBM Cloud and login with your IBM account.",
    "Open Dashboard and search for App ID service.",
    "Select App ID service and create a new resource.",
    "Choose region and Lite plan, then create service.",
    "Launch App ID dashboard from IBM Cloud.",
    "Create a new App ID application.",
    "View credentials and copy Client ID and Secret.",
    "Integrate credentials into your application.",
    "Manage authentication settings and metrics.",
    "Read official IBM App ID documentation.",
  ],
};

export default function Courses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12 items-start">
          <aside className="hidden lg:block sticky top-10 bg-slate-900/70 border border-white/10 rounded-[28px] p-6 h-fit">
            <h3 className="text-xl font-bold mb-6">API Reference</h3>

            <nav className="space-y-3 text-sm">
              <a href="#" className="block text-blue-400 bg-blue-500/10 px-4 py-3 rounded-xl">
                Introduction
              </a>

              <a href="#" className="block hover:bg-white/5 px-4 py-3 rounded-xl text-slate-300 transition">
                Setup Guide
              </a>

              <a href="#" className="block hover:bg-white/5 px-4 py-3 rounded-xl text-slate-300 transition">
                Authentication
              </a>

              <a href="#" className="block hover:bg-white/5 px-4 py-3 rounded-xl text-slate-300 transition">
                API Keys
              </a>

              <a href="#" className="block hover:bg-white/5 px-4 py-3 rounded-xl text-slate-300 transition">
                Security
              </a>

              <a href="#" className="block hover:bg-white/5 px-4 py-3 rounded-xl text-slate-300 transition">
                SDK Integration
              </a>
            </nav>
          </aside>

          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              <ShieldCheck size={18} />
              Secure Authentication Platform
            </div>

            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
              {data.title}
            </h1>

            <p className="text-slate-300 text-lg leading-8 mb-8 max-w-2xl">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition">
                Read Docs
                <ArrowRight size={20} />
              </button>

              <button className="border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-2xl font-semibold transition">
                Documentation
              </button>
            </div>
          </div>

     
        </div>
      </section>

     

      {/* FOOTER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-blue-100 mb-4">
              <BookMarked size={20} />
              Developer Learning Hub
            </div>

            <h2 className="text-4xl font-black mb-4">
              Build Secure Applications
            </h2>

            <p className="text-blue-100 max-w-2xl leading-8">
              Access technical documentation, setup instructions, and developer resources for IBM Cloud authentication services.
            </p>
          </div>

          <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-bold transition whitespace-nowrap">
            View Documentation
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-slate-500">
        <p>© 2026 IBM App ID Learning Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}
