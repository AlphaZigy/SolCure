import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomDrawer from '@/components/CustomDrawer';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Against History": require("../assets/fonts/Against History.ttf"),
    "bromello-Regular": require("../assets/fonts/bromello-Regular.ttf"),
    "Julietta-Messie-Demo": require("../assets/fonts/Julietta-Messie-Demo.ttf"),
    "Oswald-VariableFont_wght": require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Photograph Signature": require("../assets/fonts/Photograph Signature.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Gilroy-ExtraBold": require("../assets/fonts/Gilroy-ExtraBold.otf"),
    "Outfit-VariableFont_wght": require("../assets/fonts/Outfit-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffffff' }}>
        <Drawer
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#eef',
              width: 200,
            },
            headerStyle: {
              backgroundColor: '#762006',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerLabelStyle: {
              color: '#111111',
            },
          }}
        >
          <Drawer.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              drawerLabel: "🏠 Dashboard"
            }} 
          />
          <Drawer.Screen 
            name="barn-detail" 
            options={{
              drawerLabel: "📊 Barn Details",
              title: "Barn Details"
            }} 
          />
          <Drawer.Screen 
            name="alerts" 
            options={{
              drawerLabel: "🚨 Alerts & Notifications",
              title: "Alerts"
            }} 
          />
          <Drawer.Screen 
            name="farm-setup" 
            options={{
              drawerLabel: "🏗️ Farm Setup",
              title: "Farm Setup"
            }} 
          />
          <Drawer.Screen 
            name="reports" 
            options={{
              drawerLabel: "📈 Reports & Analytics",
              title: "Reports"
            }} 
          />
          <Drawer.Screen 
            name="ai-recommendations" 
            options={{
              drawerLabel: "🤖 AI Recommendations",
              title: "AI Insights"
            }} 
          />
          <Drawer.Screen 
            name="settings" 
            options={{
              drawerLabel: "⚙️ Settings & Profile",
              title: "Settings"
            }} 
          />
          <Drawer.Screen 
            name="help-support" 
            options={{
              drawerLabel: "❓ Help & Support",
              title: "Help"
            }} 
          />
          <Drawer.Screen 
            name="+not-found" 
            options={{
              drawerLabel: "Not Found"
            }} 
          />
        </Drawer>
        <StatusBar style="light" />
      </SafeAreaView>
    </ThemeProvider>
  );
}
