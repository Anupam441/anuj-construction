import Testimonial from '../models/Testimonial.js';

// Get all published testimonials (public)
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: testimonials.length, 
      data: testimonials 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get all testimonials (admin)
export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({})
      .sort({ order: 1, createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: testimonials.length, 
      data: testimonials 
    });
  } catch (error) { 
    next(error); 
  }
};

// Create testimonial
export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Testimonial created.', 
      data: testimonial 
    });
  } catch (error) { 
    next(error); 
  }
};

// Update testimonial
export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ 
        success: false, 
        message: 'Testimonial not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Testimonial updated.', 
      data: testimonial 
    });
  } catch (error) { 
    next(error); 
  }
};

// Delete testimonial
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ 
        success: false, 
        message: 'Testimonial not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Testimonial deleted.' 
    });
  } catch (error) { 
    next(error); 
  }
};