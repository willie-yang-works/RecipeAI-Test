"use client";

import { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const recipe = {
    id: "1",
    title: "Fusilli Marinara Sauce",
    image: "https://source.unsplash.com/random/400x300/?pasta,marinara",
    rating: 4.8,
    reviews: 200,
    author: {
        name: "Sarah Caines",
        avatar: "https://source.unsplash.com/random/100x100/?portrait",
    },
    description:
        "This easy fusilli pasta recipe uses fresh tomatoes, basil, garlic, and olive oil to create a homemade marinara sauce, perfect for a healthy meal any time of year.",
    time: "30 mins",
    calories: "250 cal",
    ingredients: [
        { name: "Ground Beef", amount: "200gr" },
        { name: "Tomato", amount: "2 unit" },
        { name: "Garlic", amount: "3 unit" },
        { name: "Mint Leaves", amount: "2 Unit" },
    ],
    instructions: [
        "Bring a large pot of salted water to a boil. Add fusilli pasta and cook according to package directions until al dente.",
        "While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and cook until fragrant, about 30 seconds.",
        "Add diced tomatoes, salt, and pepper. Cook for 5-7 minutes until tomatoes break down slightly.",
        "Drain pasta and add to the skillet with the sauce. Toss to combine.",
        "Remove from heat and stir in fresh basil leaves. Serve immediately with grated Parmesan cheese if desired.",
    ],
};

export default function RecipeDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState("ingredients");
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{recipe.title}</Text>
                <TouchableOpacity style={styles.moreButton}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={24}
                        color="#333333"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                />

                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                        Rated by {recipe.reviews} people
                    </Text>
                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                                key={star}
                                name={
                                    star <= Math.floor(recipe.rating)
                                        ? "star"
                                        : "star-outline"
                                }
                                size={16}
                                color="#FFD700"
                                style={{ marginLeft: 2 }}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.authorContainer}>
                    <Image
                        source={{ uri: recipe.author.avatar }}
                        style={styles.authorAvatar}
                    />
                    <Text style={styles.authorName}>{recipe.author.name}</Text>
                    <TouchableOpacity style={styles.saveButton}>
                        <Ionicons
                            name="bookmark-outline"
                            size={20}
                            color="#B22222"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.description}>{recipe.description}</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Ingredients</Text>
                        <Text style={styles.infoValue}>
                            {recipe.ingredients.length} items
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Time</Text>
                        <Text style={styles.infoValue}>{recipe.time}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Calories</Text>
                        <Text style={styles.infoValue}>{recipe.calories}</Text>
                    </View>
                </View>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeTab === "ingredients" && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab("ingredients")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "ingredients" &&
                                    styles.activeTabText,
                            ]}
                        >
                            Ingredients
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeTab === "instruction" && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab("instruction")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "instruction" &&
                                    styles.activeTabText,
                            ]}
                        >
                            Instruction
                        </Text>
                    </TouchableOpacity>
                </View>

                {activeTab === "ingredients" ? (
                    <View style={styles.ingredientsContainer}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <View style={styles.ingredientIconContainer}>
                                    {ingredient.name === "Ground Beef" && (
                                        <Text style={styles.ingredientIcon}>
                                            🥩
                                        </Text>
                                    )}
                                    {ingredient.name === "Tomato" && (
                                        <Text style={styles.ingredientIcon}>
                                            🍅
                                        </Text>
                                    )}
                                    {ingredient.name === "Garlic" && (
                                        <Text style={styles.ingredientIcon}>
                                            🧄
                                        </Text>
                                    )}
                                    {ingredient.name === "Mint Leaves" && (
                                        <Text style={styles.ingredientIcon}>
                                            🌿
                                        </Text>
                                    )}
                                </View>
                                <Text style={styles.ingredientName}>
                                    {ingredient.name}
                                </Text>
                                <Text style={styles.ingredientAmount}>
                                    {ingredient.amount}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.instructionsContainer}>
                        {recipe.instructions.map((instruction, index) => (
                            <View key={index} style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text style={styles.instructionText}>
                                    {instruction}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="home-outline" size={24} color="#666666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color="#666666"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color="#666666"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="person-outline" size={24} color="#666666" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: "#333333",
    },
    moreButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    recipeImage: {
        width: "100%",
        height: 250,
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    ratingText: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: "#666666",
    },
    starsContainer: {
        flexDirection: "row",
    },
    authorContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    authorAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    authorName: {
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: "#333333",
        marginLeft: 10,
        flex: 1,
    },
    saveButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    description: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#666666",
        lineHeight: 22,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    infoItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    infoLabel: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: "#666666",
        marginBottom: 5,
    },
    infoValue: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        color: "#333333",
    },
    tabsContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#B22222",
    },
    tabText: {
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: "#666666",
    },
    activeTabText: {
        color: "#B22222",
        fontFamily: "Poppins-SemiBold",
    },
    ingredientsContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80,
    },
    ingredientItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    ingredientIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#FFE5E5",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    ingredientIcon: {
        fontSize: 20,
    },
    ingredientName: {
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: "#333333",
        flex: 1,
    },
    ingredientAmount: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#666666",
    },
    instructionsContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80,
    },
    instructionItem: {
        flexDirection: "row",
        marginBottom: 20,
    },
    instructionNumber: {
        width: 30,
        height: 30,
        backgroundColor: "#B22222",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        marginTop: 2,
    },
    instructionNumberText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        color: "#FFFFFF",
    },
    instructionText: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#333333",
        flex: 1,
        lineHeight: 22,
    },
    tabBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: "#B22222",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        bottom: 10,
    },
});
