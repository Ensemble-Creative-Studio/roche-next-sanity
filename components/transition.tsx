import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
const Transition = ({ children }: any) => {
    const { asPath } = useRouter();

  return (
    <div className="effect-1">
     			<AnimatePresence
	      initial={false}
	      mode="wait"
	    >
        <motion.div     key={asPath} variants={variants} animate="in" initial="out" exit="out">
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
const variants = {
    out: {
      opacity: 0,
     
      transition: {
        duration: 0.3,
      },
    },
    in: {
      opacity: 1,
   
      transition: {
        duration: 0.3,
        delay: 0,
      },
    },
  };