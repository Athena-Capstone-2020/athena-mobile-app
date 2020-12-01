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
  },
});

export const Home = () => {
  const { state: userCtx, actions } = useUserContext();

  const [shownRecipes, setShownRecipes] = useState([]);
  const { recipeService } = withRecipeService();
  const { householdService } = withHouseholdService();
  const navigation = useNavigation();

  useEffect(() => {
    findRecipes();
  }, [householdService, navigation]);

  async function findRecipes() {
    const results = await recipeService.queryRecipes([
      "banana",
      "butter",
      "ground beef",
    ]);
    setShownRecipes(results);
  }

  const expireItems = [
    {
      title: "Bananas",
      image: "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg",
    },
    {
      title: "Chicken",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/delish-190808-baked-drumsticks-0217-landscape-pf-1567089281.jpg",
    },
    {
      title: "Steak",
      image: "https://www.thespruceeats.com/thmb/hl4lkmdLO7tj1eDCsGbakfk97Co=/3088x2055/filters:fill(auto,1)/marinated-top-round-steak-3060302-hero-02-ed071d5d7e584bea82857112aa734a94.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.innerContainer}>
        <Text
          variant="superHeader"
          style={{ marginVertical: 40, marginLeft: 20 }}
        >
          {userCtx.household !== null ? userCtx.household.name : "Loading..."}
        </Text>
        <Text variant="header" style={{ marginLeft: 20 }}>
          Expiring Soon
        </Text>
        <View style={{ height: 200 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={expireItems}
            horizontal
            renderItem={({ item }) => (
              <ExpireCard title={item.title} imageUri={item.image} />
            )}
          />
        </View>
        <Text variant="header" style={{ marginTop: 30, marginLeft: 20 }}>
          Recipes
        </Text>
      </Box>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ overflow: "hidden" }}
        data={shownRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        horizontal
      />
    </SafeAreaView>
  );
};

export default Home;
