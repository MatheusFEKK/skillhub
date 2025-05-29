import { Text, View } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import ButtonDark from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";

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
    return(
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                
            </View>
            <View style={[styles.container, styles.mV2]}>
                <ButtonDark PlaceHolderButtonDark="Desconectar" functionButtonDark={() => signOutUser()} />
            </View>
        </View>
    )
}