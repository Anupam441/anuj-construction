import Project from '../models/Project.js';

// Get all published projects (public)
export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 12 } = req.query;
    
    const filter = { isPublished: true };
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.featured = true;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Project.countDocuments(filter),
    ]);
    
    res.status(200).json({ 
      success: true, 
      count: projects.length, 
      total, 
      data: projects 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get all projects (admin)
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: projects.length, 
      data: projects 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get single project
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found.' 
      });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) { 
    next(error); 
  }
};

// Create project
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Project created.', 
      data: project 
    });
  } catch (error) { 
    next(error); 
  }
};

// Update project
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Project updated.', 
      data: project 
    });
  } catch (error) { 
    next(error); 
  }
};

// Delete project
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Project deleted.' 
    });
  } catch (error) { 
    next(error); 
  }
};