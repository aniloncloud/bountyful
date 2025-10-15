# ULTIMATE MOBILE MIGRATION GUIDE
## Complete Web-to-Mobile App Porting Instructions for Claude Code

> **CRITICAL**: This document is designed for Claude Code to execute autonomously. Follow every step systematically to complete the full migration of the good2go-restaurant-app to good2go-mobile-app.

---

## 🎯 **MISSION OVERVIEW**

**Source Project (Web App)**: `/Users/anil/Documents/GitHub/good2go-restaurant-app`  
- Architecture: Next.js 15 + TypeScript + Tailwind CSS + Zustand  
- Status: Production-ready web application  

**Target Project (Mobile App)**: `/Users/anil/Documents/GitHub/good2go-mobile-app`  
- Architecture: React Native + Expo + TypeScript + StyleSheet  
- Status: Shell project ready for migration  

**Migration Objective**: Complete 1:1 feature parity migration with 70%+ code reuse for business logic  

**Web App Analysis**:
- **Total Files**: 82 TSX files
- **Components**: 47 components across 10 categories
- **Pages**: 35+ unique pages across 4 main sections
- **Architecture**: Next.js App Router + TypeScript + Tailwind CSS + Zustand

---

## 📊 **COMPLETE WEB APP STRUCTURE ANALYSIS**

### **Page Structure** (35+ pages to port):
```
Web App Routes → Mobile App Routes
├── (auth)/ → src/app/(auth)/
│   ├── login/ → login/
│   ├── signup/ → signup/
│   ├── reset/ → reset/
│   └── onboarding/ → onboarding/
├── (marketing)/ → src/app/(marketing)/
│   └── features/ → features/
├── (app)/ → src/app/(restaurant)/
│   ├── dashboard/ → dashboard/
│   ├── inventory/ → inventory/
│   │   ├── listings/ → listings/
│   │   ├── new/ → new/
│   │   ├── magic-bag/ → magic-bag/
│   │   └── cross-sell/ → cross-sell/
│   ├── orders/ → orders/
│   ├── analytics/ → analytics/
│   ├── pricing/ → pricing/
│   └── settings/ → settings/
├── shop/ → src/app/(customer)/
│   ├── nearby/ → nearby/
│   ├── favorites/ → favorites/
│   ├── cart/ → cart/
│   ├── checkout/ → checkout/
│   ├── orders/ → orders/
│   ├── profile/ → profile/
│   ├── peak-experiences/ → peak-experiences/
│   └── restaurant/[id]/ → restaurant/[id]/
└── storefront/[slug]/ → storefront/[slug]/
```

### **Component Categories** (47 components to port):
```
src/components/
├── ui/ (9 components) → Basic UI elements
├── customer/ (8 components) → Customer-facing features
├── restaurant/ (7 components) → Restaurant dashboard
├── forms/ (6 components) → Form components
├── marketing/ (5 components) → Marketing pages
├── layout/ (4 components) → Layout components
├── blocks/ (3 components) → Content blocks
├── charts/ (3 components) → Analytics charts
└── misc/ (2 components) → Utility components
```

---

## 🏗️ **ENGINEERING EXCELLENCE & DECISION FRAMEWORK**

### **CRITICAL REQUIREMENTS - ABSOLUTE MUST-FOLLOW**

#### **Software Engineering Best Practices**
- ✅ **Code Quality**: Maintain TypeScript strict mode, proper error handling, comprehensive type safety
- ✅ **Architecture Patterns**: Follow SOLID principles, clean architecture, proper separation of concerns
- ✅ **Code Organization**: Consistent file structure, clear naming conventions, proper imports/exports
- ✅ **Performance**: Optimize for mobile constraints, lazy loading, efficient re-renders
- ✅ **Security**: Input validation, secure storage, proper authentication patterns

#### **Frontend Best Practices** 
- ✅ **Component Design**: Reusable, composable, single responsibility components
- ✅ **State Management**: Predictable state updates, minimal prop drilling, clear data flow
- ✅ **User Experience**: Consistent UI patterns, accessibility compliance, responsive design
- ✅ **Error Handling**: Graceful degradation, user-friendly error messages, proper loading states

#### **Mobile App Best Practices**
- ✅ **Platform Optimization**: iOS/Android specific considerations, platform-appropriate interactions
- ✅ **Performance**: 60fps animations, efficient memory usage, optimized bundle size
- ✅ **User Interface**: Touch-friendly targets, native feel, proper safe area handling
- ✅ **Storage**: Efficient local storage, proper data persistence, offline capabilities

### **AUTONOMOUS DECISION-MAKING FRAMEWORK**

**CRITICAL**: Since this migration will be executed without human oversight, ALL technical decisions must be made using this systematic approach:

