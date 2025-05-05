import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { BookOpen, Package, Heart, Settings } from "lucide-react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: isDark ? "#10b981" : "#047857",
                tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
                tabBarStyle: {
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    borderTopColor: isDark ? "#374151" : "#e5e7eb",
                },
                tabBarLabelStyle: {
                    fontFamily: "Inter-Medium",
                    fontSize: 12,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Recipe",
                    tabBarIcon: ({ color, size }) => (
                        <BookOpen size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pantry"
                options={{
                    title: "Pantry",
                    tabBarIcon: ({ color, size }) => (
                        <Package size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color, size }) => (
                        <Heart size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <Settings size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
