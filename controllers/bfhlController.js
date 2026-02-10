const validator = require('../utils/validator');
const mathUtils = require('../utils/mathUtils');
const aiService = require('../services/aiService');

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'your.email@chitkara.edu.in';

/**
 * Main controller for POST /bfhl endpoint
 */
exports.handleRequest = async (req, res) => {
  try {
    // Validate request has exactly one functional key
    const validationResult = validator.validateRequest(req.body);
    
    if (!validationResult.valid) {
      return res.status(400).json({
        is_success: false,
        error: validationResult.error
      });
    }

    const { key, value } = validationResult;
    let data;

    try {
      switch (key) {
        case 'fibonacci':
          data = await handleFibonacci(value);
          break;
        
        case 'prime':
          data = await handlePrime(value);
          break;
        
        case 'lcm':
          data = await handleLcm(value);
          break;
        
        case 'hcf':
          data = await handleHcf(value);
          break;
        
        case 'AI':
          data = await handleAI(value);
          break;
        
        default:
          return res.status(400).json({
            is_success: false,
            error: 'Invalid functional key'
          });
      }

      return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: data
      });

    } catch (error) {
      console.error(`Error processing ${key}:`, error);
      return res.status(400).json({
        is_success: false,
        error: error.message
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
};

/**
 * Handle fibonacci sequence generation
 */
async function handleFibonacci(n) {
  // Validate input
  if (!Number.isInteger(n)) {
    throw new Error('Fibonacci input must be an integer');
  }
  
  if (n < 0) {
    throw new Error('Fibonacci input must be non-negative');
  }
  
  if (n > 1000) {
    throw new Error('Fibonacci input too large (max: 1000)');
  }

  return mathUtils.generateFibonacci(n);
}

/**
 * Handle prime number filtering
 */
async function handlePrime(arr) {
  // Validate input
  if (!Array.isArray(arr)) {
    throw new Error('Prime input must be an array');
  }
  
  if (arr.length === 0) {
    throw new Error('Prime input array cannot be empty');
  }
  
  if (arr.length > 10000) {
    throw new Error('Prime input array too large (max: 10000)');
  }

  // Validate all elements are integers
  for (let num of arr) {
    if (!Number.isInteger(num)) {
      throw new Error('All elements in prime array must be integers');
    }
    if (num < 0) {
      throw new Error('Prime numbers must be non-negative');
    }
  }

  return mathUtils.filterPrimes(arr);
}

/**
 * Handle LCM calculation
 */
async function handleLcm(arr) {
  // Validate input
  if (!Array.isArray(arr)) {
    throw new Error('LCM input must be an array');
  }
  
  if (arr.length === 0) {
    throw new Error('LCM input array cannot be empty');
  }
  
  if (arr.length > 100) {
    throw new Error('LCM input array too large (max: 100)');
  }

  // Validate all elements are positive integers
  for (let num of arr) {
    if (!Number.isInteger(num) || num <= 0) {
      throw new Error('All elements in LCM array must be positive integers');
    }
  }

  return mathUtils.calculateLCM(arr);
}

/**
 * Handle HCF/GCD calculation
 */
async function handleHcf(arr) {
  // Validate input
  if (!Array.isArray(arr)) {
    throw new Error('HCF input must be an array');
  }
  
  if (arr.length === 0) {
    throw new Error('HCF input array cannot be empty');
  }
  
  if (arr.length > 100) {
    throw new Error('HCF input array too large (max: 100)');
  }

  // Validate all elements are positive integers
  for (let num of arr) {
    if (!Number.isInteger(num) || num <= 0) {
      throw new Error('All elements in HCF array must be positive integers');
    }
  }

  return mathUtils.calculateHCF(arr);
}

/**
 * Handle AI question processing
 */
async function handleAI(question) {
  // Validate input
  if (typeof question !== 'string') {
    throw new Error('AI input must be a string');
  }
  
  if (question.trim().length === 0) {
    throw new Error('AI question cannot be empty');
  }
  
  if (question.length > 1000) {
    throw new Error('AI question too long (max: 1000 characters)');
  }

  // Call AI service
  const answer = await aiService.getAnswer(question);
  return answer;
}
