"use client";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>
                    <Text style={styles.logoIcon}>🍲</Text> Yumify
                </Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://source.unsplash.com/random/400x400/?food,bowl",
                    }}
                    style={styles.foodImage}
                />
                <View style={styles.iconContainer1}>
                    <Text style={styles.icon}>🥕</Text>
                </View>
                <View style={styles.iconContainer2}>
                    <Text style={styles.icon}>🍅</Text>
                </View>
                <View style={styles.dotCircle} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>Let's Cook</Text>
                <Text style={styles.subtitle}>Something Yum!</Text>
                <Text style={styles.description}>
                    Find the best food recipes
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/home")}
            >
                <Text style={styles.buttonText}>Start Cooking</Text>
                <Text style={styles.buttonIcon}>→</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    logoContainer: {
        width: "100%",
        alignItems: "flex-start",
        marginTop: 20,
    },
    logoText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 24,
        color: "#B22222",
    },
    logoIcon: {
        fontSize: 24,
    },
    imageContainer: {
        position: "relative",
        marginTop: 40,
        width: 280,
        height: 280,
        alignItems: "center",
        justifyContent: "center",
    },
    foodImage: {
        width: 240,
        height: 240,
        borderRadius: 120,
    },
    dotCircle: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        borderWidth: 2,
        borderColor: "#B22222",
        borderStyle: "dashed",
    },
    iconContainer1: {
        position: "absolute",
        top: 10,
        left: 20,
        backgroundColor: "#E8F5E9",
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer2: {
        position: "absolute",
        bottom: 40,
        right: 10,
        backgroundColor: "#FFEBEE",
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 20,
    },
    textContainer: {
        marginTop: 40,
        alignItems: "center",
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 28,
        color: "#333333",
    },
    subtitle: {
        fontFamily: "Poppins-Bold",
        fontSize: 28,
        color: "#333333",
        marginTop: -5,
    },
    description: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: "#666666",
        marginTop: 8,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#B22222",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        width: "100%",
    },
    buttonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: "#FFFFFF",
    },
    buttonIcon: {
        color: "#FFFFFF",
        fontSize: 20,
        marginLeft: 8,
    },
});
