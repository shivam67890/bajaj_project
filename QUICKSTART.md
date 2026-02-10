# 🚀 Quick Start Guide

## 1. Setup (5 minutes)

```bash
# Clone and navigate
cd chitkara-qualifier

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## 2. Get API Key (2 minutes)

1. Go to https://aistudio.google.com
2. Sign in with Google
3. Click "Get API Key" → "Create API key in new project"
4. Copy the key

## 3. Configure (1 minute)

Edit `.env`:
```env
OFFICIAL_EMAIL=yourname@chitkara.edu.in
GEMINI_API_KEY=paste_your_key_here
```

## 4. Run (1 second)

```bash
npm start
```

✅ Server running at http://localhost:3000

## 5. Test

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

## 6. Deploy to Vercel (3 minutes)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# Deploy
# 1. Go to vercel.com
# 2. Import GitHub repository
# 3. Add environment variables:
#    - OFFICIAL_EMAIL
#    - GEMINI_API_KEY
# 4. Deploy!
```

## Common Issues

### Port already in use
```bash
# Use different port
PORT=3001 npm start
```

### API Key not working
- Make sure there are no spaces in the key
- Check if API is enabled in Google Cloud Console

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Need Help?

- Check README.md for detailed documentation
- Run test suite: `npm test`
- Verify environment: `cat .env`

## API Endpoints Cheatsheet

### POST /bfhl
- `{"fibonacci": 7}` → Fibonacci sequence
- `{"prime": [2,4,7,9,11]}` → Filter primes
- `{"lcm": [12,18,24]}` → Calculate LCM
- `{"hcf": [24,36,60]}` → Calculate HCF
- `{"AI": "question?"}` → AI answer

### GET /health
- Health check

All responses include:
```json
{
  "is_success": true,
  "official_email": "your@chitkara.edu.in",
  "data": ...
}
```
