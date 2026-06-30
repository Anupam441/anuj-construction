import api from './axios.js';

// Auth
export const authAPI = {
  login:          (data)        => api.post('/auth/login', data),
  logout:         ()            => api.post('/auth/logout'),
  getMe:          ()            => api.get('/auth/me'),
  changePassword: (data)        => api.put('/auth/change-password', data),
};

// Projects
export const projectsAPI = {
  getAll:      (params)   => api.get('/projects', { params }),
  getAdminAll: ()         => api.get('/projects/admin/all'),
  getOne:      (id)       => api.get(`/projects/${id}`),
  create:      (data)     => api.post('/projects', data),
  update:      (id, data) => api.put(`/projects/${id}`, data),
  delete:      (id)       => api.delete(`/projects/${id}`),
};

// Services
export const servicesAPI = {
  getAll:      ()         => api.get('/services'),
  getAdminAll: ()         => api.get('/services/admin/all'),
  getOne:      (id)       => api.get(`/services/${id}`),
  create:      (data)     => api.post('/services', data),
  update:      (id, data) => api.put(`/services/${id}`, data),
  delete:      (id)       => api.delete(`/services/${id}`),
};

// Testimonials
export const testimonialsAPI = {
  getAll:      ()         => api.get('/testimonials'),
  getAdminAll: ()         => api.get('/testimonials/admin/all'),
  create:      (data)     => api.post('/testimonials', data),
  update:      (id, data) => api.put(`/testimonials/${id}`, data),
  delete:      (id)       => api.delete(`/testimonials/${id}`),
};

// Contact
export const contactAPI = {
  submit:   (data) => api.post('/contact', data),
  getAll:   (params) => api.get('/contact', { params }),
  getOne:   (id)   => api.get(`/contact/${id}`),
  markRead: (id)   => api.patch(`/contact/${id}/read`),
  delete:   (id)   => api.delete(`/contact/${id}`),
};