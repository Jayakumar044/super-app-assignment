import { motion } from "framer-motion";

const Card = ({ children, className = "", hover = false, delay = 0, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={hover ? { y: -4, boxShadow: "0 30px 70px rgba(0,0,0,0.6)" } : {}}
    onClick={onClick}
    className={`glass rounded-2xl shadow-card ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;
