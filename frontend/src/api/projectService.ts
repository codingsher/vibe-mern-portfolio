import apiClient from './client';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get('/projects');
  return response.data;
};

// Get a project by ID
export const getProjectById = async (id: string): Promise<Project> => {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
};

// Create a new project (protected route)
export const createProject = async (projectData: Omit<Project, '_id'>): Promise<Project> => {
  const response = await apiClient.post('/projects', projectData);
  return response.data;
};

// Update a project (protected route)
export const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  const response = await apiClient.put(`/projects/${id}`, projectData);
  return response.data;
};

// Delete a project (protected route)
export const deleteProject = async (id: string): Promise<void> => {
  await apiClient.delete(`/projects/${id}`);
}; 