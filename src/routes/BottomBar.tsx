import { BottomBarTypes } from "../types/BottomBarTypes";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, getHeaderTitle } from "@react-navigation/elements";
import { Home } from "../screens/Home";
import { ProfileUser } from "../screens/Profile";
import { Achievements } from "../screens/Achievements";

export type BottomBarProps = BottomTabNavigationProp<BottomBarTypes>;

const BottomBarNav = createBottomTabNavigator<BottomBarTypes>();

export const BottomBar: React.FC = () => {
    return (
        <BottomBarNav.Navigator 
            initialRouteName={"Achievements"} 
            screenOptions={{ headerShown: false }}
        >
            <BottomBarNav.Screen name={"Home"} component={Home} />
            <BottomBarNav.Screen name={"Achievements"} component={Achievements} />
            <BottomBarNav.Screen name={"Profile"} component={ProfileUser} />
        </BottomBarNav.Navigator>
    );
};
