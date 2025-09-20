# 🔧 Setup Instructions

## 🔑 API Keys Setup

### 1. Copy Config Template
```bash
cp config.example.js config.js
```

### 2. Get Google Gemini API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIzaSy...`)

### 3. Get Google Maps API Key
1. Go to: https://console.cloud.google.com/
2. Create/select a project
3. Enable APIs: Maps JavaScript API, Places API
4. Create credentials → API Key
5. Copy the key

### 4. Update config.js
```javascript
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSy-YOUR-ACTUAL-GEMINI-KEY',
    MAPS_API_KEY: 'AIzaSy-YOUR-ACTUAL-MAPS-KEY',
    
    FEATURES: {
        USE_REAL_AI: true,    // Enable real AI
        USE_MAPS_API: true,   // Enable Maps
        DEMO_MODE: false      // Disable demo mode
    }
};
```

## 🚀 Running the App

### Option 1: Direct Browser
```bash
# Just double-click:
index.html
```

### Option 2: Local Server (Recommended)
```bash
# Windows:
run-server.bat

# Or manually:
python simple-server.py
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## 🧪 Testing

### Test API Integration
```bash
# Open test files:
working-gemini-test.html  # Test real AI
quick-test.html          # Quick API test
```

### Verify Setup
1. Open `index.html`
2. Should see: "🤖 **Google Gemini AI** - REAL AI Active"
3. Generate itinerary - check console for API calls

## 🔒 Security Notes

- ✅ `config.js` is gitignored (won't be committed)
- ✅ Only `config.example.js` goes to GitHub
- ✅ Demo mode works without API keys
- ⚠️ For production: move keys to backend

## 🎯 Quick Demo

```javascript
// In browser console:
fillDemoData()  // Auto-fill form for testing
```

## 🏆 Ready for Hackathon!

Your setup is complete when you see:
- ✅ Real AI responses (not hardcoded)
- ✅ Different itineraries each time
- ✅ Console shows "🤖 USING REAL GEMINI AI"