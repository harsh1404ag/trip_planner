// Google AI Configuration Template
// Copy this file to 'config.js' and add your actual API keys

const CONFIG = {
    // Google AI API Keys (Get from: https://makersuite.google.com/app/apikey)
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
    MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
    
    // Firebase Configuration (Optional)
    FIREBASE_CONFIG: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "your-app-id"
    },
    
    // API Endpoints
    ENDPOINTS: {
        GEMINI_API: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        MAPS_API: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
        PLACES_API: 'https://maps.googleapis.com/maps/api/place/details/json'
    },
    
    // Feature Flags
    FEATURES: {
        USE_REAL_AI: false,    // Set to true when you have API keys
        USE_MAPS_API: false,   // Set to true when you have Maps API key
        USE_FIREBASE: false,   // Set to true for Firebase integration
        DEMO_MODE: true        // Fallback to hardcoded data
    }
};

// Environment Detection
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}