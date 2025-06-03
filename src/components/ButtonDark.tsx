import { TouchableOpacity, Text, Button } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { ButtonType } from "../types/ButtonType";

interface ButtonDarkProps{
    PlaceHolderButtonDark:string
    FunctionButtonDark?: () => void; 
}

const ButtonDark:React.FC<ButtonDarkProps> = (props) => {
    return(
        <>
            <TouchableOpacity style={[styles.buttonDark, styles.borderRadius3]} onPress={props.FunctionButtonDark}>
                <Text style={[{fontWeight:'bold', color:'white'},  styles.fontSize4]}>{props.PlaceHolderButtonDark}</Text>
            </TouchableOpacity>
        </>
    );
}

export default ButtonDark;