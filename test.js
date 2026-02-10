/**
 * Simple test script for API endpoints
 * Run with: node test.js
 */

const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function testEndpoint(method, endpoint, data = null) {
  try {
    console.log(`\n🧪 Testing ${method} ${endpoint}`);
    if (data) {
      console.log('Request:', JSON.stringify(data, null, 2));
    }

    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: { 'Content-Type': 'application/json' }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    console.log('✅ Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    if (error.response) {
      console.log('❌ Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ Error:', error.message);
    }
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests');
  console.log('Base URL:', BASE_URL);
  console.log('='.repeat(60));

  // Test GET /health
  await testEndpoint('GET', '/health');

  // Test POST /bfhl - Fibonacci
  await testEndpoint('POST', '/bfhl', { fibonacci: 7 });

  // Test POST /bfhl - Prime
  await testEndpoint('POST', '/bfhl', { prime: [2, 4, 7, 9, 11] });

  // Test POST /bfhl - LCM
  await testEndpoint('POST', '/bfhl', { lcm: [12, 18, 24] });

  // Test POST /bfhl - HCF
  await testEndpoint('POST', '/bfhl', { hcf: [24, 36, 60] });

  // Test POST /bfhl - AI (only if GEMINI_API_KEY is set)
  if (process.env.GEMINI_API_KEY) {
    await testEndpoint('POST', '/bfhl', { 
      AI: "What is the capital city of Maharashtra?" 
    });
  } else {
    console.log('\n⚠️  Skipping AI test - GEMINI_API_KEY not set');
  }

  console.log('\n' + '='.repeat(60));
  console.log('🏁 Tests completed');
  
  // Error case tests
  console.log('\n📋 Testing Error Cases:');
  console.log('='.repeat(60));

  // Test multiple keys
  await testEndpoint('POST', '/bfhl', { 
    fibonacci: 5, 
    prime: [2, 3] 
  });

  // Test invalid type
  await testEndpoint('POST', '/bfhl', { 
    fibonacci: "invalid" 
  });

  // Test empty request
  await testEndpoint('POST', '/bfhl', {});

  // Test invalid endpoint
  await testEndpoint('GET', '/invalid-endpoint');

  console.log('\n' + '='.repeat(60));
  console.log('✨ All tests completed');
}

// Run tests
runTests().catch(console.error);
