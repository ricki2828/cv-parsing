// Default values for development
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  maxUploadSize: Number(process.env.REACT_APP_MAX_UPLOAD_SIZE) || 10 * 1024 * 1024, // 10MB
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@example.com',
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default config; 