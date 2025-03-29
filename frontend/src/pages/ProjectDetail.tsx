import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { Project, getProjectById } from '../api/projectService';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedProject = await getProjectById(id);
          setProject(fetchedProject);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project details. Please try again later.');
        
        // Use placeholder data if API fails
        if (id) {
          const placeholderProject: Project = {
            _id: id,
            title: 'Sample Project',
            description: 'This is a placeholder project description. The actual project data could not be fetched from the server.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            demoUrl: 'https://example.com',
            repoUrl: 'https://github.com',
            featured: true,
            order: 1
          };
          
          setProject(placeholderProject);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="section pt-20">
        <div className="container min-h-screen flex justify-center items-center">
          <p className="text-xl text-gray-500">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="section pt-20">
        <div className="container min-h-screen flex flex-col justify-center items-center">
          <p className="text-xl text-red-500 mb-6">{error}</p>
          <Link to="/projects" className="btn btn-primary">
            <FiArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section pt-20">
        <div className="container min-h-screen flex flex-col justify-center items-center">
          <p className="text-xl text-gray-800 dark:text-gray-200 mb-6">Project not found.</p>
          <Link to="/projects" className="btn btn-primary">
            <FiArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="section pt-20">
      <div className="container">
        {/* Navigation */}
        <div className="mb-10">
          <Link to="/projects" className="flex items-center text-primary hover:text-primary-dark font-medium">
            <FiArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </div>
        
        {/* Project Header */}
        <div className="mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.title}
          </motion.h1>
          
          <motion.div 
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
        
        {/* Project Image */}
        <motion.div 
          className="w-full h-[60vh] rounded-xl overflow-hidden shadow-lg mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-light">Project Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {project.description}
              </p>
              
              {/* Example of extended description - in a real app, this would come from the API */}
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                This project was developed to solve the problem of [specific problem]. It features a modern, responsive design and implements best practices for performance and accessibility.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-secondary dark:text-light">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Feature one with detailed explanation</li>
                <li>Another significant feature of this project</li>
                <li>Technical achievement or challenging aspect</li>
                <li>User experience consideration and solution</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-secondary dark:text-light">Technical Details</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The project is built with [project.technologies.join(', ')]. It implements [specific technical detail] and utilizes [specific libraries or tools] for [specific functionality].
              </p>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white dark:bg-secondary p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-secondary dark:text-light">Project Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</h3>
                  <p className="text-gray-800 dark:text-gray-200">Example Client Inc.</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</h3>
                  <p className="text-gray-800 dark:text-gray-200">3 months (Q2 2023)</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</h3>
                  <p className="text-gray-800 dark:text-gray-200">Lead Developer</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    <FiExternalLink className="mr-2" /> View Live Demo
                  </a>
                )}
                
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FiGithub className="mr-2" /> View Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail; 