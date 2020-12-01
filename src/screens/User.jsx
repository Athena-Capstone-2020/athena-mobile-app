import React from 'react'
import { StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import { Button, Box, Text } from '../components/index'
import { useUserContext } from '../global/user-context/useUserContext'
import Svg, { Path, G } from "react-native-svg"

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width,
        height,
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: 50,
        marginTop: 60
    },
    profileName: {
        width: 130,
        height: 30,
        marginTop: 15,
    },
    householdName: {
        width: 150,
        height: 30,
        marginTop: 5,
    },
    iconList: {
        marginTop: 40,
        height: 300,
        width: 300,
        // backgroundColor: 'blue'
    },
    icon: {
        marginBottom: 30,
        width: 200,
        height: 30,
        flexDirection: 'row',
    },
    text: {
        marginLeft: 18
    }
});

const ListIcon = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={17.25}
            height={19.167}
            viewBox="0 0 17.25 19.167"

        >
            <Path
                d="M4.61 0C1.7 0 0 1.706 0 4.629v9.9c0 2.971 1.7 4.638 4.61 4.638h8.032c2.96 0 4.609-1.667 4.609-4.638v-9.9C17.25 1.706 15.6 0 12.641 0z"
                fill="#9796a1"
                opacity={0.4}
            />
            <Path
                data-name="Combined Shape"
                d="M4.149 14.327a.76.76 0 010-.806.751.751 0 01.718-.355h7.514a.757.757 0 010 1.5H4.867a.7.7 0 01-.093.006.75.75 0 01-.625-.345zm.718-4.034a.75.75 0 010-1.5h7.514a.75.75 0 010 1.5zm0-4.332a.748.748 0 110-1.495v-.01h2.867a.752.752 0 010 1.5z"
                fill="#9796a1"
            />
        </Svg>
    )
}
const HouseholdIcon = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={17.25}
            height={17.142}
            viewBox="0 0 17.25 17.142"
        >
            <G data-name="Group 17444">
                <Path
                    d="M6.024 16.09v-2.62a1.254 1.254 0 011.292-1.211h2.609a1.338 1.338 0 01.914.355 1.174 1.174 0 01.379.856v2.62a1.011 1.011 0 00.323.743 1.152 1.152 0 00.79.308h1.78a3.241 3.241 0 002.218-.856 2.843 2.843 0 00.92-2.077V6.743a2.074 2.074 0 00-.813-1.63L10.381.579A2.941 2.941 0 006.8.64L.878 5.112A2.084 2.084 0 000 6.743V14.2a3.044 3.044 0 003.138 2.941h1.74A1.089 1.089 0 006 16.1z"
                    fill="#9796a1"
                    data-name="Group 17442"
                />
            </G>
        </Svg>
    )
}
const HouseholdLogIcon = () => {
    return (
        <Svg
            data-name="Iconly/Bold/Folder"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20.001}
            viewBox="0 0 20 20.001"
        >
            <Path
                data-name="Folder"
                d="M13.75 20H6.24C2.391 20 0 17.606 0 13.75V6.241C0 2.1 1.84 0 5.47 0h1.611A2.956 2.956 0 019.42 1.15l.88 1.17a1.472 1.472 0 001.15.56h3.07a5.446 5.446 0 014 1.361A6.36 6.36 0 0120 8.89v4.87a6.278 6.278 0 01-1.674 4.568A6.3 6.3 0 0113.75 20zm-8.38-8.21a.743.743 0 00-.751.751.751.751 0 00.751.75h9.26a.746.746 0 00.74-.75.737.737 0 00-.74-.751z"
                fill="#9796a1"
            />
        </Svg>
    )
}
const InviteIcon = () => {
    return (
        <Svg
            data-name="Add User"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={19}
            viewBox="0 0 20 19"
        >
            <Path
                data-name="Add User"
                d="M0 15.746c0-2.585 3.454-3.231 7.5-3.231 4.067 0 7.5.669 7.5 3.253S11.545 19 7.5 19C3.434 19 0 18.329 0 15.746zm16.1-5.658V8.911h-1.2a.912.912 0 010-1.823h1.2V5.911a.9.9 0 111.8 0v1.177h1.2a.912.912 0 010 1.823h-1.2v1.177a.9.9 0 11-1.8 0zM2.537 5.027a4.963 4.963 0 119.925 0 4.963 4.963 0 11-9.925 0z"
                fill="#9796a1"
            />
        </Svg>
    )
}
const RenameIcon = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"

        >
            <Path
                data-name="Edit"
                d="M11.28 18a1.023 1.023 0 010-2.047h5.71a1.023 1.023 0 010 2.047zM.848 17.576l-.8-3.451a2.132 2.132 0 01.4-1.8l6.236-8.057a.313.313 0 01.424-.054L9.73 6.3a.846.846 0 00.647.183.945.945 0 00.817-1.043 1.053 1.053 0 00-.329-.635L8.319 2.763a.378.378 0 01-.064-.526l.986-1.28A2.584 2.584 0 0113.03.7l1.475 1.172a3.062 3.062 0 011.146 1.752 2.4 2.4 0 01-.488 2.042L6.377 17.028a2.105 2.105 0 01-1.634.817l-3.5.042a.4.4 0 01-.395-.311z"
                fill="#9796a1"
            />
        </Svg>
    )
}


const User = () => {

    const { state } = useUserContext()
    // console.log(state)

    return (
        <SafeAreaView>
            <Box style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: state.user.photoUrl }}
                />
                <Box style={styles.profileName}>
                    <Text style={{ alignSelf: 'center' }} variant="profileName">{state.user.name}</Text>
                </Box>
                <Box style={styles.householdName}>
                    <Text style={{ alignSelf: 'center' }} variant="householdName">{state.household.name}</Text>
                </Box>
                <Box style={styles.iconList}>
                    <Box style={styles.icon}>
                        <ListIcon />
                        <Text style={styles.text} variant="profileButtonText">Profile List</Text>
                    </Box>
                    <Box style={styles.icon}>
                        <HouseholdIcon />
                        <Text style={styles.text} variant="profileButtonText">Choose Household</Text>
                    </Box>
                    <Box style={styles.icon}>
                        <HouseholdLogIcon />
                        <Text style={styles.text} variant="profileButtonText">Household Log</Text>
                    </Box>
                    <Box style={styles.icon}>
                        <InviteIcon />
                        <Text style={styles.text} variant="profileButtonText">Invite Housemates</Text>
                    </Box>
                    <Box style={styles.icon}>
                        <RenameIcon />
                        <Text style={styles.text} variant="profileButtonText">Rename Household</Text>
                    </Box>
                </Box>
            </Box>
        </SafeAreaView>
    )
}

export default User;