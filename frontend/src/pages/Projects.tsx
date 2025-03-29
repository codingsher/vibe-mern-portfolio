import { useState, useEffect } from 'react';
import SectionTitle from '../components/common/SectionTitle';
import ProjectCard from '../components/projects/ProjectCard';
import { Project, getProjects } from '../api/projectService';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Get unique tech categories from projects
  const getUniqueTechCategories = (allProjects: Project[]) => {
    const allTechs = allProjects.flatMap(project => project.technologies);
    return [...new Set(allTechs)];
  };

  const [techFilters, setTechFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
        setTechFilters(getUniqueTechCategories(fetchedProjects));
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Always use placeholder data
        const placeholderProjects = [
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
          },
          {
            _id: '4',
            title: 'RESTful API Service',
            description: 'A comprehensive backend API service built with Node.js and Express. Features include authentication, data validation, and integration with MongoDB database.',
            technologies: ['Node.js', 'Express', 'MongoDB', 'JWT Authentication'],
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            demoUrl: 'https://github.com/codingsher/rest-api-service',
            repoUrl: 'https://github.com/codingsher/rest-api-service',
            featured: false,
            order: 4
          },
          {
            _id: '5',
            title: 'Database Migration Tool',
            description: 'A utility for migrating data between different database systems. Supports MySQL, PostgreSQL, and MongoDB with automated schema conversion.',
            technologies: ['Python', 'SQL', 'MongoDB', 'Data Processing'],
            imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1456&q=80',
            demoUrl: 'https://github.com/codingsher/db-migration-tool',
            repoUrl: 'https://github.com/codingsher/db-migration-tool',
            featured: false,
            order: 5
          },
          {
            _id: '6',
            title: 'Log Analyzer',
            description: 'A backend service that processes and analyzes log files, identifying patterns and anomalies. Includes visualization of key metrics and alert generation for critical events.',
            technologies: ['Python', 'Data Analysis', 'RegEx', 'Visualization'],
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            demoUrl: 'https://github.com/codingsher/log-analyzer',
            repoUrl: 'https://github.com/codingsher/log-analyzer',
            featured: false,
            order: 6
          }
        ];

        setProjects(placeholderProjects);
        setFilteredProjects(placeholderProjects);
        setTechFilters(getUniqueTechCategories(placeholderProjects));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by technology
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.technologies.includes(filter)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section className="section pt-20">
      <div className="container">
        <SectionTitle
          title="My Projects"
          subtitle="Browse through my recent projects and developments."
          center
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <FilterButton 
            label="All" 
            active={activeFilter === 'all'} 
            onClick={() => handleFilterChange('all')} 
          />
          
          {techFilters.map(tech => (
            <FilterButton
              key={tech}
              label={tech}
              active={activeFilter === tech}
              onClick={() => handleFilterChange(tech)}
            />
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">Loading projects...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">
                  No projects found with the selected filter.
                </p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project._id} 
                  project={project} 
                  index={index} 
                />
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Filter Button Component
interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 rounded-full transition-all duration-300 ${
      active 
        ? 'bg-primary text-white shadow-md'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Projects; 