import { Stack } from "expo-router";
import * as Font from "expo-font";
import { useEffect } from "react";
import "@/global.css";

export default function Layout() {
    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
                "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
                "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
            });
        })();
    }, []);

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="[recipeDetails]"
                options={{ title: "Recipe Details" }}
            />
        </Stack>
    );
}
