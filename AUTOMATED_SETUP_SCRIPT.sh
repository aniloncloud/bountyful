#!/bin/bash

# COMPREHENSIVE MOBILE PROJECT SETUP SCRIPT
# This script creates a production-ready React Native project structure
# and performs initial analysis of the web app for porting

set -e

# Configuration
PROJECT_NAME="good2go-mobile-app"
WEB_APP_PATH="../good2go-restaurant-app"
WORKSPACE_DIR="$HOME/Documents/GitHub"

echo "🚀 COMPREHENSIVE MOBILE PROJECT SETUP"
echo "======================================="
echo "Web app: $WEB_APP_PATH"
echo "Mobile project: $PROJECT_NAME"
echo "Workspace: $WORKSPACE_DIR"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Navigate to workspace
cd "$WORKSPACE_DIR" || exit 1

# 1. ANALYZE WEB APP STRUCTURE
echo ""
echo "📊 ANALYZING WEB APP STRUCTURE"
echo "==============================="

if [ -d "$WEB_APP_PATH" ]; then
    echo "✅ Web app found at $WEB_APP_PATH"
    
    # Count components
    COMPONENT_COUNT=$(find "$WEB_APP_PATH/src/components" -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
    echo "📁 Components to port: $COMPONENT_COUNT"
    
    # Count pages/routes
    PAGE_COUNT=$(find "$WEB_APP_PATH/src/app" -name "page.tsx" 2>/dev/null | wc -l | tr -d ' ')
    echo "📄 Pages to port: $PAGE_COUNT"
    
    # Analyze dependencies
    echo "🔍 Analyzing web-specific dependencies..."
    if [ -f "$WEB_APP_PATH/package.json" ]; then
        echo "Web-specific packages found:"
        grep -E "(next|@headlessui|framer-motion|tailwindcss)" "$WEB_APP_PATH/package.json" || echo "No major web-specific packages found"
    fi
    
    echo ""
else
    echo "⚠️  Web app not found at $WEB_APP_PATH"
    echo "Please ensure the web app path is correct."
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 2. CREATE EXPO PROJECT
echo "📱 CREATING EXPO PROJECT"
echo "========================"

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  Directory $PROJECT_NAME already exists"
    read -p "Remove existing directory and create new? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_NAME"
    else
        echo "❌ Setup cancelled"
        exit 1
    fi
fi

echo "Creating Expo project with TypeScript template..."
npx create-expo-app "$PROJECT_NAME" --template blank-typescript

cd "$PROJECT_NAME" || exit 1

echo "✅ Expo project created successfully"

# 3. INSTALL ALL DEPENDENCIES
echo ""
echo "📦 INSTALLING DEPENDENCIES"
echo "=========================="

echo "Installing Expo packages..."
npx expo install \
  expo-router \
  expo-constants \
  expo-linking \
  expo-status-bar \
  expo-splash-screen \
  expo-system-ui \
  react-native-safe-area-context \
  react-native-screens

echo "Installing state management packages..."
npm install \
  zustand \
  @react-native-async-storage/async-storage

echo "Installing form and validation packages..."
npm install \
  react-hook-form \
  @hookform/resolvers \
  zod

echo "Installing UI and animation packages..."
npm install \
  react-native-reanimated \
  react-native-gesture-handler \
  @react-native-community/slider

echo "Installing development dependencies..."
npm install -D \
  @testing-library/react-native \
  @testing-library/jest-native \
  jest-expo \
  @types/jest

echo "Installing optional platform packages..."
npx expo install \
  expo-location \
  expo-notifications \
  expo-image-picker \
  expo-camera

echo "✅ All dependencies installed"

# 4. CREATE COMPREHENSIVE FOLDER STRUCTURE
echo ""
echo "📁 CREATING FOLDER STRUCTURE"
echo "============================"

# Create main directories
mkdir -p src/{app,components,stores,config,types,utils,hooks,constants,services}

# Create app structure (matching web app)
mkdir -p "src/app/(auth)/{login,signup,reset}"
mkdir -p "src/app/(marketing)/features"
mkdir -p "src/app/(restaurant)/{dashboard,inventory,orders,pricing,analytics,settings}"
mkdir -p "src/app/shop/{cart,checkout,favorites,nearby,orders,profile,restaurant}"

# Create component structure
mkdir -p src/components/{ui,customer,restaurant,marketing,forms,layout}

# Create store structure
mkdir -p src/stores/{auth,cart,user,restaurant}

# Create asset structure
mkdir -p assets/{images,icons,fonts,animations}

# Create test structure
mkdir -p __tests__/{components,stores,utils}

echo "✅ Folder structure created"

# 5. COPY FILES FROM WEB APP
echo ""
echo "📋 COPYING FILES FROM WEB APP"
echo "============================="

if [ -d "$WEB_APP_PATH" ]; then
    echo "Copying configuration files..."
    cp "$WEB_APP_PATH"/src/config/*.ts src/config/ 2>/dev/null || echo "No config files to copy"
    
    echo "Copying TypeScript types..."
    cp "$WEB_APP_PATH"/src/types/*.ts src/types/ 2>/dev/null || echo "No type files to copy"
    
    echo "Copying utility functions..."
    cp "$WEB_APP_PATH"/src/utils/*.ts src/utils/ 2>/dev/null || echo "No util files to copy"
    
    echo "Copying documentation..."
    cp "$WEB_APP_PATH"/*.md . 2>/dev/null || echo "No markdown files to copy"
    
    echo "✅ Files copied from web app"
else
    echo "⚠️  Skipping file copy - web app path not found"
fi

# 6. CREATE CONFIGURATION FILES
echo ""
echo "⚙️  CREATING CONFIGURATION FILES"
echo "================================"

# Create app.json (comprehensive)
cat > app.json << 'EOF'
{
  "expo": {
    "name": "Restaurant Revenue App",
    "slug": "restaurant-revenue-app",
    "scheme": "restaurant-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#22C55E"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.restaurant-app",
      "buildNumber": "1",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs location access to find nearby restaurants.",
        "NSCameraUsageDescription": "Take photos of your orders for verification.",
        "NSMicrophoneUsageDescription": "Record audio for customer feedback."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.restaurantapp",
      "versionCode": 1,
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "RECORD_AUDIO",
        "NOTIFICATIONS"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow restaurant app to use your location to find nearby restaurants and optimize delivery."
        }
      ],
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#22C55E"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
EOF

# Create metro.config.js
cat > metro.config.js << 'EOF'
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push('lottie', 'zip');

// Performance optimizations
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
EOF

# Create enhanced tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/config/*": ["config/*"],
      "@/stores/*": ["stores/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"],
      "@/hooks/*": ["hooks/*"],
      "@/constants/*": ["constants/*"],
      "@/services/*": ["services/*"],
      "@/assets/*": ["../assets/*"]
    }
  },
  "include": [
    "**/*.ts", 
    "**/*.tsx", 
    ".expo/types/**/*.ts", 
    "expo-env.d.ts"
  ],
  "exclude": ["node_modules"]
}
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/

