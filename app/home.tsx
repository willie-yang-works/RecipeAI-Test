"use client";

import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const categories = [
    { id: 1, name: "Pasta", icon: "🍝" },
    { id: 2, name: "Dessert", icon: "🍰" },
    { id: 3, name: "Seafood", icon: "🦐" },
    { id: 4, name: "Vegan", icon: "🥗" },
];

const recentRecipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "https://source.unsplash.com/random/200x200/?pasta,carbonara",
    },
    {
        id: 2,
        title: "Chicken Salad",
        image: "https://source.unsplash.com/random/200x200/?chicken,salad",
    },
];

export default function HomeScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        <Text style={styles.logoIcon}>🍲</Text> Yumify
                    </Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.profileIcon}>👩‍🍳</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Let's Cook</Text>
                <Text style={styles.subtitle}>Something Delicious</Text>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Ionicons
                            name="search"
                            size={20}
                            color="#666666"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search recipes or ingredients"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.categoriesHeader}>
                    <Text style={styles.sectionTitle}>Popular Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryItem}
                        >
                            <Text style={styles.categoryIcon}>
                                {category.icon}
                            </Text>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.generateContainer}>
                    <Text style={styles.generateTitle}>
                        Undecided on tonight's dinner?
                    </Text>
                    <Text style={styles.generateSubtitle}>
                        We'll craft a recipe using your ingredients.
                    </Text>
                    <TouchableOpacity
                        style={styles.generateButton}
                        onPress={() => router.push("/recipe/1")}
                    >
                        <Text style={styles.generateButtonText}>
                            Generate Recipe
                        </Text>
                        <Ionicons
                            name="sparkles-outline"
                            size={18}
                            color="#FFFFFF"
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.recentHeader}>
                    <Text style={styles.sectionTitle}>Recent Recipes</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.recipesGrid}>
                    {recentRecipes.map((recipe) => (
                        <TouchableOpacity
                            key={recipe.id}
                            style={styles.recipeCard}
                            onPress={() => router.push("/recipe/1")}
                        >
                            <Image
                                source={{ uri: recipe.image }}
                                style={styles.recipeImage}
                            />
                            <View style={styles.recipeOverlay}>
                                <Text style={styles.recipeTitle}>
                                    {recipe.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="home" size={24} color="#B22222" />
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
        paddingTop: 10,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 22,
        color: "#B22222",
    },
    logoIcon: {
        fontSize: 22,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
    },
    profileIcon: {
        fontSize: 20,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: "Poppins-Medium",
        fontSize: 24,
        color: "#333333",
        marginTop: 20,
    },
    subtitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 24,
        color: "#333333",
        marginTop: -5,
    },
    searchContainer: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
    },
    searchInputContainer: {
        flex: 1,
        height: 50,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },
    filterButton: {
        width: 50,
        height: 50,
        backgroundColor: "#B22222",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    categoriesHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
    },
    sectionTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: "#333333",
    },
    viewAllText: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: "#B22222",
    },
    categoriesContainer: {
        marginTop: 15,
        flexDirection: "row",
    },
    categoryItem: {
        width: 80,
        height: 80,
        backgroundColor: "#FFE5E5",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 5,
    },
    categoryName: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: "#333333",
    },
    generateContainer: {
        backgroundColor: "#FFF8E1",
        borderRadius: 16,
        padding: 20,
        marginTop: 25,
    },
    generateTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: "#333333",
    },
    generateSubtitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#666666",
        marginTop: 5,
    },
    generateButton: {
        backgroundColor: "#B22222",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        flexDirection: "row",
    },
    generateButtonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        color: "#FFFFFF",
    },
    recentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
    },
    recipesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 80,
    },
    recipeCard: {
        width: "48%",
        height: 180,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 15,
    },
    recipeImage: {
        width: "100%",
        height: "100%",
    },
    recipeOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
    },
    recipeTitle: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: "#FFFFFF",
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
