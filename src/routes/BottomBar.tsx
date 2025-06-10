import { BottomBarTypes } from "../types/BottomBarTypes";
import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, getHeaderTitle } from "@react-navigation/elements";
import { Home } from "../screens/Home";
import { ProfileUser } from "../screens/Profile";
import { Achievements } from "../screens/Achievements";
import { UserOptions } from "../screens/UserOptions";
import { FullPost } from "../screens/FullPost";

export type BottomBarProps = BottomTabNavigationProp<BottomBarTypes, 'Home', 'FullPost'>;


const BottomBarNav = createBottomTabNavigator<BottomBarTypes>();

export const BottomBar: React.FC = () => {
    return (
        <BottomBarNav.Navigator 
            initialRouteName={"Home"} 
            screenOptions={{ headerShown: false }}
        >
            <BottomBarNav.Screen name={"Home"} component={Home} />
            <BottomBarNav.Screen name={"Achievements"} component={Achievements} />
            <BottomBarNav.Screen name={"Profile"} component={ProfileUser} />
            <BottomBarNav.Screen name={"Options"} component={UserOptions} />
        </BottomBarNav.Navigator>
    );
};
