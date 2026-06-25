import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import Button from "../components/ui/Button.jsx";
import FloatingInput from "../components/ui/FloatingInput.jsx";

export default function LoginPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const login = useAppStore((s) => s.login);
    const registeredUser = useAppStore((s) => s.user);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!registeredUser) {
            setError("No user registered. Please sign up first.");
            return;
        }

        if (registeredUser.username !== formData.username && registeredUser.email !== formData.username) {
            setError("User not found correctly.");
            return;
        }

        if (registeredUser.password !== formData.password) {
            setError("Invalid password.");
            return;
        }

        const success = login(formData);
        if (success) {
            navigate("/dashboard");
        } else {
            setError("Login failed. Please check your credentials.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-50">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium w-full max-w-md p-10 relative z-10 rounded-[3rem] border border-white shadow-2xl shadow-slate-200"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-primary/10 rounded-[2rem] mx-auto mb-8 flex items-center justify-center p-4 border border-primary/20 shadow-xl shadow-primary/10"
                    >
                        <img src="/src/assets/logo.png" alt="Skyway" className="w-full h-full object-contain" />
                    </motion.div>

                    <h1 className="text-4xl font-black mb-3 tracking-tighter text-slate-900 leading-none">Welcome Back</h1>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed">Continue your journey into the hub.</p>
                </div>


                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <FloatingInput
                        label="Username or Email"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                    <FloatingInput
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary transition-all cursor-pointer"
                            />
                            <span className="text-muted group-hover:text-white transition-colors">Remember Me</span>
                        </label>
                        <Link to="#" className="text-primary hover:underline">Forgot password?</Link>
                    </div>

                    <Button type="submit" className="w-full py-4 text-base font-bold shadow-xl shadow-primary/10">
                        Sign In
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-muted text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
