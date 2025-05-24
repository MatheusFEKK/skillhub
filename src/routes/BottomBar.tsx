import { BottomBarTypes } from "../types/BottomBarTypes";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { ProfileUser } from "../screens/Profile";

const BottomBarNav = createBottomTabNavigator();

export type BottomBarProps = BottomTabNavigationProp<BottomBarTypes>

export const BottomBar:React.FC = () => {
    return(
            <BottomBarNav.Navigator  initialRouteName={"Home"} screenOptions={{headerShown:false}} >
                <BottomBarNav.Screen name={"Home"} component={Home}/>
                <BottomBarNav.Screen name={"Profile"} component={ProfileUser}/>
            </BottomBarNav.Navigator>
    );
}