# macOS
.DS_Store

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*

# Testing
coverage/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Dependency directories
node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
EOF

# Create EAS configuration
cat > eas.json << 'EOF'
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "resourceClass": "medium"
      }
    },
    "staging": {
      "distribution": "internal",
      "channel": "staging",
      "env": {
        "APP_ENV": "staging"
      }
    },
    "production": {
      "channel": "production",
      "env": {
        "APP_ENV": "production"
      },
      "ios": {
        "resourceClass": "m1-large"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      },
      "android": {
        "serviceAccountKeyPath": "./service-account-key.json",
        "track": "internal"
      }
    }
  }
}
EOF

echo "✅ Configuration files created"

# 7. CREATE INITIAL COMPONENTS
echo ""
echo "🧩 CREATING INITIAL COMPONENTS"
echo "=============================="

# Create basic Button component
cat > src/components/ui/Button.tsx << 'EOF'
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  return (
    <Pressable 
      style={[
        styles.button, 
        variant === 'secondary' && styles.secondary,
        disabled && styles.disabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  disabled: {
    backgroundColor: '#9CA3AF',
    borderColor: '#9CA3AF',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#22C55E',
  },
});
EOF

# Create basic Text Input component
cat > src/components/ui/TextInput.tsx << 'EOF'
import React from 'react';
import { TextInput as RNTextInput, View, Text, StyleSheet } from 'react-native';

interface TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
}

export function TextInput({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  error 
}: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#9CA3AF"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
  },
});
EOF

# Create basic Auth Store
cat > src/stores/authStore.ts << 'EOF'
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  
  login: async (user: User, token: string) => {
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    set({ isAuthenticated: true, user, token });
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
    set({ isAuthenticated: false, user: null, token: null });
  },
  
  initialize: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        set({ isAuthenticated: true, user, token });
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
    }
  },
}));
EOF

# Create app layout
mkdir -p src/app
cat > src/app/_layout.tsx << 'EOF'
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(marketing)" options={{ headerShown: false }} />
      <Stack.Screen name="shop" options={{ headerShown: false }} />
    </Stack>
  );
}
EOF

echo "✅ Initial components created"

# 8. CREATE TESTING SETUP
echo ""
echo "🧪 SETTING UP TESTING"
echo "====================="

# Create jest.config.js
cat > jest.config.js << 'EOF'
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
};
EOF

# Create a sample test
cat > __tests__/Button.test.tsx << 'EOF'
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../src/components/ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
EOF

echo "✅ Testing setup complete"

# 9. UPDATE PACKAGE.JSON SCRIPTS
echo ""
echo "📝 UPDATING PACKAGE.JSON SCRIPTS"
echo "================================"

# Add useful scripts
npm pkg set scripts.test="jest"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set scripts.test:coverage="jest --coverage"
npm pkg set scripts.type-check="tsc --noEmit"
npm pkg set scripts.lint="expo lint"
npm pkg set scripts.build:ios="eas build --platform ios"
npm pkg set scripts.build:android="eas build --platform android"
npm pkg set scripts.build:all="eas build --platform all"

