"use client";

import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { generateRecipe } from "../../lib/ai";
import { useIngredients } from "../../lib/store";
import type { Recipe } from "../../types";

export default function RecipeScreen() {
    const router = useRouter();
    const { ingredients } = useIngredients();
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const handleGenerateRecipes = async () => {
        if (ingredients.length === 0) {
            router.push("/pantry");
            return;
        }

        setLoading(true);
        try {
            const generatedRecipes = await generateRecipe(ingredients);
            setRecipes(generatedRecipes);
        } catch (error) {
            console.error("Failed to generate recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="px-4 pt-4 pb-2">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    Recipe Finder
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1">
                    Find recipes based on ingredients in your pantry
                </Text>
            </View>

            {ingredients.length > 0 ? (
                <View className="px-4 py-3 bg-emerald-50 dark:bg-emerald-900/30 mx-4 rounded-lg mb-4">
                    <Text className="text-emerald-800 dark:text-emerald-300 font-medium">
                        {ingredients.length} ingredient
                        {ingredients.length !== 1 ? "s" : ""} selected
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/pantry")}
                        className="flex-row items-center mt-1"
                    >
                        <Text className="text-emerald-600 dark:text-emerald-400 text-sm">
                            Edit ingredients
                        </Text>
                        <ChevronRight
                            size={16}
                            className="text-emerald-600 dark:text-emerald-400"
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="px-4 py-3 bg-amber-50 dark:bg-amber-900/30 mx-4 rounded-lg mb-4">
                    <Text className="text-amber-800 dark:text-amber-300 font-medium">
                        No ingredients selected
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/pantry")}
                        className="flex-row items-center mt-1"
                    >
                        <Text className="text-amber-600 dark:text-amber-400 text-sm">
                            Add ingredients to your pantry
                        </Text>
                        <ChevronRight
                            size={16}
                            className="text-amber-600 dark:text-amber-400"
                        />
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity
                onPress={handleGenerateRecipes}
                className="mx-4 bg-emerald-600 dark:bg-emerald-700 py-3 rounded-lg items-center"
                disabled={loading || ingredients.length === 0}
            >
                <Text className="text-white font-medium">
                    {loading ? "Generating..." : "Generate Recipes"}
                </Text>
            </TouchableOpacity>

            <ScrollView className="flex-1 mt-4">
                {loading ? (
                    <View className="items-center justify-center py-12">
                        <ActivityIndicator size="large" color="#10b981" />
                        <Text className="text-gray-600 dark:text-gray-400 mt-4">
                            Cooking up some ideas...
                        </Text>
                    </View>
                ) : recipes.length > 0 ? (
                    <View className="px-4">
                        {recipes.map((recipe, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-200 dark:border-gray-700"
                                onPress={() =>
                                    router.push({
                                        pathname: "/recipe-detail",
                                        params: { id: index.toString() },
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
                                <View className="p-3">
                                    <Text className="text-lg font-bold text-gray-900 dark:text-white">
                                        {recipe.title}
                                    </Text>
                                    <Text className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                                        {recipe.cookTime} • {recipe.difficulty}
                                    </Text>
                                    <Text
                                        className="text-gray-500 dark:text-gray-500 mt-2 text-sm"
                                        numberOfLines={2}
                                    >
                                        {recipe.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View className="items-center justify-center py-12 px-4">
                        <Image
                            source={require("../../assets/images/cooking.png")}
                            className="w-48 h-48 mb-4"
                            contentFit="contain"
                        />
                        <Text className="text-gray-900 dark:text-white text-lg font-medium text-center">
                            Ready to discover new recipes?
                        </Text>
                        <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                            Select ingredients from your pantry and generate
                            personalized recipe suggestions.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
