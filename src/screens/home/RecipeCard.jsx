import React from "react";
import { Card } from "../../components";
import { Recipe } from "../../models/Recipe";
import { Box, Text } from "../../components/Theme";
import { FlatList, StyleSheet, View } from "react-native";

/**
 *
 * @param {{recipe: Recipe }} props
 */
export function RecipeCard(props) {
  return (
    <Card
      imageUri={props.recipe.photoURI}
      width={250}
      height={380}
      bottomContent={<RecipeCardBottomContent {...props} />}
      cardStyle={{ margin: 10}}
    />
  );
}

/**
 *
 * @param {{recipe: Recipe }} props
 */
function RecipeCardBottomContent({ recipe }) {
  const style = StyleSheet.create({
    container: {
      textAlign: "left",
      marginVertical: 20,
      marginHorizontal: 10,
    },
    title: {
      textAlign: "left",
    },
  });

  return (
    <View style={style.container}>
      <Text
        variant="body"
        adjustsFontSizeToFit
        numberOfLines={2}
        allowFontScaling={true}
        style={style.title}
      >
        {recipe.name}
      </Text>
      <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 5, marginVertical: 10 }}>
        <Text variant="bottomCardContentBody">
          Serves: {recipe.servingSize}
        </Text>
        <Text style={{ marginLeft: "auto" }} variant="bottomCardContentBody">
          {recipe.prepTime}
        </Text>
      </View>
      <View style={{ height: 180 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={recipe.directions}
          renderItem={({ item }) => (
            <Text variant="bottomCardContentBody" style={{ marginBottom: 5 }}>
              • {item}
            </Text>
          )}
          />
      </View>
    </View>
  );
}
