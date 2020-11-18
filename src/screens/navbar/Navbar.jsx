import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTheme } from '../../components/Theme';
import { Icon } from '../../components/index'
import AddItem from '../additem/AddItem';
import ContainerList from '../container/ContainerList';
import GroceryList from '../GroceryList';
import { Home } from '../home';
import User from '../User';
import { useUserContext } from '../../global/user-context'

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
                        return <Icon name={route.name} color={focused ? primary : grey} />;
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