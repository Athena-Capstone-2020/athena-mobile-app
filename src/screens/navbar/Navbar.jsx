import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useTheme } from '../../components/Theme';
import AddItem from '../additem/AddItem';
import ContainerList from '../container/ContainerList';
import GroceryList from '../GroceryList';
import Home from '../Home';
import User from '../User';
import NavIcons from './NavIcons';

const Navbar = () => {

    const Tab = createBottomTabNavigator();
    const theme = useTheme();
    const { primary, grey } = theme.colors;

    return (
        <NavigationContainer 
            independent={true}
        >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        let iconColor;

                        if (route.name === 'Home') {
                            iconName = "Home";
                            iconColor = focused ? primary : grey;
                        }
                        else if (route.name === 'ContainerList') {
                            iconName = 'ContainerList';
                            iconColor = focused ? primary : grey;
                        } else if (route.name === 'AddItem') {
                            iconName = 'AddItem';
                            iconColor = focused ? primary : grey;
                        } else if (route.name === 'GroceryList') {
                            iconName = 'GroceryList';
                            iconColor = focused ? primary : grey;
                        } else if (route.name === 'User') {
                            iconName = 'User';
                            iconColor = focused ? primary : grey;
                        }
                        return <NavIcons name={iconName} color={iconColor} />;
                    },
                })}
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        padding: 15
                    }
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="ContainerList" component={ContainerList} />
                <Tab.Screen name="AddItem" component={AddItem} />
                <Tab.Screen name="GroceryList" component={GroceryList} />
                <Tab.Screen name="User" component={User} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default Navbar;