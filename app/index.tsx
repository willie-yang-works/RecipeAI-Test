import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import { generateRecipe } from "../components/GenerateRecipeModal";

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const { recipes, loading, error, fetchRecipes } = useRecipes();
    const router = useRouter();

    const categories = [
        { name: "Pasta", color: "bg-secondary" },
        { name: "Dessert", color: "bg-pink-200" },
        { name: "Seafood", color: "bg-blue-200" },
        { name: "Vegan", color: "bg-green-200" },
    ];

    const handleSearch = () => {
        if (search.trim()) {
            fetchRecipes();
            setSearch("");
        }
    };

    const recentRecipes = recipes.slice(0, 4);

    return (
        <View className="flex-1 p-4 bg-background">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-foreground">
                    Yumify
                </Text>
                <View className="w-8 h-8 bg-muted rounded-full" />
            </View>

            {/* Search Bar */}
            <TextInput
                className="border border-gray-300 bg-white p-3 rounded-lg mb-4 text-foreground"
                placeholder="Lorem ipsum dolor sit amet"
                placeholderTextColor="textLight"
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={handleSearch}
            />

            {/* Popular Categories */}
            <Text className="text-lg font-semibold mb-2 text-foreground">
                Popular Categories
            </Text>
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className={`py-2 px-4 mr-4 rounded-lg ${item.color}`}
                        onPress={() => fetchRecipes("categorized")}
                    >
                        <Text className="text-foreground text-base">
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
            />

            {/* Recent Recipes */}
            <Text className="text-lg font-semibold mt-4 mb-2 text-foreground">
                Recent Recipes
            </Text>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="primary"
                    className="my-4"
                />
            ) : error ? (
                <Text className="text-destructive text-center my-4">
                    {error}
                </Text>
            ) : recentRecipes.length === 0 ? (
                <Text className="text-muted-foreground text-center my-4">
                    No recent recipes available
                </Text>
            ) : (
                <FlatList
                    data={recentRecipes}
                    renderItem={({ item }) => (
                        <RecipeCard
                            title={item.label}
                            image={item.image}
                            onPress={() =>
                                router.push({
                                    pathname: "/[recipeDetails]",
                                    params: {
                                        recipeDetails: slugify(item.label),
                                        title: item.label,
                                        image: item.image,
                                        ingredients: item.ingredients
                                            .map((ing) => ing.text)
                                            .join(","),
                                        totalTime: item.totalTime.toString(),
                                        calories: Math.round(
                                            item.calories
                                        ).toString(),
                                    },
                                })
                            }
                        />
                    )}
                    keyExtractor={(item) => item.url}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 16,
                    }}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            )}

            {/* Generate Recipe Button */}
            <TouchableOpacity
                className="bg-primary py-3 rounded-lg mt-4 items-center"
                onPress={async () => {
                    const recipe = await generateRecipe();
                    router.push({
                        pathname: "/[recipeDetails]",
                        params: {
                            recipeDetails: slugify(recipe.title),
                            title: recipe.title,
                            image: recipe.image,
                            ingredients: recipe.ingredients.join(","),
                        },
                    });
                }}
            >
                <Text className="text-white font-bold text-base">
                    Generate Recipe
                </Text>
            </TouchableOpacity>
        </View>
    );
}
