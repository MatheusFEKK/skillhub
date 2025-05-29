import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface SmallerButtonDarkProps{
    PlaceHolderButtonSmallerDark:string
    FunctionButtonSmallerDark?: () => void; 
}

export const SmallerButtonDark:React.FC<SmallerButtonDarkProps> = (props) => {
    return(
        <>
            <TouchableOpacity style={[styles.buttonSmallerDark, styles.borderRadius3]} onPress={props.FunctionButtonSmallerDark}>
                 <Text style={[{fontWeight:'bold', color:'white'},  styles.fontSize2]}>{props.PlaceHolderButtonSmallerDark}</Text>
            </TouchableOpacity>
        </>
    );
}