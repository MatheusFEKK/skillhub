import { TextInput, View, Image } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface InputUserProps{
    PlaceHolderInputUser:string,
    ImageInputUser:string
}

const InputUser:React.FC<InputUserProps> = (props) => {
    return(
        <View style={[styles.inputUser, styles.borderRadius2, styles.padding1]}>
            <Image source={props.ImageInputUser} />
            <TextInput style={{flex:1}} placeholderTextColor={'#20202A'} placeholder={props.PlaceHolderInputUser} />
        </View>
    );
}

export default InputUser;