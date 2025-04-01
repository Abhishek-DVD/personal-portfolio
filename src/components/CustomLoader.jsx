import { motion } from 'framer-motion';

const CustomLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-40 bg-opacity-50 rounded-lg p-4">
            <motion.div
                className="text-2xl font-bold text-white mb-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                transition={{ duration: 1.2, repeat: Infinity }}
            >
                Fetching LeetCode Data...
            </motion.div>
            <motion.img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                alt="LeetCode Logo"
                className="w-12 h-12 animate-spin"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ imageRendering: 'crisp-edges' }}
            />
        </div>
    );
};

export default CustomLoader;
