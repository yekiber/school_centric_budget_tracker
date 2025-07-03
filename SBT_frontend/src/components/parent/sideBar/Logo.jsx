import { motion } from "framer-motion";
import { assets } from "../../../assets/assets";

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md"
    >
      <img src={assets.edu_logo} alt="" />
    </motion.div>
  );
};
export default Logo;
