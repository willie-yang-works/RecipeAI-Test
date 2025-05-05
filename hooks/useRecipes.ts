import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of an Edamam recipe
interface EdamamRecipe {
    label: string;
    image: string;
    url: string;
    ingredients: { text: string }[];
    totalTime: number;
    calories: number;
}

interface EdamamResponse {
    hits: { recipe: EdamamRecipe }[];
}

const useRecipes = () => {
    const [recipes, setRecipes] = useState<EdamamRecipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecipes = async (
        type: "random" | "recommended" | "categorized" = "random"
    ) => {
        setLoading(true);
        setError(null);
        try {
            let url =
                "https://api.edamam.com/api/recipes/v2?type=public&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY";
            if (type === "recommended") {
                url += "&random=true&field=label&field=image&field=url";
            } else if (type === "categorized") {
                url +=
                    "&random=true&cuisineType=italian,american&field=label&field=image&field=url";
            }
            const response = await axios.get<EdamamResponse>(url);
            setRecipes(response.data.hits.map((hit) => hit.recipe));
        } catch (err) {
            setError("Failed to fetch recipes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return { recipes, loading, error, fetchRecipes };
};

export default useRecipes;
