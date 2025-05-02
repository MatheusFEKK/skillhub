import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

const ButtonLoginGoogle:React.FC = () => {
    return(
        <TouchableOpacity style={[styles.buttonLoginGoogle, styles.borderRadius2, styles.gap2]}>
            <Image source={require('../images/devicon_google.png')} />
            <Text style={[{fontWeight:'bold'}, styles.fontSize1]}>Entre com o Google</Text>
        </TouchableOpacity>
    );
}

export default ButtonLoginGoogle;