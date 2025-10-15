# Mobile Development Workflow

## 🚀 Simple Frontend Development Strategy

### Project Setup
```bash
# Create Expo project
npx create-expo-app RestaurantApp --template blank-typescript

# Install essential dependencies
npx expo install expo-router expo-constants expo-linking expo-status-bar
npm install zustand @react-native-async-storage/async-storage
npm install react-hook-form @hookform/resolvers zod
npm install react-native-reanimated
```

### Basic Configuration
```typescript
// app.json - Expo configuration
{
  "expo": {
    "name": "Restaurant App",
    "slug": "restaurant-app",
    "scheme": "restaurant-app",
    "platforms": ["ios", "android"],
    "orientation": "portrait",
    "userInterfaceStyle": "automatic"
  }
}
```

## 📁 Development Phases

### Phase 1: Foundation (Week 1)
**Goal**: Basic project setup and navigation

**Tasks**:
- [ ] Setup Expo project with TypeScript
- [ ] Configure Expo Router navigation  
- [ ] Port `src/config/site.ts` from web app
- [ ] Create basic folder structure
- [ ] Setup Zustand store for auth state

**Code Example**:
```typescript
// src/config/site.ts (copied from web app)
export const siteConfig = {
  name: "[RESTAURANT_APP_NAME]",
  shortName: "[APP_NAME]",
  description: "Mobile restaurant revenue app",
};

// src/stores/authStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
```

### Phase 2: Core Components (Week 2)
**Goal**: Port essential UI components from web app

**Tasks**:
- [ ] Create mobile UI components (Button, Input, Card)
- [ ] Port authentication forms
- [ ] Setup basic navigation between screens
- [ ] Implement form validation (same as web app)

**Code Example**:
```typescript
// src/components/ui/Button.tsx (adapted from web)
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable 
      style={[styles.button, variant === 'secondary' && styles.secondary]} 
      onPress={onPress}
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
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#22C55E',
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

### Phase 3: Business Logic (Week 3)
**Goal**: Port core business logic from web app

**Tasks**:
- [ ] Port checkout and cart functionality
- [ ] Implement cross-sell recommendations (same logic as web)
- [ ] Add restaurant inventory components
- [ ] Create customer shopping flow

**Code Example**:
```typescript
// src/stores/cartStore.ts (similar to web app logic)
import { create } from 'zustand';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeItem: (itemId) => set((state) => ({ 
    items: state.items.filter(item => item.id !== itemId) 
  })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));
```

### Phase 4: Polish & Testing (Week 4)
**Goal**: Add animations, test, and prepare for deployment

**Tasks**:
- [ ] Add smooth transitions with Reanimated
- [ ] Test on iOS and Android devices
- [ ] Optimize performance
- [ ] Build for app stores

## 🧪 Simple Testing Strategy

### Component Testing
```typescript
// __tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../src/components/ui/Button';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
```

### Store Testing
```typescript
// __tests__/cartStore.test.ts
import { useCartStore } from '../src/stores/cartStore';

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should add items to cart', () => {
    const { addItem, items } = useCartStore.getState();
    
    addItem({ id: '1', name: 'Test Item', price: 10 });
    
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Test Item');
  });
});
```

## 📱 Mobile-Specific Considerations

### Screen Sizes & Safe Areas
```typescript
// src/components/layout/SafeScreen.tsx
import { SafeAreaView, StatusBar } from 'react-native';
import { ReactNode } from 'react';

interface SafeScreenProps {
  children: ReactNode;
}

export function SafeScreen({ children }: SafeScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
}
```

### Platform-Specific Code
```typescript
// src/utils/platform.ts
import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

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
};
```

## 🚀 Build & Deployment

### EAS Build Configuration
```json
// eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### Build Commands
```bash
# Development build
eas build --platform ios --profile development

# Production build  
eas build --platform all --profile production

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 📊 Success Metrics

### Development Velocity
- **Week 1**: Project setup and navigation ✅
- **Week 2**: Core components and forms ✅  
- **Week 3**: Business logic and features ✅
- **Week 4**: Testing and deployment ✅

### Quality Metrics
- **Code Reuse**: 70%+ from web app
- **Type Safety**: Full TypeScript coverage
- **Performance**: 60fps animations
- **Testing**: 80%+ test coverage

## 🎯 Key Success Factors

### Leverage Web App Strengths
- ✅ Same TypeScript patterns
- ✅ Same form validation (react-hook-form + zod)
- ✅ Same state management approach (Zustand)
- ✅ Same component structure and organization

### Focus Areas
- **UI Translation**: HTML/CSS → React Native components
- **Navigation**: Next.js routing → Expo Router
- **Platform UX**: Mobile-specific interactions and gestures
- **Performance**: Smooth 60fps animations