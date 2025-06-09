import { TextInput, View, Image, ImageSourcePropType, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface InputUserProps{
    PlaceHolderInputUser?: string,
    ImageInputUser: ImageSourcePropType;
    textInsert: (param:string) => void;
    inputSecure: boolean;
    autoCapitalize: "none" | "sentences" | "words";
    valueInput?: string;
    maxLength?: number;
    disable?: boolean
}

const InputUser:React.FC<InputUserProps> = (props) => {


    return(
        <View style={[styles.inputUser ,styles.flexDirectionRow, styles.borderRadius2, {height: 56}]}>
            <Image style={styles.inputIcons} source={props.ImageInputUser} />
            <TextInput editable={props?.disable != undefined ? false : props.disable} style={{flex:1}} placeholderTextColor={'#20202A'} placeholder={props.PlaceHolderInputUser} onChangeText={props.textInsert} value={props.valueInput} secureTextEntry={props.inputSecure} autoCapitalize={props.autoCapitalize} maxLength={props.maxLength} />
        </View>
    );
}

export default InputUser;