import Contact from '../models/Contact.js';

// Submit contact form (public)
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email and message are required.' 
      });
    }

    const inquiry = await Contact.create({ 
      name, 
      email, 
      phone, 
      service, 
      message 
    });
    
    res.status(201).json({ 
      success: true, 
      message: "Thank you! We'll get back to you within 24 hours.", 
      data: { id: inquiry._id } 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get all contacts (admin)
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    
    const [contacts, total] = await Promise.all([
      Contact.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Contact.countDocuments(),
    ]);
    
    const unreadCount = await Contact.countDocuments({ isRead: false });
    
    res.status(200).json({ 
      success: true, 
      count: contacts.length, 
      total, 
      unreadCount, 
      data: contacts 
    });
  } catch (error) { 
    next(error); 
  }
};

// Get single contact (admin)
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { isRead: true }, 
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found.' 
      });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) { 
    next(error); 
  }
};

// Mark as read (admin)
export const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { isRead: true }, 
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Marked as read.', 
      data: contact 
    });
  } catch (error) { 
    next(error); 
  }
};

// Delete contact (admin)
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found.' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Inquiry deleted.' 
    });
  } catch (error) { 
    next(error); 
  }
};