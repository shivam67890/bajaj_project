
exports.generateFibonacci = (n) => {
  if (n === 0) return [];
  if (n === 1) return [0];
  
  const fib = [0, 1];
  
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  
  return fib;
};


function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }
  
  return true;
}


exports.filterPrimes = (arr) => {
  return arr.filter(num => isPrime(num));
};


function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  
  return a;
}


function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}


exports.calculateHCF = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = gcd(result, arr[i]);
    if (result === 1) break; 
  }
  
  return result;
};


exports.calculateLCM = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }
  
  return result;
};
