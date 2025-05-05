import { View, Image, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";
import ButtonDark from "../components/ButtonDark";
import ButtonDefault from "../components/ButtonDefault";

const Welcome:React.FC = () => {
    return(
        <View style={[styles.root]}>
            <Image source={require('../images/image1.png')} />
                <View style={styles.WelcomeSquare}>
                    <Image style={{position:'relative', bottom:50}} source={require('../images/IconPlaceHolder.png')} />
                    <View style={[styles.centralizeItems]}>
                        <Text style={styles.TextHeader}>Um lugar para aprender e compartilhar</Text>
                    </View>
                    <View style={styles.centralizeItems}>
                        <View style={[styles.gap3]}>
                            <ButtonDark PlaceHolderButtonDark={"Entrar"} />
                            <ButtonDefault PlaceHolderButtonDefault={"Cadastrar"} />
                        </View>
                    </View>
                </View>
        </View>
    );
}

export default Welcome