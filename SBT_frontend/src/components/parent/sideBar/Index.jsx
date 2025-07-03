import { useState } from "react";
import {
  FiDollarSign,
  FiHome,
  FiLogOut,
  FiMonitor,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ToggleClose from "./ToggleClose";
import Option from "./Option";
import TitleSection from "./TitleSelection";
import LogoutButton from "./LogoutButton";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="mt-20 sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-4"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        {/* <Option
          Icon={FiUser}
          title="Profile"
          selected={selected}
          setSelected={setSelected}
          open={open}
        /> */}
        <Option
          Icon={FiDollarSign}
          title="Payment"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <Option
          Icon={FiMonitor}
          title="Pyament History"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiMonitor}
          title="Notfication"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        {/* <LogoutButton
          Icon={FiLogOut}
          title="Logout"
          selected={selected}
          setSelected={setSelected}
          open={open}
          // onLogout={handleLogout}
        /> */}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};
export default SideBar;
