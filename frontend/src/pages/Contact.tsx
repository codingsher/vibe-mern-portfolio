import { useState, FormEvent } from 'react';
import SectionTitle from '../components/common/SectionTitle';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { sendContactMessage } from '../api/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="section pt-20">
      <div className="container">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Have a question or want to work together? Drop me a message!"
          center
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-8">
              {success ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible!
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="How can I help you?"
                      required
                    ></textarea>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary text-white rounded-xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <ContactItem 
                  icon={<FiMail />} 
                  title="Email" 
                  content="shershahsuri59@gmail.com" 
                  link="mailto:shershahsuri59@gmail.com" 
                />
                
                <ContactItem 
                  icon={<FiPhone />} 
                  title="Phone" 
                  content="+1 (555) 123-4567" 
                  link="tel:+15551234567" 
                />
                
                <ContactItem 
                  icon={<FiMapPin />} 
                  title="Location" 
                  content="San Francisco, CA" 
                />
              </div>
              
              <div className="mt-10">
                <h4 className="text-xl font-bold mb-4">Follow Me</h4>
                
                <div className="flex space-x-4">
                  {['GitHub', 'LinkedIn', 'Twitter'].map(platform => (
                    <a
                      key={platform}
                      href="#"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Item Component
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, content, link }) => (
  <div className="flex items-start">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mr-4">
      {icon}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      {link ? (
        <a 
          href={link}
          className="text-white/80 hover:text-white transition-colors duration-300"
        >
          {content}
        </a>
      ) : (
        <p className="text-white/80">{content}</p>
      )}
    </div>
  </div>
);

export default Contact; 