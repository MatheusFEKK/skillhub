import { Text, View, ScrollView } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import ButtonDark from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import { BottomBarProps } from "../routes/BottomBar";
import { Button } from "react-native";
import PseudoHeader from "../components/Header";

export const ProfileUser:React.FC = () => {


    const signOutUser = async () => {
        try{
            await signOut(auth)
            console.log("Disconnect from the account!");
        }catch(error)
        {
            console.log("It was not possible to log out from the app! " + error);
        }
    }
    const navigation = useNavigation<BottomBarProps>();

    return(
        <View style={[styles.root]}>
            
            <ScrollView>
                <View style={[styles.container, styles.mV2]}>
                    <ButtonDark PlaceHolderButtonDark="Desconectar" FunctionButtonDark={() => signOutUser()} />
                        <Button title="Retornar" onPress={()=>{
                            navigation.navigate("Home");
                        }}/>
                </View>
            </ScrollView>
        </View>
    )
}