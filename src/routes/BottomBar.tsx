import { BottomBarTypes } from "../types/BottomBarTypes";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, getHeaderTitle } from "@react-navigation/elements";
import { Home } from "../screens/Home";
import { ProfileUser } from "../screens/Profile";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export type BottomBarProps = BottomTabNavigationProp<BottomBarTypes>;

const BottomBarNav = createBottomTabNavigator<BottomBarTypes>();


export const BottomBar: React.FC = () => {
    

    return (
        <BottomBarNav.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }} >
            <BottomBarNav.Screen name={"Home"} component={Home} />
            <BottomBarNav.Screen options={
                {
                    headerShown: false
                }
            }
                name={"Profile"} component={ProfileUser} />
        </BottomBarNav.Navigator>

    );
}