#### **Decision Process for Every Implementation Choice**
1. **Use Sequential Thinking MCP** to analyze each technical decision
2. **Generate 3-5 alternative approaches** for any implementation choice
3. **Score each option on 1-100 scale** based on these criteria:
   - **Code Quality** (20 points): Maintainability, readability, testability
   - **Performance** (20 points): Mobile optimization, efficiency, scalability
   - **Maintainability** (20 points): Future extensibility, debugging ease, documentation
   - **Mobile UX** (20 points): Native feel, accessibility, user experience
   - **Technical Risk** (20 points): Implementation complexity, potential issues, stability

4. **Document scoring rationale** for each option
5. **Select highest scoring option** (must be >80 for production use)
6. **Proceed only with justified choice**

#### **Example Decision Framework Usage**
```
Decision: How to implement navigation between screens?

Sequential Thinking Analysis:
Option 1: Stack Navigation (Score: 85)
- Code Quality: 18/20 (clean, well-documented)
- Performance: 17/20 (efficient, fast transitions)
- Maintainability: 18/20 (standard pattern, easy updates)
- Mobile UX: 16/20 (native feel, expected behavior)
- Technical Risk: 16/20 (proven, stable implementation)

Option 2: Custom Navigation (Score: 65)
- Code Quality: 12/20 (custom code, harder to debug)
- Performance: 14/20 (potential optimization issues)
- Maintainability: 10/20 (custom solution, harder to update)
- Mobile UX: 15/20 (can be optimized but requires work)
- Technical Risk: 14/20 (higher complexity, more bugs)

SELECTED: Option 1 - Stack Navigation (Score: 85)
JUSTIFICATION: Standard, reliable, performant, maintainable
```

---

## 🚀 **SYSTEMATIC MIGRATION WORKFLOW**

### **PHASE 0: PROJECT INITIALIZATION**

#### **Step 0.1: Claude Code Initialization**
**FIRST STEP - Execute this in the mobile project directory**:

```bash
# Navigate to mobile project
cd /Users/anil/Documents/GitHub/good2go-mobile-app

# Initialize Claude Code project
claude-code init

# Verify you're in the correct directory structure:
# - good2go-restaurant-app/ (source web app)
# - good2go-mobile-app/ (target mobile app - current directory)
```

**IMPORTANT**: Do NOT run emulator/simulator during migration. Focus purely on code porting and compilation validation.

### **PHASE 1: FOUNDATION SETUP**

#### Step 1.1: Project Architecture Setup
**Execute Decision Framework**: Analyze folder structure approach using Sequential Thinking MCP

```bash
# 1. Confirm current directory (MUST be mobile project)
pwd  # Should show: /Users/anil/Documents/GitHub/good2go-mobile-app

# 2. Create complete folder structure matching web app
mkdir -p src/{app,components,stores,config,types,utils,hooks,constants,services}
mkdir -p src/app/{(auth)/{login,signup,reset,onboarding/{restaurant-profile}}}
mkdir -p src/app/{(marketing)/{features}}
mkdir -p src/app/{(restaurant)/{dashboard,inventory/{listings,new,magic-bag,cross-sell},orders,analytics,pricing,settings}}
mkdir -p src/app/{(customer)/{nearby,favorites,cart,checkout,orders,profile,peak-experiences,restaurant/[id]}}
mkdir -p src/app/{storefront/[slug]}
mkdir -p src/components/{ui,customer,restaurant,forms,marketing,layout,blocks,charts}
mkdir -p src/stores/{auth,cart,user,restaurant,inventory}
mkdir -p assets/{images,icons,fonts}

# 3. Verify structure matches source project
ls -la ../good2go-restaurant-app/src/  # Reference source
ls -la src/  # Verify target structure
```

**Decision Checkpoint**: Use Sequential Thinking MCP to evaluate if folder structure optimizes for:
- Code organization (Score: /20)
- Mobile app patterns (Score: /20)  
- Maintainability (Score: /20)
- Developer experience (Score: /20)
- Build performance (Score: /20)
**Required minimum score: 80/100**

#### Step 1.2: Copy Core Configuration Files
**Execute Decision Framework**: For each config file, analyze adaptation approach using Sequential Thinking MCP

```bash
# 1. Copy and adapt essential config files from source project
cp ../good2go-restaurant-app/src/config/site.ts src/config/site.ts
cp ../good2go-restaurant-app/src/types/*.ts src/types/ 2>/dev/null || echo "No type files found"
cp ../good2go-restaurant-app/src/utils/*.ts src/utils/ 2>/dev/null || echo "No util files found"

# 2. Verify what was copied
ls -la src/config/
ls -la src/types/
ls -la src/utils/
```