echo "✅ Package.json scripts updated"

# 10. GENERATE SUMMARY REPORT
echo ""
echo "📊 GENERATING SETUP SUMMARY"
echo "==========================="

# Create setup summary
cat > SETUP_SUMMARY.md << EOF
# Mobile Project Setup Complete

## 📱 Project Information
- **Project Name**: $PROJECT_NAME
- **Location**: $WORKSPACE_DIR/$PROJECT_NAME
- **Web App Source**: $WEB_APP_PATH
- **Setup Date**: $(date)

## 📦 Installed Packages
### Core Expo Packages
- expo-router (file-based routing)
- expo-constants, expo-linking, expo-status-bar
- react-native-safe-area-context, react-native-screens

### State Management
- zustand (lightweight state management)
- @react-native-async-storage/async-storage (persistence)

### Forms & Validation
- react-hook-form (form handling)
- @hookform/resolvers, zod (validation)

### UI & Animation
- react-native-reanimated (animations)
- react-native-gesture-handler

### Testing
- @testing-library/react-native
- jest-expo

## 🏗️ Folder Structure Created
\`\`\`
src/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (marketing)/       # Marketing pages  
│   ├── (restaurant)/      # Restaurant dashboard
│   └── shop/              # Customer shopping flow
├── components/            # React components
│   ├── ui/                # Basic UI components
│   ├── customer/          # Customer-specific components
│   ├── restaurant/        # Restaurant dashboard components
│   └── marketing/         # Marketing components
├── stores/                # Zustand stores
├── config/                # App configuration
├── types/                 # TypeScript types
├── utils/                 # Utility functions
├── hooks/                 # Custom hooks
└── services/              # API services
\`\`\`

## ✅ Initial Components Created
- Button (src/components/ui/Button.tsx)
- TextInput (src/components/ui/TextInput.tsx)
- Auth Store (src/stores/authStore.ts)
- Root Layout (src/app/_layout.tsx)

## 🧪 Testing Setup
- Jest configuration for React Native
- Sample Button test
- Coverage reporting configured

## 🚀 Next Steps

### 1. Start Claude Code
\`\`\`bash
cd $PROJECT_NAME
claude-code
\`\`\`

### 2. Port Components Systematically
Use the comprehensive prompting templates in COMPREHENSIVE_MOBILE_PORT_STRATEGY.md

### 3. Development Commands
\`\`\`bash
npm start                    # Start Expo development server
npm test                     # Run tests
npm run test:coverage        # Run tests with coverage
npm run type-check           # Check TypeScript types
npm run build:ios           # Build for iOS
npm run build:android       # Build for Android
\`\`\`

## 📚 Documentation References
- COMPREHENSIVE_MOBILE_PORT_STRATEGY.md - Complete porting strategy
- COMPONENT_MIGRATION.md - Component porting patterns
- DEVELOPMENT_WORKFLOW.md - Development workflow
- MOBILE_ARCHITECTURE.md - Mobile architecture patterns

## 🎯 Success Metrics
- Component Parity: 0/$COMPONENT_COUNT components ported
- Page Parity: 0/$PAGE_COUNT pages ported
- Test Coverage: Target >90%
- Performance: Target <100ms render times

Ready to start porting! 🚀
EOF

echo "✅ Setup summary generated"

# 11. FINAL VALIDATION
echo ""
echo "🔍 FINAL VALIDATION"
echo "=================="

# Check if all critical files exist
CRITICAL_FILES=(
    "package.json"
    "app.json" 
    "tsconfig.json"
    "src/app/_layout.tsx"
    "src/components/ui/Button.tsx"
    "src/stores/authStore.ts"
)

ALL_GOOD=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file"
        ALL_GOOD=false
    fi
done

if [ "$ALL_GOOD" = true ]; then
    echo ""
    echo "🎉 SETUP COMPLETE!"
    echo "=================="
    echo ""
    echo "Your mobile project is ready! Next steps:"
    echo ""
    echo "1. Navigate to project:    cd $PROJECT_NAME"
    echo "2. Start Claude Code:      claude-code" 
    echo "3. Begin porting:          Use COMPREHENSIVE_MOBILE_PORT_STRATEGY.md"
    echo ""
    echo "📚 Key files:"
    echo "   - SETUP_SUMMARY.md                     - Setup summary and next steps"
    echo "   - COMPREHENSIVE_MOBILE_PORT_STRATEGY.md - Complete porting guide"
    echo "   - src/components/ui/Button.tsx         - Example mobile component"
    echo "   - src/stores/authStore.ts              - Example mobile store"
    echo ""
    echo "🚀 Happy coding!"
else
    echo ""
    echo "⚠️  SETUP INCOMPLETE"
    echo "==================="
    echo "Some critical files are missing. Please check the errors above."
    exit 1
fi