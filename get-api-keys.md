# 🔑 Get Your Google API Keys - Step by Step

## 🤖 1. Google Gemini AI API Key (FREE)

### Step 1: Go to Google AI Studio
- Visit: **https://makersuite.google.com/app/apikey**
- Sign in with your Google account

### Step 2: Create API Key
- Click **"Create API Key"**
- Select your Google Cloud project (or create new one)
- Copy the generated key (starts with `AIzaSy...`)

### Step 3: Update Your Code
```javascript
// In config.js, replace:
GEMINI_API_KEY: 'AIzaSyDEyr4Ww-AOK-RxQcAuTo_v1MwLH-jMoSA', // Your actual key here
```

---

## 🗺️ 2. Google Maps API Key

### Step 1: Go to Google Cloud Console
- Visit: **https://console.cloud.google.com/**
- Sign in and select/create a project

### Step 2: Enable Required APIs
Go to **"APIs & Services" → "Library"** and enable:
- ✅ **Maps JavaScript API**
- ✅ **Places API**
- ✅ **Geocoding API**

### Step 3: Create Credentials
- Go to **"APIs & Services" → "Credentials"**
- Click **"Create Credentials" → "API Key"**
- Copy the key (starts with `AIzaSy...`)

### Step 4: Update Your Code
```javascript
// In config.js, replace:
MAPS_API_KEY: 'AIzaSyC-YOUR_ACTUAL_MAPS_KEY_HERE',
```

---

## 🧪 3. Test Your Integration

### Open the Test Page
1. Open `test-real-ai.html` in your browser
2. Click **"Check APIs"** - should show ✅ for configured keys
3. Click **"Test Gemini AI"** - should generate real AI response
4. Click **"Generate with Real AI"** - creates actual itinerary

---

## 💰 4. API Costs (All Have Free Tiers!)

### Gemini AI - FREE for Hackathons
- **Free**: 60 requests/minute
- **Paid**: $0.00025 per 1K characters
- **Your Usage**: ~10-20 requests for demo = **FREE**

### Google Maps API - FREE $200/month
- **Free Credit**: $200 monthly
- **Places API**: $0.032 per request  
- **Your Usage**: ~50 requests for demo = **$1.60** (covered by free credit)

---

## ⚡ 5. Quick Setup (2 minutes)

### Copy-Paste Ready Config:
```javascript
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSy-PASTE_YOUR_GEMINI_KEY_HERE',
    MAPS_API_KEY: 'AIzaSy-PASTE_YOUR_MAPS_KEY_HERE',
    
    FEATURES: {
        USE_REAL_AI: true,      // ← Enable real AI
        USE_MAPS_API: true,     // ← Enable Maps
        DEMO_MODE: false        // ← Disable hardcoded data
    }
};
```

---

## 🚨 Important Notes

### For Hackathon Demo:
- ✅ **Client-side API keys are OK** for demo purposes
- ✅ **Free tiers cover your usage**
- ✅ **Fallback to demo mode** if APIs fail

### For Production:
- 🔒 **Move keys to backend/environment variables**
- 🛡️ **Add API key restrictions**
- 📊 **Monitor usage and costs**

---

## 🎯 Verification Steps

1. **Get Gemini Key**: https://makersuite.google.com/app/apikey
2. **Get Maps Key**: https://console.cloud.google.com/
3. **Update config.js** with your actual keys
4. **Open test-real-ai.html** to verify
5. **See "✅ Real AI working!"** message

**Your MVP will now use REAL Google AI instead of hardcoded data!** 🚀