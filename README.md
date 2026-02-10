# Chitkara University Qualifier 2026 - REST API

Production-ready REST API implementation for Chitkara University Qualifier 1 (Feb 10, 2026).

## 🚀 Features

- ✅ POST /bfhl - Handles Fibonacci, Prime, LCM, HCF, and AI operations
- ✅ GET /health - Health check endpoint
- ✅ Robust input validation
- ✅ Comprehensive error handling
- ✅ Security guardrails (Helmet, Rate Limiting, CORS)
- ✅ Google Gemini AI integration
- ✅ Production-ready code structure

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Google Gemini API Key (free from https://aistudio.google.com)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd chitkara-qualifier
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your details:
```env
PORT=3000
NODE_ENV=production
OFFICIAL_EMAIL=your.email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Get Google Gemini API Key
1. Visit https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key"
4. Create API key in new or existing project
5. Copy the key and paste in `.env`

## 🏃 Running Locally

### Development mode (with auto-reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### POST /bfhl

Handles one of five operations: fibonacci, prime, lcm, hcf, or AI.

**Request must contain exactly ONE of:**

#### 1. Fibonacci
```json
{
  "fibonacci": 7
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

#### 2. Prime
```json
{
  "prime": [2, 4, 7, 9, 11]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

#### 3. LCM
```json
{
  "lcm": [12, 18, 24]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 72
}
```

#### 4. HCF
```json
{
  "hcf": [24, 36, 60]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 12
}
```

#### 5. AI
```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "Mumbai"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

## 🔒 Security Features

- **Helmet**: Sets secure HTTP headers
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Enabled for cross-origin requests
- **Input Validation**: Strict type and boundary checks
- **Request Size Limit**: 10KB maximum payload
- **Timeout Protection**: AI requests timeout after 10 seconds

## 📦 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via GitHub**
   - Push code to GitHub
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in settings:
     - `OFFICIAL_EMAIL`
     - `GEMINI_API_KEY`
     - `NODE_ENV=production`
   - Deploy

3. **Deploy via CLI**
   ```bash
   vercel
   ```

### Deploy to Railway

1. **Via GitHub**
   - Push code to GitHub
   - Go to https://railway.app
   - New Project → Deploy from GitHub
   - Select your repository
   - Add environment variables
   - Deploy

2. **Railway will auto-detect Node.js and run `npm start`**

### Deploy to Render

1. **Create new Web Service**
   - Go to https://render.com
   - New → Web Service
   - Connect your GitHub repository

2. **Configure**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables

3. **Deploy**

### Environment Variables (Required for all platforms)

```
OFFICIAL_EMAIL=your.email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

## 🧪 Testing

### Test POST /bfhl
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

### Test GET /health
```bash
curl http://localhost:3000/health
```

## 📁 Project Structure

```
chitkara-qualifier/
├── controllers/
│   ├── bfhlController.js    # POST /bfhl logic
│   └── healthController.js  # GET /health logic
├── services/
│   └── aiService.js         # Google Gemini integration
├── utils/
│   ├── validator.js         # Request validation
│   └── mathUtils.js         # Math operations
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
├── server.js               # Express server setup
└── README.md               # Documentation
```

## 🐛 Error Handling

All errors return:
```json
{
  "is_success": false,
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## ⚡ Performance Optimizations

- Efficient algorithms (Euclidean for GCD, optimized prime checking)
- Request size limits to prevent abuse
- Rate limiting to prevent DoS
- Timeout protection for AI requests
- Input validation before processing

## 📝 Validation Rules

- **fibonacci**: Integer, 0-1000
- **prime**: Array of integers, max 10,000 elements
- **lcm**: Array of positive integers, max 100 elements
- **hcf**: Array of positive integers, max 100 elements
- **AI**: String, 1-1000 characters



shivam shukla
- Email: shivam0885.be23@chitkara.edu.in
- GitHub: [@shivam67890](https://github.com/shivam67890)

## 🙏 Acknowledgments

- Chitkara University
- Google Gemini AI
- Express.js community
