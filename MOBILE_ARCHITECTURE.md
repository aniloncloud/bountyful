# Mobile Frontend Architecture Plan

## 🏗️ Project Structure
```
mobile-app/
├── src/
│   ├── app/                 # Expo Router navigation
│   │   ├── (auth)/         # Authentication flows
│   │   ├── (marketing)/    # Marketing pages
│   │   ├── (restaurant)/   # Restaurant dashboard
│   │   ├── shop/           # Customer shopping flow
│   │   └── _layout.tsx     # Root layout
│   ├── components/
│   │   ├── ui/             # Reusable UI components (Button, Input, etc.)
│   │   ├── customer/       # Customer-facing components
│   │   ├── restaurant/     # Restaurant dashboard components
│   │   ├── marketing/      # Marketing/landing components
│   │   └── forms/          # Form components
│   ├── stores/             # Zustand state management
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   └── userPreferences.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useLocation.ts
│   ├── config/
│   │   ├── site.ts         # App configuration (like your web app)
│   │   └── navigation.ts   # Navigation configuration
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
└── package.json
```

## 🔧 Technology Stack

### Core Framework
- **Expo SDK 50+** (managed workflow)
- **React Native 0.73+**
- **TypeScript 5+**

### Navigation & Routing
- **Expo Router** (file-based routing, similar to Next.js)
- **React Navigation 6** (underlying navigation primitives)

### State Management
- **Zustand** - Client state management (simple, lightweight)
- **AsyncStorage** - Local data persistence

### Forms & Validation  
- **React Hook Form** - Form handling (same as web app)
- **Zod** - Runtime validation (same as web app)

### UI & Styling
- **React Native StyleSheet** - Native styling
- **React Native Reanimated 3** - Smooth animations
- **React Native Elements/Tamagui** - Component library

### Location & Maps (when needed)
- **expo-location** - GPS services
- **react-native-maps** - Map integration

## 📱 Mobile-Specific Features

### Local Storage Pattern
```typescript
// stores/authStore.ts (similar to your web state management)
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (credentials: LoginData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (credentials) => {
    // Handle login logic (similar to web)
    const { user, token } = await authenticateUser(credentials);
    await AsyncStorage.setItem('authToken', token);
    set({ user, token });
  },
  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    set({ user: null, token: null });
  }
}));
```

### Component Structure (Mirror your web app)
```typescript
// components/customer/ProductCard.tsx (adapted from web)
import { View, Text, Pressable, Image } from 'react-native';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={() => onPress(product)}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
}
```

## 🔧 Development Approach

### Phase 1: Setup & Navigation
- Create Expo project with TypeScript
- Setup folder structure (mirror web app)
- Implement basic navigation
- Port configuration files (site.ts, etc.)

### Phase 2: Core Components  
- Port UI components (forms, buttons, cards)
- Adapt customer flow components
- Convert restaurant dashboard components
- Implement basic state management

### Phase 3: Business Logic
- Port form validation logic
- Implement cross-sell algorithms  
- Add inventory management
- Create checkout flow

### Phase 4: Polish
- Add animations and transitions
- Optimize performance
- Test on devices
- Prepare for deployment

## 📦 Key Dependencies
```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "react-native": "0.73.x",
    "expo-router": "^3.0.0",
    "zustand": "^4.4.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0",
    "react-native-reanimated": "^3.5.0",
    "expo-location": "^16.0.0",
    "react-native-maps": "^1.8.0"
  }
}
```

## 🎯 Success Metrics
- **Component Reuse**: 70%+ business logic preserved from web app
- **Development Speed**: Faster iteration due to familiar patterns
- **Code Quality**: Same TypeScript standards and form validation
- **User Experience**: Native mobile interactions with web app functionality