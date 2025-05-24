import { Text, View, Image } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import ButtonDefault from "../components/ButtonDefault";
import ButtonDark from "../components/ButtonDark";

const Welcome:React.FC = () => {
    const navigation = useNavigation<NavigationPropStack>();

    return(
        <View style={[styles.container, styles.alignItemsCenter]}>
            <Image style={{position:'absolute', height:'100%'}} source={require('../images/image1.png')} />
            <View style={[styles.containerAccessOption, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <View style={styles.margin5}>

                        <Text style={{fontSize:32, color:'#20202a', fontWeight:'bold'}}>Um lugar para aprender e compartilhar</Text>
                        
                    </View>
                    
                    <View style={[styles.containerButtons, styles.alignItemsCenter, styles.gap3]}>

                        <ButtonDark PlaceHolderButtonDark={"Entrar"} functionButtonDark={() => navigation.navigate("Auth", {userAuth: false})} />
                        
                        <ButtonDefault isDisabled={false} PlaceHolderButtonDefault={"Cadastrar"} functionButtonDefault={() => navigation.navigate("Auth", {userAuth:true})} />

                    </View>  
            </View>
        </View>
    );
}

export default Welcome;