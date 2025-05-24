import { TouchableOpacity, Text, Button } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { ButtonType } from "../types/ButtonType";

interface ButtonDefaultProps{
    PlaceHolderButtonDefault:string;
    functionButtonDefault?: () => void;
    isDisabled?: boolean;
}

const ButtonDefault:React.FC<ButtonDefaultProps> = (props) => {
    return(
        <>
            <TouchableOpacity style={[styles.buttonDefault, styles.borderRadius3, {backgroundColor:props.isDisabled == false ? '#395DD3' : '#A1A7B9'}]} onPress={props.functionButtonDefault} disabled={props.isDisabled}>
                <Text style={[{fontWeight:'bold', color:'white'}, styles.fontSize4]}>{props.PlaceHolderButtonDefault}</Text>
            </TouchableOpacity>
        </>
    );
}

export default ButtonDefault;