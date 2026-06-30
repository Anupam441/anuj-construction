import Service from '../models/Service.js';

// Get all active services (public)
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ order: 1 });
    res.status(200).json({ 
      success: true, 
      count: services.length, 
      data: services 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get all services (admin)
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({})
      .sort({ order: 1 });
    res.status(200).json({ 
      success: true, 
      count: services.length, 
      data: services 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get single service
export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found.' 
      });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) { 
    next(error); 
  }
};

// Create service
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Service created.', 
      data: service 
    });
  } catch (error) { 
    next(error); 
  }
};

// Update service
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Service updated.', 
      data: service 
    });
  } catch (error) { 
    next(error); 
  }
};

// Delete service
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Service deleted.' 
    });
  } catch (error) { 
    next(error); 
  }
};