**Decision Checkpoint for Each Config File**: Use Sequential Thinking MCP to evaluate:
- **Web-specific code removal** (browser APIs, DOM manipulation)
- **Mobile adaptations needed** (AsyncStorage vs localStorage, etc.)
- **TypeScript compatibility** with React Native
- **Performance implications** for mobile

**CRITICAL**: Score each adaptation >80/100 before proceeding

#### Step 1.3: Complete Project Configuration
**Execute Decision Framework**: Analyze configuration approach using Sequential Thinking MCP

##### **A. Production-Ready app.json Configuration**
```json
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
      ["expo-location", {
        "locationAlwaysAndWhenInUsePermission": "Allow restaurant app to use your location to find nearby restaurants and optimize delivery."
      }],
      ["expo-notifications", {
        "icon": "./assets/notification-icon.png",
        "color": "#22C55E"
      }]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

##### **B. Advanced metro.config.js**
```javascript
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
```

##### **C. Production TypeScript Configuration**
```json
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
```

##### **D. Essential Dependencies (Exact Versions)**
```bash
# Core Expo packages
npx expo install expo-router@^3.0.0 expo-constants@^16.0.0 expo-linking@^6.3.0 expo-status-bar@^1.12.0
npx expo install react-native-safe-area-context@^4.7.0 react-native-screens@^3.25.0

# State management (identical to web app)
npm install zustand@^4.4.0 @react-native-async-storage/async-storage@^1.19.0

# Forms and validation (IDENTICAL to web app)
npm install react-hook-form@^7.47.0 @hookform/resolvers@^7.47.0 zod@^3.22.0

# UI and animations
npm install react-native-reanimated@^3.5.0 react-native-gesture-handler@^2.13.0

