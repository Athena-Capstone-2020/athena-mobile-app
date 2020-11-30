import React from "react";
import { Card } from "../../components";
import { Box, Text } from "../../components/Theme";

/**
 *
 * @param {{ title: string, imageUri: string }} props
 */
export default function ExpireCard(props) {
  return (
    <Card
      cardStyle={{
        textAlign: "left",
        marginVertical: 20,
        marginHorizontal: 10,
      }}
      imageUri={props.imageUri}
      bottomContent={<ExpireCardContent {...props} />}
    />
  );
}

function ExpireCardContent(props) {
  const style = {
    title: {
      textAlign: "center",
      margin: 10,
    },
  };

  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={1}
      allowFontScaling={true}
      variant="body"
      style={style.title}
    >
      {props.title}
    </Text>
  );
}
