export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message || 'Internal Server Error';

  if (err.name === 'CastError') { 
    message = 'Resource not found.'; 
    statusCode = 404; 
  }
  
  if (err.code === 11000) { 
    message = `Duplicate value for ${Object.keys(err.keyValue)[0]}.`; 
    statusCode = 400; 
  }
  
  if (err.name === 'ValidationError') { 
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(', '); 
    statusCode = 400; 
  }

  if (err.name === 'JsonWebTokenError') { 
    message = 'Invalid token.'; 
    statusCode = 401; 
  }
  
  if (err.name === 'TokenExpiredError') { 
    message = 'Token expired.'; 
    statusCode = 401; 
  }

  res.status(statusCode).json({ 
    success: false, 
    message 
  });
};