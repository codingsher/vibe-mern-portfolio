import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowRight } from 'react-icons/fi';

const NotFound = () => {
  return (
    <section className="section pt-20">
      <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-4xl font-bold mb-6 text-secondary dark:text-light">Page Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/" className="btn btn-primary flex items-center justify-center gap-2">
            <FiHome /> Go to Homepage
          </Link>
          <Link to="/contact" className="btn border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
            Contact Support <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound; 