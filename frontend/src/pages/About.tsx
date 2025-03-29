import SectionTitle from '../components/common/SectionTitle';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <section className="section pt-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Photo and Brief Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1534&auto=format&fit=crop" 
                  alt="Sher Shah Suri" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-48 bg-primary flex items-center justify-center text-white text-lg font-semibold rounded-lg shadow-lg">
                Backend Developer
              </div>
            </div>

            <div className="mt-16 bg-white dark:bg-secondary p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-light">About Me</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I'm a passionate backend developer focusing on building robust and scalable server-side applications. I enjoy working with Python, Node.js, and various database technologies to create efficient backend systems.
              </p>
              <div className="flex space-x-4">
                <Link to="/contact" className="btn btn-primary">Hire Me</Link>
                <a href="https://github.com/codingsher" className="btn border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  View GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tabs for Projects and Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle
              title="My Expertise"
              subtitle="Learn more about my projects and technical skills."
            />

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
              <TabButton 
                active={activeTab === 'projects'} 
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </TabButton>
              <TabButton 
                active={activeTab === 'skills'} 
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </TabButton>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'projects' && <ProjectsTab />}
              {activeTab === 'skills' && <SkillsTab />}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Tab Button Component
interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick }) => (
  <button
    className={`py-4 px-6 font-medium text-lg border-b-2 transition-colors ${
      active
        ? 'border-primary text-primary'
        : 'border-transparent hover:text-primary'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Project Item Component
interface ProjectItemProps {
  title: string;
  technologies: string;
  githubLink: string;
  description: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title, technologies, githubLink, description }) => (
  <div className="mb-8 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary"></div>
    <h3 className="text-lg font-bold text-secondary dark:text-light mb-1">{title}</h3>
    <div className="flex justify-between items-center mb-2">
      <span className="text-primary font-medium">{technologies}</span>
      <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">View on GitHub</a>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

// Projects Tab Content
const ProjectsTab = () => (
  <div>
    <ProjectItem
      title="Auto Mail Replier"
      technologies="Python, OpenAI API, Gmail API"
      githubLink="https://github.com/codingsher/auto-mail-replier"
      description="Automated email response system using OpenAI/ChatGPT and Python. The application monitors Gmail inbox and automatically replies to emails based on custom filters and prompts."
    />
    <ProjectItem
      title="Car Rental System"
      technologies="Python, File Handling, OOP"
      githubLink="https://github.com/codingsher/car-rental-system"
      description="A Python-based car rental management system with features for managing cars, customers, transactions, and staff roles. Implements file-based storage and role-specific interfaces."
    />
    <ProjectItem
      title="CalDAV Calendar"
      technologies="JavaScript, CalDAV Protocol, HTML, CSS"
      githubLink="https://github.com/codingsher/caldav-calendar"
      description="A CalDAV-compatible calendar application that synchronizes with standard calendar protocols. Features event management, reminders, and integration with popular calendar services."
    />
  </div>
);

// Skills Tab Content
const SkillsTab = () => {
  const skillCategories = [
    {
      name: 'Backend Technologies',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'RESTful APIs', level: 85 },
      ],
    },
    {
      name: 'Databases',
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MySQL', level: 85 },
        { name: 'Redis', level: 70 },
      ],
    },
    {
      name: 'Tools & Other',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'API Integration', level: 85 },
        { name: 'Problem Solving', level: 90 },
      ],
    },
  ];

  return (
    <div>
      {skillCategories.map((category, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-secondary dark:text-light">{category.name}</h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.1 * skillIndex }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default About; 