"use client";

import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Plus, X, Check } from "lucide-react-native";
import { useIngredients } from "../../lib/store";
import { categories } from "../../data/ingredients";

export default function PantryScreen() {
    const { ingredients, addIngredient, removeIngredient } = useIngredients();
    const [search, setSearch] = useState("");
    const [newIngredient, setNewIngredient] = useState("");

    const filteredCategories = search
        ? categories
              .map((category) => ({
                  ...category,
                  items: category.items.filter((item) =>
                      item.toLowerCase().includes(search.toLowerCase())
                  ),
              }))
              .filter((category) => category.items.length > 0)
        : categories;

    const handleAddCustomIngredient = () => {
        if (newIngredient.trim()) {
            addIngredient(newIngredient.trim());
            setNewIngredient("");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="px-4 pt-4 pb-2">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Pantry
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1">
                    Select ingredients you have available
                </Text>
            </View>

            <View className="px-4 flex-row items-center space-x-2 mb-4">
                <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                    <Search
                        size={18}
                        className="text-gray-500 dark:text-gray-400 mr-2"
                    />
                    <TextInput
                        className="flex-1 text-gray-900 dark:text-white"
                        placeholder="Search ingredients..."
                        placeholderTextColor="#9ca3af"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search ? (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <X
                                size={18}
                                className="text-gray-500 dark:text-gray-400"
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            {ingredients.length > 0 && (
                <View className="px-4 mb-4">
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Selected Ingredients ({ingredients.length})
                    </Text>
                    <View className="flex-row flex-wrap">
                        {ingredients.map((ingredient, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => removeIngredient(ingredient)}
                                className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-3 py-1 mr-2 mb-2 flex-row items-center"
                            >
                                <Text className="text-emerald-800 dark:text-emerald-300 mr-1">
                                    {ingredient}
                                </Text>
                                <X
                                    size={14}
                                    className="text-emerald-800 dark:text-emerald-300"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            <View className="px-4 flex-row items-center space-x-2 mb-4">
                <TextInput
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2"
                    placeholder="Add custom ingredient..."
                    placeholderTextColor="#9ca3af"
                    value={newIngredient}
                    onChangeText={setNewIngredient}
                    onSubmitEditing={handleAddCustomIngredient}
                />
                <TouchableOpacity
                    onPress={handleAddCustomIngredient}
                    className="bg-emerald-600 dark:bg-emerald-700 p-2 rounded-lg"
                    disabled={!newIngredient.trim()}
                >
                    <Plus size={20} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                {filteredCategories.map((category, categoryIndex) => (
                    <View key={categoryIndex} className="mb-6">
                        <Text className="px-4 text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {category.name}
                        </Text>
                        <View className="px-4 flex-row flex-wrap">
                            {category.items.map((item, itemIndex) => {
                                const isSelected = ingredients.includes(item);
                                return (
                                    <TouchableOpacity
                                        key={itemIndex}
                                        onPress={() =>
                                            isSelected
                                                ? removeIngredient(item)
                                                : addIngredient(item)
                                        }
                                        className={`mr-2 mb-2 px-3 py-1 rounded-full flex-row items-center ${
                                            isSelected
                                                ? "bg-emerald-100 dark:bg-emerald-900/30"
                                                : "bg-gray-100 dark:bg-gray-800"
                                        }`}
                                    >
                                        {isSelected && (
                                            <Check
                                                size={14}
                                                className="text-emerald-600 dark:text-emerald-400 mr-1"
                                            />
                                        )}
                                        <Text
                                            className={
                                                isSelected
                                                    ? "text-emerald-800 dark:text-emerald-300"
                                                    : "text-gray-800 dark:text-gray-300"
                                            }
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
