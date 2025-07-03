/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({
  Icon,
  title = "Logout",
  selected,
  setSelected,
  open,
}) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Perform logout
    console.log("logout");
    navigate("/");
  };

  return (
    <motion.button
      layout
      onClick={() => {
        setSelected(title); // Updates the selected state
        handleLogout();
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

export default LogoutButton;
