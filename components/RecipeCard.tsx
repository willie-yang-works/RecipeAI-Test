import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface RecipeCardProps {
    title: string;
    image: string;
    onPress: () => void;
}

const RecipeCard = ({ title, image, onPress }: RecipeCardProps) => (
    <TouchableOpacity className="w-[48%] mb-4" onPress={onPress}>
        <Image
            source={{ uri: image || "https://via.placeholder.com/150" }}
            className="w-full h-32 rounded-lg"
        />
        <Text className="text-center text-black mt-2 text-base">{title}</Text>
    </TouchableOpacity>
);

export default RecipeCard;
