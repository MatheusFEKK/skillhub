import { Text, View, Image } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import ButtonDefault from "../components/ButtonDefault";
import ButtonDark from "../components/ButtonDark";

const Welcome: React.FC = () => {
    const navigation = useNavigation<NavigationPropStack>();

    return (
        <View style={[styles.root, styles.alignItemsCenter]}>
            <Image style={{ position: 'absolute', height: '50%' }} source={require('../images/LoginSplashScreen.png')} />
            <View style={[styles.containerAccessOption]}>
                <View style={[styles.container, styles.alignItemsCenter]}>
                    <Image 
                    style={[styles.absolute, {top:-50}]}
                    source={require('../images/IconPlaceHolderMaxHeightWidth.png')}
                    
                    />
                </View>
                <View style={[styles.container, styles.mH5]}>
                    <Text style={{ fontSize: 32, color: '#20202a', fontWeight: '900' }}>Um lugar para aprender</Text>
                    <Text style={{ fontSize: 32, color: '#20202a', fontWeight: '900' }}>E compartilhar</Text>
                </View>

                <View style={[styles.container, styles.gap3]}>

                    <ButtonDark PlaceHolderButtonDark={"Entrar"} FunctionButtonDark={() => navigation.navigate("Auth")} />

                    <ButtonDefault isDisabled={false} PlaceHolderButtonDefault={"Cadastrar"} functionButtonDefault={() => navigation.navigate("Auth")} />

                </View>
            </View>
        </View>
    );
}

export default Welcome;