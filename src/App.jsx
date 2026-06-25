import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./layouts/Layout.jsx";
import { RequireUser, RequireCategories } from "./routes/ProtectedRoute.jsx";
import Spinner from "./components/ui/Spinner.jsx";
import useAppStore from "./store/useAppStore";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const EntertainmentPage = lazy(() => import("./pages/EntertainmentPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.jsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.jsx"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="w-16 h-16 rounded-3xl bg-white shadow-2xl flex items-center justify-center border border-slate-100">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-slate-900 font-black tracking-tighter text-2xl uppercase">Super App</p>
        <p className="text-primary font-black uppercase tracking-[0.4em] text-[8px] mt-2">Skyway Intelligence</p>
      </div>
    </motion.div>
  </div>
);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.995 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -12, scale: 0.995 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);


function RootRedirect() {
  const user = useAppStore((s) => s.user);
  const cats = useAppStore((s) => s.selectedCategories);

  // If no user exists at all, go to register
  if (!user) return <Navigate to="/register" replace />;

  // If user exists but not logged in, go to login
  if (!user.isLoggedIn) return <Navigate to="/login" replace />;

  // If user is logged in but categories not selected (min 3), go to categories
  if (cats.length < 3) return <Navigate to="/categories" replace />;

  // Otherwise, go to dashboard
  return <Navigate to="/dashboard" replace />;
}


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/register" element={
          <Layout><PageTransition><RegisterPage /></PageTransition></Layout>
        } />
        <Route path="/login" element={
          <Layout><PageTransition><LoginPage /></PageTransition></Layout>
        } />
        <Route path="/categories" element={
          <RequireUser><Layout><PageTransition><CategoriesPage /></PageTransition></Layout></RequireUser>
        } />
        <Route path="/dashboard" element={
          <RequireCategories><Layout><PageTransition><DashboardPage /></PageTransition></Layout></RequireCategories>
        } />
        <Route path="/entertainment" element={
          <RequireCategories><Layout><PageTransition><EntertainmentPage /></PageTransition></Layout></RequireCategories>
        } />
        <Route path="/profile" element={
          <RequireCategories><Layout><PageTransition><ProfilePage /></PageTransition></Layout></RequireCategories>
        } />
        <Route path="/terms" element={<Layout><PageTransition><TermsPage /></PageTransition></Layout>} />
        <Route path="/privacy" element={<Layout><PageTransition><PrivacyPage /></PageTransition></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
