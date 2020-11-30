import React from "react";
import { Card } from "../../components";
import { Recipe } from "../../models/Recipe";
import { Box, Text } from "../../components/Theme";
import { FlatList, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

/**
 *
 * @param {{recipe: Recipe }} props
 */
export function RecipeCard(props) {
  return (
    <Card
      imageUri={props.recipe.photoURI}
      width={250}
      height={340}
      bottomContent={<RecipeCardBottomContent {...props} />}
      cardStyle={{ margin: 10 }}
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginHorizontal: 5,
          marginVertical: 10,
        }}
      >
        <Icon name="users" size={15} color="gray" />
        <Text variant="bottomCardContentBody">{` ${recipe.servingSize}`}</Text>
        <Icon
          name="clock"
          size={15}
          color="gray"
          style={{ marginLeft: "auto" }}
        />
        <Text variant="bottomCardContentBody">{` ${recipe.prepTime}`}</Text>
      </View>
      <View style={{ height: 150 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={recipe.directions}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
              }}
            >
              <Icon
                name="circle"
                solid
                size={5}
                color="gray"
                style={{ margin: "auto", paddingTop: 7, paddingRight: 5 }}
              />
              <Text variant="bottomCardContentBody">{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
