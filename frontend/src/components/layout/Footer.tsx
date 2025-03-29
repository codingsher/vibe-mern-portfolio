import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark py-10 border-t border-gray-200 dark:border-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 inline-block">
              Sher Shah Suri
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">
              A backend developer specializing in Node.js, Express, and MongoDB.
              Showcasing my projects, API development experience, and server-side expertise.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <SocialIcon icon={<FiGithub size={20} />} href="https://github.com" label="GitHub" />
              <SocialIcon icon={<FiLinkedin size={20} />} href="https://linkedin.com" label="LinkedIn" />
              <SocialIcon icon={<FiTwitter size={20} />} href="https://twitter.com" label="Twitter" />
              <SocialIcon icon={<FiMail size={20} />} href="mailto:shershahsuri59@gmail.com" label="Email" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-light">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/projects">Projects</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-light">Contact</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: shershahsuri59@gmail.com</li>
              <li>Location: Remote</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} Sher Shah Suri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Social Icon Component
interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-secondary dark:text-light hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors duration-300"
  >
    {icon}
  </motion.a>
);

// Footer Link Component
interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

export default Footer; 