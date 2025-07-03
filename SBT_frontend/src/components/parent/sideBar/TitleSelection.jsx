/* eslint-disable react/prop-types */
// import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import { motion } from "framer-motion";

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                Parent Dashboard
              </span>
              <span className="block text-xs text-slate-500">user name</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
