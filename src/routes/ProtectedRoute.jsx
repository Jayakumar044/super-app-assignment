import { Navigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";

export const RequireUser = ({ children }) => {
  const user = useAppStore((s) => s.user);
  if (!user) return <Navigate to="/register" replace />;
  if (!user.isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

export const RequireCategories = ({ children }) => {
  const user = useAppStore((s) => s.user);
  const cats = useAppStore((s) => s.selectedCategories);

  if (!user) return <Navigate to="/register" replace />;
  if (!user.isLoggedIn) return <Navigate to="/login" replace />;
  if (cats.length < 3) return <Navigate to="/categories" replace />;
  return children;
};

