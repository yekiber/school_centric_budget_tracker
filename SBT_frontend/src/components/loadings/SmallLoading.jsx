import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';

// This component uses Framer Motion to create a rotating loading icon.
export default function SmallLoading({ isLight = false, size = 40, center = false }) {
  return (
    <div className={`${center ? 'flex justify-center items-center w-full h-full' : ''}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={`flex items-center justify-center w-[40px] h-[40px] rounded-full 
          ${isLight ? 'text-white' : 'text-gray-700'}`}        
      >
        <AiOutlineLoading3Quarters size={size} />
      </motion.div>
    </div>
  );
}

