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

export type NavigationPropStack = NativeStackNavigationProp<StackTypes>

export type NavigationScreenProp = NativeStackScreenProps<StackTypes, 'FullPost'>;

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

            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {userAuthenticated ? 
                (
                    <>
                        <RootStack.Screen name={"BottomBar"} component={BottomBar} />
                        <RootStack.Screen name={"Achievements"} component={Achievements} />
                        <RootStack.Screen name={"Options"} component={UserOptions} />
                        <RootStack.Screen name={"CreatePost"} component={CreatePost} />
                        <RootStack.Screen name={"FullPost"} component={FullPost} />
                        <RootStack.Screen name={"Home"} component={Home} />
                        <RootStack.Screen name={"Profile"} component={ProfileUser} />
                    </>
                ) : (
                    <>
                        <RootStack.Screen name={"Welcome"} component={Welcome} />
                        <RootStack.Screen name={"Auth"} component={AuthScreen} />
                    </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}