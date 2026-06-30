// Date format karo
export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
};

// Text truncate karo
export const truncate = (text, maxLength = 150) => {
  if (!text) return '';
  return text.length <= maxLength ? text : `${text.slice(0, maxLength).trim()}…`;
};

// Error message nikalo
export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0]?.message ||
    error?.message ||
    'An unexpected error occurred.'
  );
};

// Stars array banao
export const getStars = (rating, max = 5) => {
  return Array.from({ length: max }, (_, i) => i < rating ? 'full' : 'empty');
};

// Page top pe scroll karo
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};