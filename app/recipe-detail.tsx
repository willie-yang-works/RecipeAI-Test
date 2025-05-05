"use client";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Clock, Heart } from "lucide-react-native";
import { useRecipes, useFavorites } from "../lib/store";

export default function RecipeDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { recipes } = useRecipes();
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 items-center justify-center">
                <Text className="text-gray-900 dark:text-white">
                    Recipe not found
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-emerald-600 dark:bg-emerald-700 py-2 px-4 rounded-lg"
                >
                    <Text className="text-white font-medium">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const isFavorite = favorites.some((fav) => fav.id === recipe.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="absolute top-12 left-4 z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
                >
                    <ArrowLeft
                        size={24}
                        className="text-gray-900 dark:text-white"
                    />
                </TouchableOpacity>
            </View>

            <View className="absolute top-12 right-4 z-10">
                <TouchableOpacity
                    onPress={toggleFavorite}
                    className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
                >
                    <Heart
                        size={24}
                        className={
                            isFavorite
                                ? "text-red-500"
                                : "text-gray-900 dark:text-white"
                        }
                        fill={isFavorite ? "#ef4444" : "none"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                <Image
                    source={{
                        uri:
                            recipe.image ||
                            "https://placeholder.svg?height=300&width=400",
                    }}
                    className="w-full h-72"
                    contentFit="cover"
                />

                <View className="px-4 py-4">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        {recipe.title}
                    </Text>

                    <View className="flex-row items-center mt-2">
                        <Clock
                            size={16}
                            className="text-gray-600 dark:text-gray-400 mr-1"
                        />
                        <Text className="text-gray-600 dark:text-gray-400 mr-4">
                            {recipe.cookTime}
                        </Text>
                        <View className="bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                            <Text className="text-emerald-800 dark:text-emerald-300 text-sm">
                                {recipe.difficulty}
                            </Text>
                        </View>
                    </View>

                    <Text className="text-gray-700 dark:text-gray-300 mt-4">
                        {recipe.description}
                    </Text>

                    <View className="mt-6">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Ingredients
                        </Text>
                        {recipe.ingredients.map((ingredient, index) => (
                            <View
                                key={index}
                                className="flex-row items-center py-2 border-b border-gray-200 dark:border-gray-700"
                            >
                                <View className="w-2 h-2 rounded-full bg-emerald-500 mr-3" />
                                <Text className="text-gray-800 dark:text-gray-200">
                                    {ingredient.name}: {ingredient.amount}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View className="mt-6">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Instructions
                        </Text>
                        {recipe.steps.map((step, index) => (
                            <View key={index} className="mb-4">
                                <View className="flex-row items-start">
                                    <View className="bg-emerald-600 dark:bg-emerald-700 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                                        <Text className="text-white font-bold text-xs">
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <Text className="text-gray-800 dark:text-gray-200 flex-1">
                                        {step}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {recipe.tips && (
                        <View className="mt-6 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                Chef's Tips
                            </Text>
                            <Text className="text-gray-800 dark:text-gray-200">
                                {recipe.tips}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
