import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import ButtonDark from "../components/ButtonDark";
import { BottomBarProps } from "../routes/BottomBar";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";

const PseudoHeader = (voltar:string)=>{
    
    const navigation = useNavigation<BottomBarProps>();

    return(
        <View style={[styles.container,styles.headerHead,styles.pV2]}>
            <TouchableOpacity>
                <Image 
                source={require("../images/return.png")}
                style={{width:36, height:36}}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PseudoHeader;