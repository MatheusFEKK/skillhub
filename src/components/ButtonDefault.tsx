import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface ButtonDefaultProps{
    PlaceHolderButtonDefault:string
}

const ButtonDefault:React.FC<ButtonDefaultProps> = (props) => {
    return(
        <>
            <TouchableOpacity style={[styles.buttonDefault, styles.borderRadius3]}>
                <Text style={[{fontWeight:'bold', color:'white'}, styles.fontSize2]}>{props.PlaceHolderButtonDefault}</Text>
            </TouchableOpacity>
        </>
    );
}

export default ButtonDefault;