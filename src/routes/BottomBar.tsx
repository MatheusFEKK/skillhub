import { BottomBarTypes } from "../types/BottomBarTypes";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { ProfileUser } from "../screens/Profile";
import { Achievements } from "../screens/Achievements";
import { UserOptions } from "../screens/UserOptions";
import { Image, TouchableOpacity, View } from "react-native";
import { SearchScreen } from "../screens/Search";
import { CreatePost } from "../screens/CreatePost";
import { NavigationPropStack, Stack } from "./Stack";
import { useNavigation } from "@react-navigation/native";

export type BottomBarProps = BottomTabNavigationProp<BottomBarTypes, 'Home', 'FullPost'>;

const BottomBarNav = createBottomTabNavigator<BottomBarTypes>();

export const BottomBar: React.FC = () => {
    const navigation = useNavigation<NavigationPropStack>();
    return (
        <BottomBarNav.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false, tabBarShowLabel:false}}>
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
            <BottomBarNav.Screen name={"Search"} component={SearchScreen} options={{tabBarIcon: ({size, focused}) => {
                 const IconSize = size * 1.2;

                return (
                    <View style={{alignItems:'center',width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                       {focused == true ?
                       <View style={{alignItems:'center', width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/search-focused.png')} />
                            
                            <Image source={require('../images/BottomBarImages/focused.png')} />
                        </View>
                        : 
                        <View>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/search-unfocused.png')} />
                        </View>
                    }
                    </View>
                );
            }}}/>
            <BottomBarNav.Screen name={"Stack"} component={Stack} options={{tabBarButton: () => {
                return (
                    <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('CreatePost')}>
                        <Image style={{width:50, height:50}} source={require('../images/BottomBarImages/createpost-icon.png')} />
                    </TouchableOpacity>
                );
            }}} />
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
            <BottomBarNav.Screen name={"Options"} component={UserOptions} options={{tabBarIcon: ({size, focused}) => {
                const IconSize = size * 1.2;
                
                return (
                    <View style={{alignItems:'center',width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                       {focused == true ?
                       <View style={{alignItems:'center', width:IconSize, height:IconSize, margin:'auto', gap:5}}>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/menu-focused.png')} />
                            
                            <Image source={require('../images/BottomBarImages/focused.png')} />
                        </View>
                        : 
                        <View>
                            <Image style={{width:IconSize, height:IconSize}} source={require('../images/BottomBarImages/menu-unfocused.png')} />
                        </View>
                    }
                    </View>
                );
            }}}/>
        </BottomBarNav.Navigator>
    );
};
