import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  center = false,
  light = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`mb-12 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className={`section-title ${light ? 'text-white' : ''}`}>
        {title}
        <span className="inline-block">
          <motion.span
            className="inline-block w-12 h-1 bg-primary rounded-full ml-2 mb-1"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.span>
        </span>
      </h2>
      
      {subtitle && (
        <p className={`text-lg ${light ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'} max-w-3xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle; 