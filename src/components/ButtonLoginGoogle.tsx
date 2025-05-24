import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface ButtonLoginGoogle{
    functionLoginGoogle: () => void;
}

const ButtonLoginGoogle:React.FC<ButtonLoginGoogle> = (props) => {
    return(
        <TouchableOpacity style={[styles.buttonLoginGoogle, styles.borderRadius2, styles.gap2]} onPress={props.functionLoginGoogle}>
            <Image source={require('../images/devicon_google.png')} />
            <Text style={[{fontWeight:'bold'}, styles.fontSize3]}>Entre com o Google</Text>
        </TouchableOpacity>
    );
}

export default ButtonLoginGoogle;