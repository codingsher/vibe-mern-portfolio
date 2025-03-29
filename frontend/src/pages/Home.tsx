import Hero from '../components/home/Hero';
import SectionTitle from '../components/common/SectionTitle';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/projectService';
import ProjectCard from '../components/projects/ProjectCard';
import { Project } from '../api/projectService';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const allProjects = await getProjects();
        const featuredProjects = allProjects
          .filter(project => project.featured)
          .slice(0, 3);
        setProjects(featuredProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Always use placeholder data
        setProjects([
          {
            _id: '1',
            title: 'Auto Mail Reply',
            description: 'A Python program that fetches unread emails from Google Account and uses integrated LLAMA3 AI model to generate suitable responses. Features automatic email processing for student paper rechecking requests.',
            technologies: ['Python', 'LLAMA3 AI', 'Gmail API', 'SMTP', 'IMAP'],
            imageUrl: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            demoUrl: 'https://github.com/codingsher/Auto_Mail_Reply',
            repoUrl: 'https://github.com/codingsher/Auto_Mail_Reply',
            featured: true,
            order: 1
          },
          {
            _id: '2',
            title: 'Car Rental System',
            description: 'A C++ console application for car rental management that I built when I started my programming journey. Features basic rental operations and file-based data storage.',
            technologies: ['C++', 'Console Application', 'File Handling', 'OOP'],
            imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1276&q=80',
            demoUrl: 'https://github.com/codingsher/car_rental_system',
            repoUrl: 'https://github.com/codingsher/car_rental_system',
            featured: true,
            order: 2
          },
          {
            _id: '3',
            title: 'CalDAV Calendar',
            description: 'A Python-based calendar application that implements the CalDAV protocol (RFC4791) for synchronizing calendars across devices. Features include creating and modifying calendars, managing events, and searching events by date ranges.',
            technologies: ['Python', 'CalDAV Protocol', 'RESTful APIs', 'iCalendar', 'Web Services'],
            imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
            demoUrl: 'https://github.com/codingsher/CalDAV_Calendar',
            repoUrl: 'https://github.com/codingsher/CalDAV_Calendar',
            featured: true,
            order: 3
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <SectionTitle
            title="Featured Projects"
            subtitle="Here are some of my recent backend development projects that showcase my skills and expertise."
            center
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-500">Loading projects...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} index={index} />
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  View All Projects <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="My Skills"
            subtitle="I specialize in the following technologies and tools."
            center
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-secondary p-6 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="text-4xl text-primary mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start a Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I'm currently available for backend development work. Let's build robust and scalable systems together!
          </p>
          <Link
            to="/contact"
            className="btn bg-white text-primary hover:bg-gray-100 hover:text-primary-dark"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
};

// Placeholder skills data (normally would come from backend)
const skills = [
  {
    name: 'Backend Development',
    description: 'Node.js, Express, Fastify, NestJS',
    icon: '⚙️'
  },
  {
    name: 'API Development',
    description: 'RESTful APIs, GraphQL, WebSockets',
    icon: '🔌'
  },
  {
    name: 'Database',
    description: 'MongoDB, PostgreSQL, Redis, MySQL',
    icon: '🗄️'
  },
  {
    name: 'Authentication',
    description: 'JWT, OAuth2, Passport.js, Role-based Access',
    icon: '🔐'
  },
  {
    name: 'DevOps',
    description: 'Docker, AWS, CI/CD, Kubernetes',
    icon: '🚀'
  },
  {
    name: 'Server Management',
    description: 'Nginx, PM2, Linux, Cloud Services',
    icon: '🖥️'
  },
  {
    name: 'Testing',
    description: 'Jest, Mocha, Chai, Supertest',
    icon: '🧪'
  },
  {
    name: 'Version Control',
    description: 'Git, GitHub, GitLab, CI/CD Pipelines',
    icon: '📝'
  }
];

export default Home; 