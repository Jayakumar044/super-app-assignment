import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SECTIONS = [
    {
        title: "1. Acceptance of Terms",
        content: `By accessing or using the Super App platform ("the Platform"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the Platform. These terms apply to all visitors, users, and others who access or use the service.`,
    },
    {
        title: "2. User Accounts",
        content: `To access certain features of the Super App, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account. You agree to provide accurate, current, and complete information and to update such information to keep it accurate. The Super App reserves the right to suspend or terminate accounts that violate these terms.`,
    },
    {
        title: "3. Permitted Use",
        content: `You may use the Super App for personal, non-commercial purposes only. You agree NOT to: (a) impersonate any person or entity; (b) upload or transmit content that is unlawful, harmful, or offensive; (c) interfere with or disrupt the Platform or its servers; (d) attempt to gain unauthorized access to any portion of the Platform; (e) use the Platform for any illegal or unauthorized purpose.`,
    },
    {
        title: "4. Content & Intellectual Property",
        content: `All content on the Platform — including text, graphics, logos, icons, and software — is the property of the Super App or its content suppliers and protected by applicable intellectual property laws. You retain ownership of personal content you submit, but grant the Super App a non-exclusive, worldwide, royalty-free license to use such content in connection with the service.`,
    },
    {
        title: "5. Third-Party Services",
        content: `The Super App integrates with third-party APIs including weather data providers (OpenWeatherMap), movie databases (OMDB), and news aggregators (NewsAPI). These services are governed by their own terms and privacy policies. The Super App is not responsible for the content, accuracy, or practices of any third-party services.`,
    },
    {
        title: "6. Disclaimer of Warranties",
        content: `The Platform is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. The Super App does not warrant that the service will be uninterrupted, timely, secure, or error-free. Entertainment content is sourced from third-party APIs and we make no guarantees about its accuracy or completeness.`,
    },
    {
        title: "7. Limitation of Liability",
        content: `In no event shall the Super App, its directors, officers, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, the Platform. This limitation applies even if the Super App has been advised of the possibility of such damages.`,
    },
    {
        title: "8. Modifications to Terms",
        content: `The Super App reserves the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of the Platform after changes are posted constitutes your acceptance of the new terms.`,
    },
    {
        title: "9. Governing Law",
        content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Tamil Nadu, India.`,
    },
    {
        title: "10. Contact",
        content: `If you have any questions about these Terms, please contact us at legal@superapp.in or write to us at Super App, Chennai, Tamil Nadu, India — 600001.`,
    },
];

export default function TermsPage() {
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
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mt-5 mb-3">Terms of Service</h1>
                        <p className="text-slate-400 text-sm font-medium">Last updated: June 26, 2026 &nbsp;·&nbsp; Super App Platform</p>
                        <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/15">
                            <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                Please read these Terms of Service carefully before using the Super App platform. By using Super App, you agree to be legally bound by these terms.
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
                        <a href="/privacy" className="text-primary font-bold text-xs hover:underline">Privacy Policy →</a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
