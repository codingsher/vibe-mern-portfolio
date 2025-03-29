import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  technologies: {
    type: [String],
    required: [true, 'Technologies are required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Project image is required'],
  },
  demoUrl: {
    type: String,
  },
  repoUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project; 