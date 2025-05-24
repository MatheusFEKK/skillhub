import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackTypes } from "../types/StackTypes";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { BottomBarHome } from "../screens/BottomBarHome";


export type NavigationPropStack = NativeStackNavigationProp<StackTypes>

const RootStack = createNativeStackNavigator<StackTypes>();


export const Stack:React.FC = () => {
    const [ userAuthenticated, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user)
            {
              setAuth(true);
            }
            else
            {
                setAuth(false);
            }
          });
    },[])

    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>
                {userAuthenticated ? (
                    <RootStack.Screen  name={"HomeBottomBar"} component={BottomBarHome} />
                ): (
                <RootStack.Screen name={"Auth"} component={AuthScreen}/>
            )
                }
                
            </RootStack.Navigator>
        </NavigationContainer>
    );
}