import { TouchableOpacity, Text, Button } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { ButtonType } from "../types/ButtonType";

const ButtonDefault:React.FC<ButtonType> = (props) => {
    return(
        <>
            <TouchableOpacity style={[styles.buttonDefault, styles.borderRadius3]}>
                <Text style={[{fontWeight:'bold', color:'white'}, styles.fontSize2]}>{props.ButtonPlaceHolder}</Text>
            </TouchableOpacity>
        </>
    );
}

export default ButtonDefault;