# Google AI Integration Setup Guide

## 🔑 API Keys Required

### 1. Google Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and replace `YOUR_GEMINI_API_KEY_HERE` in `config.js`

### 2. Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API and Places API
3. Create credentials → API Key
4. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` in `config.js`

### 3. Firebase Setup (Optional)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Get your config object
4. Replace the `FIREBASE_CONFIG` object in `config.js`

## ⚙️ Configuration Steps

### Step 1: Update config.js
```javascript
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyC-your-actual-gemini-key-here',
    MAPS_API_KEY: 'AIzaSyD-your-actual-maps-key-here',
    
    FEATURES: {
        USE_REAL_AI: true,     // Enable Gemini AI
        USE_MAPS_API: true,    // Enable Maps integration
        USE_FIREBASE: false,   // Enable Firebase (optional)
        DEMO_MODE: false       // Disable demo mode
    }
};
```

### Step 2: Test the Integration
1. Open `index.html` in browser
2. You should see "🤖 **Google Gemini AI** - Active" status
3. Generate an itinerary to test real AI responses

## 🚀 Current vs Enhanced Features

### Current MVP (Demo Mode)
```
✅ Hardcoded attraction database
✅ Static cost calculations  
✅ Simulated AI responses
✅ Client-side only
```

### Enhanced with Google AI
```
🤖 Real Gemini AI itinerary generation
🗺️ Google Maps place details & ratings
🔥 Firebase data persistence
📊 BigQuery analytics (future)
🌍 Real-time location data
```

## 🔄 Fallback Strategy

The system automatically falls back to demo mode if:
- API keys are not configured
- API calls fail
- Network issues occur

This ensures your hackathon demo always works!

## 📊 API Usage Costs

### Google Gemini AI
- **Free Tier**: 60 requests per minute
- **Paid**: $0.00025 per 1K characters

### Google Maps API
- **Free Tier**: $200 credit monthly
- **Places API**: $0.032 per request

### Firebase
- **Free Tier**: 1GB storage, 10GB transfer
- **Paid**: Pay as you scale

## 🛡️ Security Best Practices

### For Hackathon Demo
```javascript
// OK for demo - client-side keys
GEMINI_API_KEY: 'your-key-here'
```

### For Production
```javascript
// Use environment variables
GEMINI_API_KEY: process.env.GEMINI_API_KEY
```

## 🎯 Quick Start Commands

### Enable Real AI (with your keys)
```javascript
CONFIG.FEATURES.USE_REAL_AI = true;
CONFIG.GEMINI_API_KEY = 'your-actual-key';
```

### Test Demo Mode
```javascript
CONFIG.FEATURES.DEMO_MODE = true;
fillDemoData(); // Auto-fill form
```

## 🏆 Hackathon Presentation Tips

1. **Start with Demo Mode** - Show it works without dependencies
2. **Switch to Real AI** - Demonstrate actual Google integration
3. **Show Fallback** - Prove reliability with network issues
4. **Highlight Scalability** - Explain production architecture

Your MVP now supports both **demo mode** for reliability and **real Google AI** for innovation! 🚀