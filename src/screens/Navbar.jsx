import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ContainerList from '../screens/container/ContainerList';
import AddItem from './AddItem';
import GroceryList from './GroceryList';
import Home from './Home';
import User from './User';

const Navbar = () => {

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={() => ({
                tabBarIcon: () => {
                    return (
                        <AntDesign name="appstore-o" size={24} color="black" />
                    );
                },
            })}>
                <Tab.Screen name="Home" component={Home} options={{}}/>
                <Tab.Screen name="ContainerList" component={ContainerList} />
                <Tab.Screen name="AddItem" component={AddItem} />
                <Tab.Screen name="GroceryList" component={GroceryList} />
                <Tab.Screen name="User" component={User} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default Navbar;