"use client";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { useFavorites } from "../../lib/store";

export default function FavoritesScreen() {
    const router = useRouter();
    const { favorites, removeFavorite } = useFavorites();

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="px-4 pt-4 pb-2">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    Favorites
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1">
                    Your saved recipes
                </Text>
            </View>

            <ScrollView className="flex-1">
                {favorites.length > 0 ? (
                    <View className="px-4">
                        {favorites.map((recipe, index) => (
                            <View
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: "/recipe-detail",
                                            params: { id: recipe.id },
                                        })
                                    }
                                >
                                    <Image
                                        source={{
                                            uri:
                                                recipe.image ||
                                                "https://placeholder.svg?height=200&width=400",
                                        }}
                                        className="w-full h-48"
                                        contentFit="cover"
                                    />
                                    <View className="absolute top-2 right-2">
                                        <TouchableOpacity
                                            onPress={() =>
                                                removeFavorite(recipe.id)
                                            }
                                            className="bg-white dark:bg-gray-800 p-2 rounded-full"
                                        >
                                            <Heart
                                                size={20}
                                                fill="#ef4444"
                                                color="#ef4444"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View className="p-3">
                                        <Text className="text-lg font-bold text-gray-900 dark:text-white">
                                            {recipe.title}
                                        </Text>
                                        <Text className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                                            {recipe.cookTime} •{" "}
                                            {recipe.difficulty}
                                        </Text>
                                        <Text
                                            className="text-gray-500 dark:text-gray-500 mt-2 text-sm"
                                            numberOfLines={2}
                                        >
                                            {recipe.description}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View className="items-center justify-center py-12 px-4">
                        <Image
                            source={require("../../assets/images/empty-favorites.png")}
                            className="w-48 h-48 mb-4"
                            contentFit="contain"
                        />
                        <Text className="text-gray-900 dark:text-white text-lg font-medium text-center">
                            No favorites yet
                        </Text>
                        <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                            Save your favorite recipes here for quick access
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push("/")}
                            className="mt-4 bg-emerald-600 dark:bg-emerald-700 py-2 px-4 rounded-lg"
                        >
                            <Text className="text-white font-medium">
                                Discover Recipes
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
