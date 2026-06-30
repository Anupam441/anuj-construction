import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Service from './models/Service.js';
import Testimonial from './models/Testimonial.js';

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database...\n');

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Service.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data.');

  // Admin User
  await User.create({
    name:     'Anuj Admin',
    email:    'admin@anujconstruction.com',
    password: 'Admin@123456',
    role:     'admin',
  });
  console.log('👤 Admin user created!');

  // Services
  await Service.insertMany([
    {
      title:            'General Construction',
      shortDescription: 'Full-scale residential and commercial construction.',
      description:      'We handle every stage of construction from foundation to finish.',
      icon:             'building',
      features:         ['Site preparation', 'Foundation work', 'Framing & roofing', 'Interior finishing'],
      order:            1,
    },
    {
      title:            'Home Renovation',
      shortDescription: 'Transform your existing space with expert renovation.',
      description:      'Complete home renovation services to modernise your living space.',
      icon:             'hammer',
      features:         ['Kitchen remodels', 'Bathroom upgrades', 'Basement finishing', 'Room additions'],
      order:            2,
    },
    {
      title:            'Electrical Services',
      shortDescription: 'Licensed electrical installations and repairs.',
      description:      'Safe and certified electrical work for homes and businesses.',
      icon:             'zap',
      features:         ['Panel upgrades', 'New wiring', 'EV charger installation', 'Safety inspections'],
      order:            3,
    },
    {
      title:            'Plumbing',
      shortDescription: 'Expert plumbing for residential and commercial properties.',
      description:      'Complete plumbing solutions from repairs to full installations.',
      icon:             'droplets',
      features:         ['Pipe installation', 'Fixture replacement', 'Water heater services', '24/7 emergency'],
      order:            4,
    },
    {
      title:            'Painting & Finishing',
      shortDescription: 'Professional interior and exterior painting.',
      description:      'Premium painting services that protect and beautify your property.',
      icon:             'paintbrush',
      features:         ['Interior painting', 'Exterior painting', 'Cabinet refinishing', 'Colour consultation'],
      order:            5,
    },
    {
      title:            'Landscaping',
      shortDescription: 'Beautiful outdoor spaces designed to last.',
      description:      'Complete landscaping and outdoor living space construction.',
      icon:             'trees',
      features:         ['Patio construction', 'Retaining walls', 'Irrigation systems', 'Garden design'],
      order:            6,
    },
  ]);
  console.log('🔧 Services seeded!');

  // Projects
  await Project.insertMany([
    {
      title:       'Modern Family Home',
      description: 'A beautiful 3,200 sq ft custom family home built from the ground up with modern amenities.',
      category:    'Residential',
      images:      [{ url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', alt: 'Modern family home', isPrimary: true }],
      client:      'Sharma Family',
      location:    'Mumbai, India',
      completedAt: new Date('2024-03-15'),
      duration:    '8 months',
      featured:    true,
      order:       1,
    },
    {
      title:       'Office Renovation',
      description: 'Complete renovation of a 5,000 sq ft commercial office space with modern design.',
      category:    'Commercial',
      images:      [{ url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'Modern office', isPrimary: true }],
      client:      'Tech Solutions Ltd',
      location:    'Delhi, India',
      completedAt: new Date('2024-01-20'),
      duration:    '4 months',
      featured:    true,
      order:       2,
    },
    {
      title:       'Kitchen & Bath Remodel',
      description: 'High-end kitchen and master bathroom remodel with premium fixtures.',
      category:    'Renovation',
      images:      [{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Kitchen remodel', isPrimary: true }],
      client:      'Gupta Family',
      location:    'Bangalore, India',
      completedAt: new Date('2023-11-10'),
      duration:    '10 weeks',
      featured:    true,
      order:       3,
    },
    {
      title:       'Backyard & Garden',
      description: 'Beautiful backyard transformation with garden, patio and outdoor kitchen.',
      category:    'Landscaping',
      images:      [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Backyard garden', isPrimary: true }],
      client:      'Patel Family',
      location:    'Pune, India',
      completedAt: new Date('2023-09-05'),
      duration:    '6 weeks',
      featured:    true,
      order:       4,
    },
    {
      title:       'Commercial Complex',
      description: 'Ground-up construction of a 12,000 sq ft commercial complex.',
      category:    'Commercial',
      images:      [{ url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Commercial building', isPrimary: true }],
      client:      'Anuj Developers',
      location:    'Hyderabad, India',
      completedAt: new Date('2023-12-01'),
      duration:    '11 months',
      featured:    false,
      order:       5,
    },
    {
      title:       'Villa Construction',
      description: 'Luxury villa construction with premium finishes and smart home features.',
      category:    'Residential',
      images:      [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Luxury villa', isPrimary: true }],
      client:      'Singh Family',
      location:    'Chennai, India',
      completedAt: new Date('2024-05-01'),
      duration:    '14 months',
      featured:    true,
      order:       6,
    },
  ]);
  console.log('🏗️  Projects seeded!');

  // Testimonials
  await Testimonial.insertMany([
    {
      name:    'Rajesh Sharma',
      role:    'Homeowner',
      rating:  5,
      review:  'Anuj Construction built our dream home! The quality of work is outstanding and they finished on time. Highly recommended!',
      project: 'Modern Family Home',
      order:   1,
    },
    {
      name:    'Priya Gupta',
      role:    'Business Owner',
      rating:  5,
      review:  'Our office renovation was completed perfectly. Professional team, great communication throughout the project.',
      project: 'Office Renovation',
      order:   2,
    },
    {
      name:    'Amit Patel',
      role:    'Homeowner',
      rating:  5,
      review:  'Amazing kitchen remodel! They transformed our old kitchen into a modern masterpiece. Very happy with the results.',
      project: 'Kitchen & Bath Remodel',
      order:   3,
    },
    {
      name:    'Sunita Singh',
      role:    'Property Manager',
      rating:  4,
      review:  'Reliable and professional. We use Anuj Construction for all our properties. Quality is always consistent.',
      project: 'Various Projects',
      order:   4,
    },
    {
      name:    'Vikram Mehta',
      role:    'Homeowner',
      rating:  5,
      review:  'The backyard they designed for us is absolutely beautiful. Our neighbours always compliment it!',
      project: 'Backyard & Garden',
      order:   5,
    },
  ]);
  console.log('⭐ Testimonials seeded!');

  console.log('\n✅ Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔐 Admin Login:');
  console.log('   Email:    admin@anujconstruction.com');
  console.log('   Password: Admin@123456');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});