
exports.validateRequest = (body) => {
  if (!body || typeof body !== 'object') {
    return {
      valid: false,
      error: 'Request body must be a valid JSON object'
    };
  }

  const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
  const receivedKeys = Object.keys(body).filter(key => validKeys.includes(key));

  if (receivedKeys.length === 0) {
    return {
      valid: false,
      error: 'Request must contain exactly one of: fibonacci, prime, lcm, hcf, AI'
    };
  }

  if (receivedKeys.length > 1) {
    return {
      valid: false,
      error: 'Request must contain exactly one functional key, found multiple: ' + receivedKeys.join(', ')
    };
  }

  const key = receivedKeys[0];
  const value = body[key];

  
  switch (key) {
    case 'fibonacci':
      if (typeof value !== 'number' || !Number.isInteger(value)) {
        return {
          valid: false,
          error: 'fibonacci value must be an integer'
        };
      }
      break;

    case 'prime':
    case 'lcm':
    case 'hcf':
      if (!Array.isArray(value)) {
        return {
          valid: false,
          error: `${key} value must be an array`
        };
      }
      break;

    case 'AI':
      if (typeof value !== 'string') {
        return {
          valid: false,
          error: 'AI value must be a string'
        };
      }
      break;
  }

  return {
    valid: true,
    key: key,
    value: value
  };
};
