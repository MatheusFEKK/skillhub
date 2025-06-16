import { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackTypes } from "../types/StackTypes";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { BottomBar } from "./BottomBar";
import Welcome from "../screens/Welcome";
import { CreatePost } from "../screens/CreatePost";
import { Achievements } from "../screens/Achievements";
import { UserOptions } from "../screens/UserOptions";
import { ProfileUser } from "../screens/Profile";
import { FullPost } from "../screens/FullPost";
import { Home } from "../screens/Home";
import { ViewProfile } from "../screens/ViewProfile";

export type NavigationPropStack = NativeStackNavigationProp<StackTypes>

export type NavigationScreenProp = NativeStackScreenProps<StackTypes, 'FullPost'>;
export type NavigationScreenViewProfileProp = NativeStackScreenProps<StackTypes, 'ViewProfile'>;

const RootStack = createNativeStackNavigator<StackTypes>();

export const Stack: React.FC = () => {
    const [userAuthenticated, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuth(true);
                console.log("Auth state changed to true");
            }
            else {
                setAuth(false);
                console.log("Auth state changed to false");
            }
        });
    }, [])

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>
                {userAuthenticated ? (
                    <RootStack.Screen name={"BottomBar"} component={BottomBar} />
                ): (
                    <>
                        <RootStack.Screen  name={"Welcome"} component={Welcome} />
                        <RootStack.Screen name={"Auth"} component={AuthScreen}/>
                        <RootStack.Screen name={"Options"} component={UserOptions}/>
                    </>
                )
            }
            <RootStack.Screen name={"ViewProfile"} component={ViewProfile} />
            <RootStack.Screen name={"Home"} component={BottomBar} />
            <RootStack.Screen name={"Profile"} component={ProfileUser}/>
            <RootStack.Screen name={"Achievement"} component={Achievements}/>
            <RootStack.Screen name={"CreatePost"} component={CreatePost} />
            <RootStack.Screen name={"FullPost"} component={FullPost} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}