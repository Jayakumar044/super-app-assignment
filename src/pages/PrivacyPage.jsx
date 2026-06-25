import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SECTIONS = [
    {
        title: "1. Information We Collect",
        content: `When you register with the Super App, we collect basic account information: your name, username, email address, and mobile number. This data is stored entirely in your browser's local storage and is not transmitted to any external server run by Super App.`,
    },
    {
        title: "2. How We Use Your Information",
        content: `We use your information to: (a) create and manage your Super App account; (b) personalise your experience based on your selected entertainment categories; (c) remember your preferences between sessions; (d) analyse usage patterns locally to improve your experience. We do not sell, trade, or transfer your personal information to any third party.`,
    },
    {
        title: "3. Data Storage & Security",
        content: `Your registration details (name, username, email, mobile) are stored in your browser's localStorage and persist until you explicitly clear your browser data. The Super App does not have a remote server and cannot access, read, or modify your stored data. You are in complete control of your information.`,
    },
    {
        title: "4. Third-Party Services",
        content: `Super App uses the following third-party APIs that may process request data: (a) OpenWeatherMap — for weather information based on your location query; (b) OMDB API — for movie and entertainment data; (c) NewsAPI — for curated news content. Each service has its own Privacy Policy. We encourage you to review: openweathermap.org, omdbapi.com, and newsapi.org.`,
    },
    {
        title: "5. Cookies & Local Storage",
        content: `Super App uses only browser localStorage to persist your session, categories, and preferences. This data stays on your device. We do not use tracking cookies, advertising cookies, or any form of cross-site tracking or analytics services.`,
    },
    {
        title: "6. Your Rights",
        content: `Because your data is stored locally in your browser, you have full control at all times. You can: (a) view your data by inspecting browser storage; (b) modify it by updating your profile; (c) delete all data by logging out and clearing browser local storage; (d) re-register at any time to start fresh.`,
    },
    {
        title: "7. Children's Privacy",
        content: `Super App is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has created an account, you can clear the browser data to remove all stored information immediately.`,
    },
    {
        title: "8. Content Safety",
        content: `The entertainment section applies content safety filters to ensure results are appropriate for a general audience. We filter romantic and mature genres from API results. However, since content is sourced from third-party APIs, we recommend parental supervision for younger users.`,
    },
    {
        title: "9. Changes to This Policy",
        content: `We may update this Privacy Policy to reflect changes in our practices. We will update the effective date when changes are made. Your continued use of the Super App after changes are posted indicates your acceptance of the revised policy.`,
    },
    {
        title: "10. Contact Us",
        content: `For privacy-related questions or concerns, please contact us at: privacy@superapp.in — or visit our Terms of Service page for additional legal information. We aim to respond to all enquiries within 72 hours.`,
    },
];

export default function PrivacyPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm mb-8 transition-colors"
                    >
                        ← Back
                    </button>

                    <div className="mb-12">
                        <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">Legal</span>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mt-5 mb-3">Privacy Policy</h1>
                        <p className="text-slate-400 text-sm font-medium">Last updated: June 26, 2026 &nbsp;·&nbsp; Super App Platform</p>
                        <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                            <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                🔒 <strong>Privacy-first:</strong> Super App stores all your data locally in your browser. We have no backend server, which means your personal information never leaves your device.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {SECTIONS.map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm"
                            >
                                <h2 className="text-lg font-black text-slate-900 mb-3">{section.title}</h2>
                                <p className="text-slate-500 text-sm leading-relaxed">{section.content}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                        <p className="text-slate-400 text-xs">© 2026 Super App. All rights reserved.</p>
                        <a href="/terms" className="text-primary font-bold text-xs hover:underline">Terms of Service →</a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
