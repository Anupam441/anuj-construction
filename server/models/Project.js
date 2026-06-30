import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Residential','Commercial','Renovation','Electrical','Plumbing','Painting','Landscaping','Other'],
  },
  images: [{
    url:       { type: String, required: true },
    alt:       { type: String, default: '' },
    isPrimary: { type: Boolean, default: false },
  }],
  client:      { type: String, trim: true },
  location:    { type: String, trim: true },
  completedAt: { type: Date },
  duration:    { type: String, trim: true },
  featured:    { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);