"use client";

import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    ScrollView,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import {
    Moon,
    Sun,
    ChevronRight,
    Info,
    Mail,
    Star,
    Trash2,
} from "lucide-react-native";
import { useIngredients, useFavorites } from "../../lib/store";

export default function SettingsScreen() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const { clearIngredients } = useIngredients();
    const { clearFavorites } = useFavorites();

    const handleClearData = () => {
        clearIngredients();
        clearFavorites();
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="px-4 pt-4 pb-2">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    Settings
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1">
                    Customize your app experience
                </Text>
            </View>

            <ScrollView className="flex-1">
                <View className="px-4 py-2">
                    <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                        Appearance
                    </Text>
                    <View className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <View className="flex-row items-center justify-between p-4">
                            <View className="flex-row items-center">
                                {isDark ? (
                                    <Moon
                                        size={20}
                                        className="text-gray-900 dark:text-white mr-3"
                                    />
                                ) : (
                                    <Sun
                                        size={20}
                                        className="text-gray-900 dark:text-white mr-3"
                                    />
                                )}
                                <Text className="text-gray-900 dark:text-white font-medium">
                                    Dark Mode
                                </Text>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={toggleColorScheme}
                                trackColor={{
                                    false: "#d1d5db",
                                    true: "#10b981",
                                }}
                                thumbColor="#ffffff"
                            />
                        </View>
                    </View>
                </View>

                <View className="px-4 py-2">
                    <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                        Data
                    </Text>
                    <View className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <TouchableOpacity
                            className="flex-row items-center justify-between p-4"
                            onPress={handleClearData}
                        >
                            <View className="flex-row items-center">
                                <Trash2
                                    size={20}
                                    className="text-gray-900 dark:text-white mr-3"
                                />
                                <Text className="text-gray-900 dark:text-white font-medium">
                                    Clear All Data
                                </Text>
                            </View>
                            <ChevronRight size={20} className="text-gray-400" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-4 py-2">
                    <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                        About
                    </Text>
                    <View className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <TouchableOpacity
                            className="flex-row items-center justify-between p-4"
                            onPress={() =>
                                Linking.openURL("https://example.com/about")
                            }
                        >
                            <View className="flex-row items-center">
                                <Info
                                    size={20}
                                    className="text-gray-900 dark:text-white mr-3"
                                />
                                <Text className="text-gray-900 dark:text-white font-medium">
                                    About This App
                                </Text>
                            </View>
                            <ChevronRight size={20} className="text-gray-400" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700"
                            onPress={() =>
                                Linking.openURL("mailto:support@example.com")
                            }
                        >
                            <View className="flex-row items-center">
                                <Mail
                                    size={20}
                                    className="text-gray-900 dark:text-white mr-3"
                                />
                                <Text className="text-gray-900 dark:text-white font-medium">
                                    Contact Support
                                </Text>
                            </View>
                            <ChevronRight size={20} className="text-gray-400" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700"
                            onPress={() =>
                                Linking.openURL("https://example.com/rate")
                            }
                        >
                            <View className="flex-row items-center">
                                <Star
                                    size={20}
                                    className="text-gray-900 dark:text-white mr-3"
                                />
                                <Text className="text-gray-900 dark:text-white font-medium">
                                    Rate This App
                                </Text>
                            </View>
                            <ChevronRight size={20} className="text-gray-400" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="p-4 items-center">
                    <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        Version 1.0.0
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
