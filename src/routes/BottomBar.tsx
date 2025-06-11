import { BottomBarTypes } from "../types/BottomBarTypes";
import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, getHeaderTitle } from "@react-navigation/elements";
import { Home } from "../screens/Home";
import { ProfileUser } from "../screens/Profile";
import { Achievements } from "../screens/Achievements";
import { UserOptions } from "../screens/UserOptions";
import { FullPost } from "../screens/FullPost";
import { Image, View } from "react-native";

export type BottomBarProps = BottomTabNavigationProp<BottomBarTypes, 'Home', 'FullPost'>;


const BottomBarNav = createBottomTabNavigator<BottomBarTypes>();

export const BottomBar: React.FC = () => {
    return (
        <BottomBarNav.Navigator 
            initialRouteName={"Home"} 
            screenOptions={{ headerShown: false, tabBarShowLabel:false}}
        >
            <BottomBarNav.Screen name={"Home"} component={Home} options={{tabBarIcon: ({size, focused}) => {
                const IconSize = size * 1.2;
                return (
                    <View style={{alignItems:'center',width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                        {focused == true ?
                       <View style={{alignItems:'center', width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/home-focused.png')} />
                            
                            <Image source={require('../images/BottomBarImages/focused.png')} />
                        </View>
                        : 
                        <View>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/home-unfocused.png')} />
                        </View>
                    }
                    </View>
                );
            }}}/>
            <BottomBarNav.Screen name={"Achievements"} component={Achievements} />
            <BottomBarNav.Screen name={"Profile"} component={ProfileUser} options={{tabBarIcon: ({size, focused}) => {
                const IconSize = size * 1.2;

                return (
                    <View style={{alignItems:'center',width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                       {focused == true ?
                       <View style={{alignItems:'center', width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/person-focused.png')} />
                            
                            <Image source={require('../images/BottomBarImages/focused.png')} />
                        </View>
                        : 
                        <View>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/person-unfocused.png')} />
                        </View>
                    }
                    </View>
                );
            }}}/>
            <BottomBarNav.Screen name={"Options"} component={UserOptions} />
        </BottomBarNav.Navigator>
    );
};
