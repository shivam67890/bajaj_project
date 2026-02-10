const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'your.email@chitkara.edu.in';

/**
 * Health check endpoint
 */
exports.healthCheck = (req, res) => {
  try {
    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      is_success: false,
      error: 'Health check failed'
    });
  }
};
