import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useUserContext } from "../../global/user-context/useUserContext";
import ExpireCard from "./ExpireCard";
import { Text, Box } from "../../components/Theme";
import {
  withContainerService,
  withHouseholdService,
  withRecipeService,
} from "../../services";
import { useNavigation } from "@react-navigation/native";
import { RecipeCard } from "./RecipeCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  innerContainer: {
    alignItems: "flex-start",
    marginHorizontal: 30,
  },
});

export const Home = () => {
  const { state: userCtx, actions } = useUserContext();

  const [expireSoonFoodItems, setExpireSoonFoodItems] = useState([]);
  const [shownRecipes, setShownRecipes] = useState([]);
  const { recipeService } = withRecipeService();
  const { householdService } = withHouseholdService();
  const navigation = useNavigation();

  useEffect(() => {
    // displayExpireSoon()
    findRecipes();
  }, [householdService, navigation]);

  // async function displayExpireSoon() {
  //     const results = await householdService.getContainersForHousehold(userCtx.household.id) // Reyes Household
  // }

  async function findRecipes() {
    const results = await recipeService.queryRecipes(["banana", "butter"]);
    setShownRecipes(results);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.innerContainer}>
        <Text variant="superHeader" style={{ marginVertical: 40 }}>
          {userCtx.household !== null ? userCtx.household.name : "Loading..."}
        </Text>
        <Text variant="header">Expiring Soon</Text>
        <ExpireCard title="Banana" />
        <Text variant="header" style={{ marginTop: 30 }}>
          Recipies
        </Text>
      </Box>
        <FlatList
          showsHorizontalScrollIndicator={false}
            style={{ overflow: 'hidden' }}
            data={shownRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            horizontal
        />
    </SafeAreaView>
  );
};



export default Home;
