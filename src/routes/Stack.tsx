import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";

type StackList = {
    Welcome: undefined;
    Access: undefined;
    Home: undefined
}

export type StackType = NativeStackNavigationProp<StackList>;

const Stack = createNativeStackNavigator<StackList>();

const StackComponent:React.FC = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Welcome"} component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackComponent;