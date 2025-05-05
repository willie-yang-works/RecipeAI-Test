import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: "YOUR_OPENAI_API_KEY",
    dangerouslyAllowBrowser: true,
});

export const generateRecipe = async () => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content:
                    "Generate a simple recipe with title, ingredients, and instructions.",
            },
        ],
    });
    const recipeText = response.choices[0].message.content ?? "";
    const [title, ...rest] = recipeText.split("\n");
    const ingredients = rest
        .filter((line) => line.startsWith("-"))
        .map((line) => line.slice(2));
    const instructions = rest
        .filter((line) => !line.startsWith("-"))
        .join("\n")
        .trim();
    return {
        title: title.replace("Title: ", ""),
        ingredients,
        instructions: instructions || "Cook as desired.",
        image: "https://via.placeholder.com/300", // Placeholder image
    };
};

const GenerateRecipeModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState<{
        title: string;
        ingredients: string[];
        instructions: string;
        image: string;
    } | null>(null);

    return (
        <View>
            <Modal visible={modalVisible} transparent>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-5 rounded w-4/5">
                        {generatedRecipe ? (
                            <>
                                <Text className="text-xl font-bold">
                                    {generatedRecipe.title}
                                </Text>
                                <Text>Ingredients:</Text>
                                {generatedRecipe.ingredients.map((ing, i) => (
                                    <Text key={i}>- {ing}</Text>
                                ))}
                                <Text>Instructions:</Text>
                                <Text>{generatedRecipe.instructions}</Text>
                                <TouchableOpacity
                                    className="bg-red-500 p-2 rounded mt-4"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-white">Close</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text>Loading recipe...</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GenerateRecipeModal;
