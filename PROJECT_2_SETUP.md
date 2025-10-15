# Project 2 Mobile Setup Guide

## 🚀 Step-by-Step Mobile Project Creation

### 1. Create Mobile Project
```bash
# Navigate to your workspace
cd ~/Documents/GitHub/

# Create Expo project
npx create-expo-app good2go-mobile-app --template blank-typescript

# Enter project
cd good2go-mobile-app
```

### 2. Install Dependencies
```bash
# Core navigation and routing
npx expo install expo-router expo-constants expo-linking expo-status-bar

# State management (same as web app)
npm install zustand @react-native-async-storage/async-storage

# Forms and validation (exact same as web app)
npm install react-hook-form @hookform/resolvers zod

# UI and animations
npm install react-native-reanimated
npx expo install react-native-safe-area-context react-native-screens

# Development dependencies
npm install -D @testing-library/react-native jest-expo
```

### 3. Create Folder Structure
```bash
# Create main source structure (mirror web app)
mkdir -p src/app/\(auth\)
mkdir -p src/app/\(marketing\)
mkdir -p src/app/shop
mkdir -p src/components/ui
mkdir -p src/components/customer
mkdir -p src/components/restaurant
mkdir -p src/components/marketing
mkdir -p src/stores
mkdir -p src/config
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/hooks
```

### 4. Copy Documentation
```bash
# Copy porting documentation from web app
cp ../good2go-restaurant-app/COMPONENT_MIGRATION.md .
cp ../good2go-restaurant-app/DEVELOPMENT_WORKFLOW.md .
cp ../good2go-restaurant-app/MOBILE_ARCHITECTURE.md .
```

### 5. Basic Configuration Files

#### app.json (Expo Config)
```json
{
  "expo": {
    "name": "Restaurant App",
    "slug": "good2go-mobile-app", 
    "scheme": "good2go",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "platforms": ["ios", "android"],
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.good2go"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.good2go"
    }
  }
}
```

#### metro.config.js (Required for Expo Router)
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './src/app/global.css' });
```

### 6. Initial TypeScript Configuration
```json
// tsconfig.json updates
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/config/*": ["config/*"],
      "@/stores/*": ["stores/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

## 🎯 Claude Code Usage Strategy

### Recommended Approach: Dual Terminal
```bash
# Terminal 1 - Web App (Reference)
cd ~/Documents/GitHub/good2go-restaurant-app
claude-code

# Terminal 2 - Mobile App (Development) 
cd ~/Documents/GitHub/good2go-mobile-app
claude-code
```

### Alternative: Single Session with Context
```bash
# Run Claude Code in mobile project
cd ~/Documents/GitHub/good2go-mobile-app
claude-code

# Provide web app path as context in prompts
```

## 📝 Effective Prompting Templates

### Template 1: Initial Setup
```
I'm porting a Next.js web app to React Native. 

Web app location: ../good2go-restaurant-app/
Current project: React Native with Expo

Please help me:
1. Port the site configuration from ../good2go-restaurant-app/src/config/site.ts
2. Create initial Expo Router setup matching the web app structure
3. Setup basic TypeScript types from the web app

Reference the MOBILE_ARCHITECTURE.md for patterns to follow.
```

### Template 2: Component Porting  
```
Port this specific component from web to mobile:

**Source**: ../good2go-restaurant-app/src/components/[component-path]
**Target**: src/components/[component-path] 

Requirements:
- Keep exact same TypeScript interfaces and business logic  
- Convert HTML/CSS to React Native View/Text/StyleSheet
- Replace Next.js Link with Expo Router navigation
- Follow patterns in COMPONENT_MIGRATION.md

Show me the converted component and explain key changes.
```

### Template 3: Business Logic Porting
```
Port the business logic from this web app feature:

**Web files**:
- ../good2go-restaurant-app/src/components/customer/CheckoutCrossSell.tsx
- ../good2go-restaurant-app/src/components/customer/IntelligentCrossSell.tsx

**Requirements**:
- Preserve all recommendation algorithms exactly
- Convert to React Native UI components
- Keep same state management patterns (Zustand)
- Maintain same form validation (react-hook-form + zod)

Create mobile equivalent with same functionality.
```

## ⚡ Quick Start Commands

### After Project Creation
```bash
# 1. Setup project structure
chmod +x setup_structure.sh && ./setup_structure.sh

# 2. Start Claude Code in mobile project
claude-code

# 3. First prompt:
"Help me port the basic configuration and structure from ../good2go-restaurant-app to this React Native project. Follow MOBILE_ARCHITECTURE.md patterns."
```

## 🎯 Success Milestones

### Week 1: Foundation
- ✅ Project created with proper structure
- ✅ Basic config ported from web app  
- ✅ Navigation setup matching web app
- ✅ First few UI components ported

### Week 2: Core Components
- ✅ Authentication flow ported
- ✅ Customer shopping components converted
- ✅ Form validation working (same as web)
- ✅ Basic state management setup

### Week 3: Business Logic  
- ✅ Checkout and cart functionality ported
- ✅ Cross-sell algorithms working
- ✅ Restaurant dashboard components converted
- ✅ Inventory management ported

### Week 4: Polish & Deploy
- ✅ Animations and mobile UX added
- ✅ Testing on iOS and Android
- ✅ Performance optimization
- ✅ Ready for app store submission

This approach gives you the cleanest separation while maximizing Claude Code's ability to help with the port! 🚀