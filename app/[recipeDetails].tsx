import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RecipeDetailsScreen() {
    const { title, image, ingredients, totalTime, calories } =
        useLocalSearchParams();

    // Normalize image to a string
    const imageUri = Array.isArray(image)
        ? image[0]
        : image || "https://via.placeholder.com/300";

    return (
        <ScrollView className="p-5 bg-white">
            <Image source={{ uri: imageUri }} className="w-full h-48 rounded" />
            <Text className="text-2xl font-bold mt-2">
                {title || "Recipe Title"}
            </Text>
            <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">
                    {ingredients
                        ? (Array.isArray(ingredients)
                              ? ingredients
                              : ingredients.split(",")
                          ).length
                        : 0}{" "}
                    Items
                </Text>
                <Text className="text-gray-600">{totalTime || "30"} mins</Text>
                <Text className="text-gray-600">{calories || "250"} cal</Text>
            </View>
            <Text className="text-lg font-bold mt-4">Ingredients</Text>
            {ingredients ? (
                (Array.isArray(ingredients)
                    ? ingredients
                    : ingredients.split(",")
                ).map((item, i) => (
                    <Text key={i} className="mt-1">
                        - {item.trim()}
                    </Text>
                ))
            ) : (
                <Text>No ingredients available</Text>
            )}
        </ScrollView>
    );
}
