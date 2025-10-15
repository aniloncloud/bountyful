# Component Migration: Web → Mobile

## 🔄 Direct Component Translation (70% Logic Reuse)

### Authentication Components
```typescript
// Web: src/app/(auth)/layout.tsx
// Mobile: src/app/(auth)/_layout.tsx

// Business logic preservation:
✅ Form validation (react-hook-form + zod)
✅ Auth state management patterns
✅ Error handling logic

// Mobile adaptations needed:
- Replace Next.js <Link> with Expo Router navigation
- Convert HTML elements to React Native components
- Add mobile-specific UI (SafeAreaView, KeyboardAvoidingView)
```

### Customer Shopping Components
```typescript
// Web: src/components/customer/CustomerNavigation.tsx
// Mobile: src/components/customer/MobileNavigation.tsx

// Preserved patterns:
const [cartCount, setCartCount] = useState(2); // ✅ Same state logic

// Mobile adaptation:
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

// Replace:
<Link href="/shop/cart"> → <Pressable onPress={() => router.push('/shop/cart')}>
```

### Form Components (Perfect Translation)
```typescript
// Web: Your existing form validation
// Mobile: Exact same logic!

// This works identically:
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {...}
});

// Only UI changes:
// Web: <input /> → Mobile: <TextInput />
// Web: <button /> → Mobile: <Pressable />
```

### Cross-sell & Business Logic
```typescript
// Web: src/components/customer/CheckoutCrossSell.tsx
// Mobile: src/components/customer/CheckoutCrossSell.tsx

// This algorithm works exactly the same:
const getSmartRecommendations = (): CheckoutCrossItem[] => {
  const availableItems = crossSellDatabase[restaurantId] || [];
  let recommendations: CheckoutCrossItem[] = [];
  const perfectMatches = availableItems.filter(item => item.perfectMatch);
  recommendations.push(...perfectMatches.slice(0, 2));
  return recommendations.slice(0, 2);
};

// Only UI wrapper changes from HTML → React Native
```

## 📱 Mobile UI Adaptations

### Component Wrapper Translation
```typescript
// Web Pattern:
<div className="card">
  <h3>{title}</h3>
  <p>{description}</p>
  <button onClick={handleClick}>Action</button>
</div>

// Mobile Pattern:
<View style={styles.card}>
  <Text style={styles.title}>{title}</Text>
  <Text style={styles.description}>{description}</Text>
  <Pressable onPress={handleClick} style={styles.button}>
    <Text style={styles.buttonText}>Action</Text>
  </Pressable>
</View>
```

### Navigation Translation
```typescript
// Web: Next.js routing
import Link from 'next/link';
<Link href="/features">Features</Link>

// Mobile: Expo Router
import { router } from 'expo-router';
<Pressable onPress={() => router.push('/features')}>
  <Text>Features</Text>
</Pressable>
```

### State Management (Identical)
```typescript
// Your existing Zustand patterns work perfectly:
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
}));

// Same in mobile! No changes needed.
```

## 🏗️ Folder Structure Migration

### Web App Structure → Mobile Structure
```
Web:                          Mobile:
src/app/(auth)/               src/app/(auth)/
src/app/(marketing)/          src/app/(marketing)/
src/app/shop/                 src/app/shop/
src/components/customer/      src/components/customer/
src/components/restaurant/    src/components/restaurant/
src/config/site.ts            src/config/site.ts
```

**Perfect match!** Your web app structure translates directly to mobile.

## ✅ Simple Migration Checklist

### Phase 1: Project Setup
- [ ] Create Expo project: `npx create-expo-app --template blank-typescript`
- [ ] Install dependencies: `zustand`, `react-hook-form`, `zod`
- [ ] Copy `src/config/` folder from web app
- [ ] Setup folder structure to match web app

### Phase 2: Core Components (Week 1)
- [ ] Port `src/components/ui/` components (Button, Input, etc.)
- [ ] Convert forms components (just UI wrappers)
- [ ] Migrate auth components (layout + forms)
- [ ] Setup basic navigation structure

### Phase 3: Customer Flow (Week 2)
- [ ] Port customer shopping components
- [ ] Convert checkout flow
- [ ] Implement cart functionality
- [ ] Add product displays

### Phase 4: Restaurant Dashboard (Week 3)
- [ ] Port restaurant components
- [ ] Convert inventory management
- [ ] Implement pricing dashboard
- [ ] Add analytics displays

### Phase 5: Polish & Test (Week 4)
- [ ] Add animations with Reanimated
- [ ] Test on iOS and Android devices
- [ ] Performance optimization
- [ ] Prepare for app store submission

## 🎯 Key Success Patterns

### What Stays Exactly The Same ✅
- All business logic functions
- Form validation schemas (Zod)
- State management patterns (Zustand)
- TypeScript interfaces and types
- Utility functions
- Configuration files

### What Changes (UI Only) 🔄
- HTML elements → React Native components
- CSS classes → StyleSheet styles
- Next.js routing → Expo Router navigation
- `onClick` → `onPress`
- `<div>` → `<View>`
- `<span>`/`<p>` → `<Text>`

### Mobile-Specific Additions 📱
- `SafeAreaView` for status bar handling
- `KeyboardAvoidingView` for forms
- `ScrollView` for long content
- Platform-specific styles when needed
- Native animations with Reanimated

## 📊 Expected Results
- **70% code reuse** from your web app business logic
- **Same TypeScript quality** and validation patterns
- **Familiar development experience** due to similar structure
- **Fast development** because you're not learning new patterns