# Modern Portfolio Website (Full-Stack)

A complete, professional portfolio website with a modern React frontend and Node.js/Express backend. Features animations, responsive design, and a beautiful UI.

## Features

- **Modern UI/UX**: Sleek, animated interface with smooth transitions and interactions
- **Responsive Design**: Fully responsive across all device sizes
- **Backend Integration**: RESTful API for contact form, projects data, and more
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Friendly**: Structured for optimal search engine visibility
- **Deployment Ready**: Configured for easy deployment to platforms like Vercel, Netlify, or Heroku

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Framer Motion for animations
- TailwindCSS for styling
- GSAP for advanced animations
- Three.js with React Three Fiber for 3D elements
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB for data storage
- JWT for authentication
- Nodemailer for contact form
- Express Validator for input validation

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-fullstack
```

2. Install dependencies
```bash
npm run install:all
```

3. Set up environment variables
   - Create a `.env` file in the backend directory based on `.env.example`

4. Start development servers
```bash
npm run dev
```

This will start both frontend and backend servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment

### Frontend Deployment
1. Build the frontend
```bash
npm run build:frontend
```

2. Deploy the `frontend/dist` directory to any static hosting service:

#### Netlify Deployment
- Create a `netlify.toml` file in the frontend directory with:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel Deployment
- Create a `vercel.json` file in the frontend directory with:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Backend Deployment
1. Build the backend
```bash
npm run build:backend
```

2. Deploy the `backend/dist` directory to a Node.js hosting service:

#### Heroku Deployment
- Create a `Procfile` in the root directory with:
```
web: cd backend && npm start
```

#### Digital Ocean App Platform
- Create a simple `app.yaml` configuration file to deploy your Node.js application.

### Environment Variables
Make sure to set the appropriate environment variables for both frontend and backend:

- Frontend: Create a `.env` file in the frontend directory based on `.env.example`
- Backend: Create a `.env` file in the backend directory based on `.env.example`

For production, set these variables in your hosting provider's dashboard.

## Project Structure

```
portfolio-fullstack/
├── frontend/            # React frontend application
├── backend/             # Node.js/Express backend application
├── package.json         # Root package.json for project-wide scripts
└── README.md            # This file
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 