# Development dependencies
npm install -D @testing-library/react-native@^12.4.0 @testing-library/jest-native@^5.4.0 jest-expo@^50.0.0 @types/jest@^29.5.0
```

**Decision Checkpoint**: Use Sequential Thinking MCP to score configuration completeness:
- Production readiness (Score: /20)
- Mobile platform optimization (Score: /20)
- Development experience (Score: /20)
- Performance implications (Score: /20)
- Security and permissions (Score: /20)
**Required minimum score: 85/100**

---

### **PHASE 2: CORE COMPONENTS MIGRATION**

#### Step 2.1: UI Components (Priority 1)
**Port these 9 UI components first** (from `../good2go-restaurant-app/src/components/ui/`):

1. **Button.tsx** → `src/components/ui/Button.tsx`
   ```typescript
   // Conversion pattern:
   // <button className="..." onClick={...} → <Pressable style={...} onPress={...}
   // Add StyleSheet.create() for styles
   // Keep all props and functionality identical
   ```

2. **Input.tsx** → `src/components/ui/Input.tsx`
   ```typescript
   // <input className="..." → <TextInput style={...}
   // Add React Native-specific props (placeholderTextColor, etc.)
   ```

3. **Card.tsx** → `src/components/ui/Card.tsx`
   ```typescript
   // <div className="card..." → <View style={styles.card}
   // Convert shadow classes to React Native shadow props
   ```

4. **Badge.tsx** → `src/components/ui/Badge.tsx`
5. **Avatar.tsx** → `src/components/ui/Avatar.tsx`
6. **Progress.tsx** → `src/components/ui/Progress.tsx`
7. **Modal.tsx** → `src/components/ui/Modal.tsx`
8. **Dropdown.tsx** → `src/components/ui/Dropdown.tsx`
9. **Tooltip.tsx** → `src/components/ui/Tooltip.tsx`

**Conversion Rules for UI Components**:
- `<div>` → `<View>`
- `<span>`, `<p>`, `<h1-h6>` → `<Text>`
- `<button>` → `<Pressable>`
- `<img>` → `<Image>`
- `onClick` → `onPress`
- `className` → `style={styles.styleName}`
- CSS classes → `StyleSheet.create()`

#### **COMPLETE WORKING TEMPLATES FOR AI IMPLEMENTATION**

##### **Template 1: Button Component (Production-Ready)**
```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  style 
}: ButtonProps) {
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
```

##### **Template 2: TextInput Component (Production-Ready)**
```typescript
// src/components/ui/TextInput.tsx
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
```

##### **Template 3: SafeScreen Layout (Mobile-Specific)**
```typescript
// src/components/layout/SafeScreen.tsx
import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

interface SafeScreenProps {
  children: ReactNode;
  backgroundColor?: string;
}

export function SafeScreen({ children, backgroundColor = 'white' }: SafeScreenProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
```

#### Step 2.2: Forms Components (Priority 2)
**Port these 6 form components** (from `../good2go-restaurant-app/src/components/forms/`):

1. **AuthForm.tsx** → `src/components/forms/AuthForm.tsx`
   - **CRITICAL**: Keep react-hook-form + zod validation identical
   - Only change UI elements to React Native equivalents

2. **RestaurantProfileForm.tsx** → `src/components/forms/RestaurantProfileForm.tsx`
3. **InventoryForm.tsx** → `src/components/forms/InventoryForm.tsx`
4. **MagicBagForm.tsx** → `src/components/forms/MagicBagForm.tsx`
5. **CheckoutForm.tsx** → `src/components/forms/CheckoutForm.tsx`
6. **ContactForm.tsx** → `src/components/forms/ContactForm.tsx`

---

### **PHASE 3: NAVIGATION & ROUTING SETUP**

#### Step 3.1: Create Root Layout
```typescript
// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function RootLayout() {
  const initialize = useAuthStore(state => state.initialize);
  
  useEffect(() => {
    initialize();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(marketing)" options={{ headerShown: false }} />
      <Stack.Screen name="(restaurant)" options={{ headerShown: false }} />
      <Stack.Screen name="(customer)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

#### Step 3.2: Create Group Layouts
Create layout files for each route group:
- `src/app/(auth)/_layout.tsx`
- `src/app/(marketing)/_layout.tsx`
- `src/app/(restaurant)/_layout.tsx`
- `src/app/(customer)/_layout.tsx`

---

### **PHASE 4: STATE MANAGEMENT MIGRATION**

#### Step 4.1: Complete State Management Templates
**Use Sequential Thinking MCP to analyze state management approach for mobile optimization**

##### **Template 1: AuthStore with AsyncStorage (Production-Ready)**
```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'restaurant';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      
      login: async (user: User, token: string) => {
        try {
          await AsyncStorage.setItem('authToken', token);
          await AsyncStorage.setItem('userData', JSON.stringify(user));
          set({ isAuthenticated: true, user, token });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      
      logout: async () => {
        try {
          await AsyncStorage.multiRemove(['authToken', 'userData']);
          set({ isAuthenticated: false, user: null, token: null });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
      
      initialize: async () => {
        try {
          const [token, userData] = await AsyncStorage.multiGet(['authToken', 'userData']);
          
          if (token[1] && userData[1]) {
            const user = JSON.parse(userData[1]);
            set({ isAuthenticated: true, user, token: token[1] });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          // Clear potentially corrupted data
          await AsyncStorage.multiRemove(['authToken', 'userData']);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
```

##### **Template 2: CartStore with Business Logic (Production-Ready)**
```typescript
// src/stores/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  canAddFromRestaurant: (restaurantId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      
      addItem: (newItem) => {
        const state = get();
        
        // Check if can add from this restaurant
        if (!state.canAddFromRestaurant(newItem.restaurantId)) {
          throw new Error('Cannot add items from different restaurants');
        }
        
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (existingItem) {
          // Update quantity of existing item
          set({
            items: state.items.map(item =>
              item.id === newItem.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          // Add new item
          set({
            items: [...state.items, { ...newItem, quantity: 1 }],
            restaurantId: newItem.restaurantId
          });
        }
      },
      
      removeItem: (itemId) => {
        const state = get();
        const newItems = state.items.filter(item => item.id !== itemId);
        set({
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId
        });
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [], restaurantId: null });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      canAddFromRestaurant: (restaurantId) => {
        const state = get();
        return state.items.length === 0 || state.restaurantId === restaurantId;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

##### **Template 3: Platform Utilities (Mobile-Specific)**
```typescript
// src/utils/platform.ts
import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const platformStyles = {
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
  
  headerHeight: Platform.select({
    ios: 44,
    android: 56,
  }),
  
  statusBarHeight: Platform.select({
    ios: 20,
    android: 24,
  }),
};

export const isTablet = () => {
  const ratio = screenHeight / screenWidth;
  return ratio < 1.6;
};
```

**Decision Checkpoint**: Use Sequential Thinking MCP to score state management implementation:
- Business logic preservation (Score: /20)
- Mobile optimization (Score: /20)
- Error handling robustness (Score: /20)
- Performance efficiency (Score: /20)
- Data persistence reliability (Score: /20)
**Required minimum score: 85/100**

---

### **PHASE 5: PAGE-BY-PAGE MIGRATION**

#### Step 5.1: Authentication Pages (4 pages)
**Port in this order**:

1. **Login Page**
   - Source: `../good2go-restaurant-app/src/app/(auth)/login/page.tsx`
   - Target: `src/app/(auth)/login.tsx`
   - Keep exact same form validation and business logic

2. **Signup Page**
   - Source: `../good2go-restaurant-app/src/app/(auth)/signup/page.tsx`
   - Target: `src/app/(auth)/signup.tsx`

3. **Reset Page**
   - Source: `../good2go-restaurant-app/src/app/(auth)/reset/page.tsx`
   - Target: `src/app/(auth)/reset.tsx`

4. **Onboarding Page**
   - Source: `../good2go-restaurant-app/src/app/(auth)/onboarding/page.tsx`
   - Target: `src/app/(auth)/onboarding/index.tsx`

#### Step 5.2: Restaurant Dashboard Pages (8+ pages)
**Port in this order**:

1. **Dashboard Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/dashboard/page.tsx`
   - Target: `src/app/(restaurant)/dashboard.tsx`
   - Port all charts and analytics (adapt Chart.js to React Native charts)

2. **Inventory Listing Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/inventory/listings/page.tsx`
   - Target: `src/app/(restaurant)/inventory/listings.tsx`
   - Convert tables to React Native FlatList/SectionList

3. **New Inventory Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/inventory/new/page.tsx`
   - Target: `src/app/(restaurant)/inventory/new.tsx`

4. **Magic Bag Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/inventory/magic-bag/page.tsx`
   - Target: `src/app/(restaurant)/inventory/magic-bag.tsx`

5. **Cross-sell Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/inventory/cross-sell/page.tsx`
   - Target: `src/app/(restaurant)/inventory/cross-sell.tsx`

6. **Orders Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/orders/page.tsx`
   - Target: `src/app/(restaurant)/orders/index.tsx`

7. **Analytics Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/analytics/page.tsx`
   - Target: `src/app/(restaurant)/analytics.tsx`

8. **Pricing Page**
   - Source: `../good2go-restaurant-app/src/app/(app)/pricing/page.tsx`
   - Target: `src/app/(restaurant)/pricing.tsx`

#### Step 5.3: Customer Shopping Pages (8+ pages)
**Port in this order**:

1. **Nearby Page**
   - Source: `../good2go-restaurant-app/src/app/shop/nearby/page.tsx`
   - Target: `src/app/(customer)/nearby.tsx`
   - Add expo-location for geolocation features

2. **Favorites Page**
   - Source: `../good2go-restaurant-app/src/app/shop/favorites/page.tsx`
   - Target: `src/app/(customer)/favorites.tsx`

3. **Cart Page**
   - Source: `../good2go-restaurant-app/src/app/shop/cart/page.tsx`
   - Target: `src/app/(customer)/cart.tsx`

4. **Checkout Page**
   - Source: `../good2go-restaurant-app/src/app/shop/checkout/page.tsx`
   - Target: `src/app/(customer)/checkout.tsx`
   - **CRITICAL**: Preserve all cross-sell logic and checkout algorithms

5. **Customer Orders Page**
   - Source: `../good2go-restaurant-app/src/app/shop/orders/page.tsx`
   - Target: `src/app/(customer)/orders.tsx`

6. **Profile Page**
   - Source: `../good2go-restaurant-app/src/app/shop/profile/page.tsx`
   - Target: `src/app/(customer)/profile.tsx`

7. **Peak Experiences Page**
   - Source: `../good2go-restaurant-app/src/app/shop/peak-experiences/page.tsx`
   - Target: `src/app/(customer)/peak-experiences.tsx`

8. **Restaurant Detail Page**
   - Source: `../good2go-restaurant-app/src/app/shop/restaurant/[id]/page.tsx`
   - Target: `src/app/(customer)/restaurant/[id].tsx`

---

### **PHASE 6: BUSINESS LOGIC COMPONENTS MIGRATION**

#### Step 6.1: Customer Components (8 components)
**Critical business logic to preserve exactly**:

1. **CheckoutCrossSell.tsx** → `src/components/customer/CheckoutCrossSell.tsx`
   - **CRITICAL**: Preserve all recommendation algorithms
   - Keep cross-sell logic identical (25-40% AOV boost algorithms)
   
2. **IntelligentCrossSell.tsx** → `src/components/customer/IntelligentCrossSell.tsx`
   - **CRITICAL**: Preserve AI recommendation engine
   
3. **ProductCard.tsx** → `src/components/customer/ProductCard.tsx`
4. **RestaurantCard.tsx** → `src/components/customer/RestaurantCard.tsx`  
5. **BagBuilder.tsx** → `src/components/customer/BagBuilder.tsx`
6. **OrderTracking.tsx** → `src/components/customer/OrderTracking.tsx`
7. **FavoriteButton.tsx** → `src/components/customer/FavoriteButton.tsx`
8. **RatingSystem.tsx** → `src/components/customer/RatingSystem.tsx`

#### Step 6.2: Restaurant Components (7 components)
1. **CrossSellAnalytics.tsx** → `src/components/restaurant/CrossSellAnalytics.tsx`
2. **InventoryManager.tsx** → `src/components/restaurant/InventoryManager.tsx`
3. **OrderBoard.tsx** → `src/components/restaurant/OrderBoard.tsx`
4. **PricingDashboard.tsx** → `src/components/restaurant/PricingDashboard.tsx`
5. **RevenueChart.tsx** → `src/components/restaurant/RevenueChart.tsx`
6. **MagicBagBuilder.tsx** → `src/components/restaurant/MagicBagBuilder.tsx`
7. **PickupConfirmation.tsx** → `src/components/restaurant/PickupConfirmation.tsx`

---

### **PHASE 7: ADVANCED FEATURES MIGRATION**

#### Step 7.1: Charts and Analytics (3 components)
Port data visualization components:
1. **RevenueChart.tsx** → Use react-native-chart-kit or react-native-svg
2. **AnalyticsChart.tsx** → Convert Chart.js to React Native charts
3. **PerformanceMetrics.tsx** → Adapt for mobile display

#### Step 7.2: Marketing Components (5 components)
1. **HeroSection.tsx** → `src/components/marketing/HeroSection.tsx`
2. **FeatureShowcase.tsx** → `src/components/marketing/FeatureShowcase.tsx`
3. **PricingCalculator.tsx** → `src/components/marketing/PricingCalculator.tsx`
4. **Testimonials.tsx** → `src/components/marketing/Testimonials.tsx`
5. **CaseStudies.tsx** → `src/components/marketing/CaseStudies.tsx`

---

## 🔄 **SYSTEMATIC CONVERSION PATTERNS**

### **HTML → React Native Conversion Table**
```typescript
// Layout Elements
<div> → <View>
<section> → <View>
<article> → <View>
<main> → <View>
<header> → <View>
<footer> → <View>
<aside> → <View>

// Text Elements  
<h1>, <h2>, <h3>, <h4>, <h5>, <h6> → <Text style={styles.heading}>
<p> → <Text>
<span> → <Text>
<a> → <Text onPress={...} (or <Pressable>)
<label> → <Text>

// Interactive Elements
<button> → <Pressable>
<input> → <TextInput>
<textarea> → <TextInput multiline>
<select> → Custom picker component
<form> → <View> (with form logic)

// Media Elements
<img> → <Image>
<video> → <Video> (from expo-av)
<audio> → <Audio> (from expo-av)

// List Elements
<ul>, <ol> → <FlatList> or <SectionList>
<li> → Custom list item component
<table> → <FlatList> with custom row component
```

### **Event Handler Conversion**
```typescript
// Event Handlers
onClick → onPress
onChange → onChangeText (for TextInput)
onSubmit → Custom form submission
onFocus → onFocus
onBlur → onBlur
onMouseEnter → Not applicable (use gestures)
onMouseLeave → Not applicable (use gestures)
```

### **Styling Conversion Patterns**
```typescript
// CSS to StyleSheet Conversion
className="flex items-center justify-between" → 
style={{
  flexDirection: 'row',
  alignItems: 'center', 
  justifyContent: 'space-between'
}}

// Common Tailwind → StyleSheet
"bg-blue-500" → backgroundColor: '#3B82F6'
"text-white" → color: '#FFFFFF'
"p-4" → padding: 16
"rounded-lg" → borderRadius: 8
"shadow-lg" → {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // Android
}
```

---

## 🧪 **TESTING & VALIDATION CHECKLIST**

### **Business Logic Validation**
For each ported component, verify:
- [ ] All algorithms produce identical results
- [ ] State management works identically  
- [ ] Form validation behaves exactly the same
- [ ] Cross-sell recommendations match web app
- [ ] Pricing calculations are identical
- [ ] User flows work end-to-end

### **Mobile-Specific Testing**
- [ ] Components render properly on iOS and Android
- [ ] Touch interactions work correctly
- [ ] Text scales properly with device settings
- [ ] Performance is smooth (60fps)
- [ ] Memory usage is acceptable
- [ ] Navigation flows work correctly
- [ ] AsyncStorage persistence works
- [ ] Deep linking works (if implemented)

---

## 📋 **EXECUTION COMMANDS FOR CLAUDE CODE**

### **Daily Execution Pattern**
When working on this migration, use these commands systematically:

```bash
# 1. Start each work session by reading source files
Read ../good2go-restaurant-app/src/[component-path]

# 2. Use Sequential Thinking MCP for implementation approach
# Analyze 3-5 conversion approaches, score each >80/100

# 3. Create mobile equivalent with proper structure
Write src/[mobile-component-path]

# 4. Validate TypeScript compilation (NO emulator/simulator)
npx tsc --noEmit  # Type checking only
npm run lint      # Code quality validation

# 5. Validate business logic matches source
# Compare algorithms, state management, form validation
```

**CRITICAL**: NO emulator/simulator testing during migration. Focus on code quality and compilation validation only.

### **AI DECISION-MAKING EXAMPLES FOR AUTONOMOUS MIGRATION**

#### **Example 1: Component Conversion Decision**
**Use this Sequential Thinking pattern for every conversion choice**:

```
DECISION: How to convert a complex web component to mobile?

Sequential Thinking Analysis:

Option 1: Direct HTML→RN conversion with minimal changes (Score: 65)
- Code Quality: 12/20 (quick but potentially buggy)
- Performance: 10/20 (may have performance issues)
- Maintainability: 15/20 (easy to understand)
- Mobile UX: 8/20 (won't feel native)
- Technical Risk: 20/20 (low complexity)

Option 2: Preserve business logic, rebuild UI for mobile (Score: 92)
- Code Quality: 18/20 (clean separation of concerns)
- Performance: 19/20 (optimized for mobile)
- Maintainability: 19/20 (clear component structure)
- Mobile UX: 18/20 (native mobile feel)
- Technical Risk: 18/20 (moderate complexity, proven patterns)

Option 3: Complete rewrite using mobile-first approach (Score: 75)
- Code Quality: 20/20 (perfect mobile code)
- Performance: 20/20 (optimal performance)
- Maintainability: 15/20 (new patterns, learning curve)
- Mobile UX: 20/20 (perfect mobile UX)
- Technical Risk: 10/20 (high risk of bugs, time consuming)

SELECTED: Option 2 - Preserve business logic, rebuild UI (Score: 92)
JUSTIFICATION: Optimal balance of quality, performance, and risk while preserving critical business logic
```

#### **Example 2: State Management Decision**
```
DECISION: How to handle state persistence in mobile app?

Sequential Thinking Analysis:

Option 1: No persistence, memory-only state (Score: 45)
- Code Quality: 15/20 (simple implementation)
- Performance: 15/20 (fast but data loss)
- Maintainability: 15/20 (easy to debug)
- Mobile UX: 0/20 (terrible user experience)
- Technical Risk: 20/20 (no technical risk)

Option 2: AsyncStorage with Zustand persist (Score: 95)
- Code Quality: 19/20 (clean, well-structured)
- Performance: 19/20 (efficient async operations)
- Maintainability: 19/20 (standard patterns)
- Mobile UX: 19/20 (seamless experience)
- Technical Risk: 19/20 (proven, stable solution)

Option 3: Custom storage solution (Score: 60)
- Code Quality: 10/20 (custom code, harder to maintain)
- Performance: 15/20 (unknown performance characteristics)
- Maintainability: 10/20 (custom solution, harder to debug)
- Mobile UX: 15/20 (dependent on implementation)
- Technical Risk: 10/20 (high risk of bugs)

SELECTED: Option 2 - AsyncStorage with Zustand persist (Score: 95)
JUSTIFICATION: Industry standard, proven reliability, excellent UX
```

### **CODE VALIDATION STRATEGIES (NO EMULATOR REQUIRED)**

#### **Validation Commands for Each Component**
```bash
# 1. TypeScript Compilation Check
npx tsc --noEmit --project tsconfig.json
# Must pass with 0 errors

# 2. ESLint Code Quality Check  
npx eslint src/ --ext .ts,.tsx --max-warnings 0
# Must pass with 0 warnings

# 3. Import/Export Validation
npx madge --circular src/
# Must show no circular dependencies

# 4. Bundle Analysis (without running)
npx expo export --dump-assetmap
# Check for optimization opportunities

# 5. React Native CLI validation
npx react-native doctor
# Verify environment setup
```

#### **Business Logic Verification (Without Running)**
```typescript
// Create verification functions that can be tested independently
// Example: Cross-sell algorithm verification

// src/utils/__tests__/crossSellAlgorithms.test.ts
import { getSmartRecommendations } from '../crossSellAlgorithms';

describe('Cross-sell Algorithm Parity', () => {
  it('should produce identical results to web version', () => {
    const mockInput = {
      restaurantId: 'rest1',
      currentItems: [{ id: 'item1', category: 'main' }],
      availableItems: mockCrossSellDatabase
    };
    
    const result = getSmartRecommendations(mockInput);
    
    // Test exact same logic as web version
    expect(result).toHaveLength(2);
    expect(result[0].perfectMatch).toBe(true);
    // ... additional business logic verification
  });
});
```

### **Systematic Prompting Pattern**
**MANDATORY**: Use this exact pattern for each component migration:

```
MIGRATION TASK: [COMPONENT_NAME]

SOURCE PROJECT: /Users/anil/Documents/GitHub/good2go-restaurant-app
TARGET PROJECT: /Users/anil/Documents/GitHub/good2go-mobile-app

Source: ../good2go-restaurant-app/src/components/[path]/[ComponentName].tsx
Target: src/components/[path]/[ComponentName].tsx

CRITICAL REQUIREMENTS:
1. Use Sequential Thinking MCP to analyze 3-5 conversion approaches
2. Score each approach on 1-100 scale (Code Quality + Performance + Maintainability + Mobile UX + Technical Risk)
3. Select highest scoring option (must be >80/100)
4. Preserve ALL business logic exactly (algorithms, calculations, validations)
5. Follow mobile app best practices (60fps performance, touch interactions, safe areas)
6. Apply software engineering best practices (TypeScript strict, error handling, testing)
7. Convert UI using ULTIMATE_MOBILE_MIGRATION_GUIDE.md patterns
8. Replace Next.js routing with Expo Router
9. Use StyleSheet instead of Tailwind classes
10. Maintain same state management patterns

VALIDATION CHECKLIST:
- [ ] TypeScript compilation passes (npx tsc --noEmit)
- [ ] No console errors or warnings
- [ ] Business logic identical to source
- [ ] Mobile UX optimized
- [ ] Code quality >80/100 score

Show me:
1. Sequential thinking analysis with scores
2. Selected approach justification  
3. Complete converted mobile component
4. Key changes summary
```

---

## 🎯 **SUCCESS METRICS & COMPLETION CRITERIA**

### **Completion Checklist**
- [ ] **82 TSX files ported** (35 pages + 47 components)
- [ ] **All 4 route groups working** ((auth), (marketing), (restaurant), (customer))
- [ ] **All business logic preserved** (cross-sell, pricing, inventory, analytics)
- [ ] **Forms working identically** (validation, submission, error handling)
- [ ] **State management operational** (auth, cart, user preferences)
- [ ] **Navigation flows complete** (all routes accessible)
- [ ] **Mobile UX optimized** (touch interactions, safe areas, responsive)
- [ ] **Performance validated** (<3s startup, 60fps scrolling)

### **Quality Gates**
Before considering migration complete:

1. **Functional Parity**: Every feature from web app works in mobile app
2. **Business Logic Integrity**: All calculations and algorithms produce identical results
3. **Type Safety**: No TypeScript errors, all interfaces preserved
4. **Mobile UX**: Native feeling interactions and layouts
5. **Performance**: Smooth operation on mid-range devices

---

## 🚀 **FINAL EXECUTION INSTRUCTIONS**

**TO CLAUDE CODE**: Execute this autonomous migration following these steps systematically:

### **MANDATORY STARTUP SEQUENCE**
1. **Navigate to mobile project**: `cd /Users/anil/Documents/GitHub/good2go-mobile-app`
2. **Initialize Claude Code**: `claude-code init`
3. **Verify project paths**:
   - Source: `/Users/anil/Documents/GitHub/good2go-restaurant-app` (web app)
   - Target: `/Users/anil/Documents/GitHub/good2go-mobile-app` (mobile app - current)

### **EXECUTION PHASES** 
Execute in this exact order, using Sequential Thinking MCP for ALL decisions:

1. **Phase 0**: Project initialization and setup validation
2. **Phase 1**: Foundation setup (folder structure, configs, dependencies)  
3. **Phase 2**: Core components migration (UI components first - they're dependencies)
4. **Phase 3**: Navigation & routing setup (Expo Router configuration)
5. **Phase 4**: State management migration (Zustand stores with AsyncStorage)
6. **Phase 5**: Page-by-page migration (auth → restaurant → customer → marketing)
7. **Phase 6**: Business logic components (CRITICAL - preserve all algorithms exactly)
8. **Phase 7**: Advanced features (charts, analytics, complex interactions)

### **AUTONOMOUS EXECUTION REQUIREMENTS**
- ✅ **Decision Framework**: Use Sequential Thinking MCP for every technical choice
- ✅ **Scoring System**: Rate all options 1-100, select only >80 scores
- ✅ **Engineering Excellence**: Follow all software/frontend/mobile best practices
- ✅ **No Human Intervention**: Make all decisions autonomously with justification
- ✅ **Quality Gates**: Validate TypeScript compilation, code quality, business logic
- ✅ **NO TESTING**: Do not run emulator/simulator - focus on code porting only

### **SUCCESS CRITERIA**
- ✅ **82 TSX files ported** with 1:1 feature parity
- ✅ **All business logic preserved** exactly (algorithms, calculations, validations)
- ✅ **Mobile best practices applied** (performance, UX, native feel)
- ✅ **TypeScript strict compliance** (no errors, proper types)
- ✅ **Engineering excellence maintained** (code quality, architecture, security)

**Work systematically, one component at a time, validate as you go, and maintain identical business logic throughout.**

This comprehensive guide with decision framework enables complete autonomous migration execution.