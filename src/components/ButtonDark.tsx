import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface ButtonDarkProps{
    PlaceHolderButtonDark:string
}

const ButtonDark:React.FC<ButtonDarkProps> = (props) => {
    return(
        <>
            <TouchableOpacity style={[styles.buttonDark, styles.borderRadius3]}>
                <Text style={[{fontWeight:'bold', color:'white'}, styles.fontSize2]}>{props.PlaceHolderButtonDark}</Text>
            </TouchableOpacity>
        </>
    );
}

export default ButtonDark;