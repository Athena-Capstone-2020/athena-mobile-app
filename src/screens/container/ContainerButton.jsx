import React from "react"
import { StyleSheet } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

import { Text, useTheme, Icon } from "../../components/index"
import { Box } from "../../components/Theme"

const styles = StyleSheet.create({
    button: {
        width: 323,
        height: 121.71,
        borderRadius: 18.21,
    },
    shadow: {
        width: 323,
        height: 121.71,
        borderRadius: 18.21,
        backgroundColor: "white",
        shadowColor: "#656565",
        shadowOffset: {
            width: 18.2,
            height: 18.2,
        },
        shadowOpacity: .56,
        shadowRadius: 17,
        marginBottom: 21.4,
        flexDirection: "row"
    },
    content: {
        width: 323,
        height: 121.71,
        borderRadius: 18.21,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    icon: {
        width: 39.622,
        height: 69.49,
        marginLeft: 17,
    },
    text: {
        width: "auto",
        height: "auto",
        position: "absolute",
        marginLeft: 74.4,
    },
    arrow: {
        width: 6.81,
        height: 11.621,
        marginRight: 32
    },
})

const ContainerButton = ({ container, distributing, style }) => {

    const theme = useTheme()
    const navigation = useNavigation()

    const background = theme.textVariants["container"].background
    const backgroundColor = theme.colors[background]

    const fontColor = theme.textVariants["container"].text
    const color = theme.colors[fontColor]

    return (
        <Box style={styles.shadow}>
            <RectButton
                style={[styles.button, style ? style : "", { backgroundColor }]}
                onPress={distributing ? 
                    () => {} 
                : 
                    () => navigation.navigate("Container", {
                        container
                    })
                }
            >
                {
                    distributing ?
                        <Box style={styles.content}>
                            <Box style={styles.icon}>
                                <Icon name={container.icon} color={container.color} />
                            </Box>
                        </Box>
                    :
                        <Box style={styles.content}>
                            <Box style={styles.icon}>
                                <Icon name={container.icon} color={container.color} />
                            </Box>
                            <Box style={styles.text}>
                                <Text variant="container" style={{ color }}>
                                    {container.label}
                                </Text>
                            </Box>
                            <Box style={styles.arrow}>
                                <ArrowRight style={styles.arrow} />
                            </Box>
                        </Box>
                }
            </RectButton>
        </Box>
    )
}

export default ContainerButton
