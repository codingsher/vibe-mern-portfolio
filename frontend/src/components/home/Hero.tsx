import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Animate background on mount
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center py-16">
      {/* Animated gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-10 dark:opacity-20 z-0"
        style={{
          backgroundImage: 'linear-gradient(45deg, #0070f3 0%, #6d28d9 50%, #0070f3 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      ></div>
      
      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-primary font-medium text-lg md:text-xl mb-4"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Sher Shah Suri
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300 mb-8"
            variants={itemVariants}
          >
            <span className="text-primary">Backend</span> Developer
          </motion.h2>
          
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-2xl"
            variants={itemVariants}
          >
            I specialize in building robust, scalable backend systems with Node.js, Express, MongoDB, and other server technologies.
            Passionate about creating efficient APIs, optimizing database performance, and implementing secure authentication systems.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <Link
              to="/projects"
              className="btn btn-primary flex items-center gap-2 group"
            >
              View Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/contact"
              className="btn border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>
          
          <motion.div
            className="flex gap-6 mt-10"
            variants={itemVariants}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 