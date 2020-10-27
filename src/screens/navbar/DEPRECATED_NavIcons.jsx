import React from "react";
import { HomeIcon, ContainerIcon, AddItemIcon, GroceryListIcon, UserIcon } from '../../components/index'

const NavIcons = ({ name, color }) => {
    if (name == 'Home') {
        return <HomeIcon color={color} />;
    }
    if (name == 'ContainerList') {
        return <ContainerIcon color={color} />
    }
    if (name == 'AddItem') {
        return <AddItemIcon color={color} />
    }
    if (name == 'GroceryList') {
        return <GroceryListIcon color={color} />
    }
    if (name == 'User') {
        return <UserIcon color={color} />
    }
    return null;
}

export default NavIcons;