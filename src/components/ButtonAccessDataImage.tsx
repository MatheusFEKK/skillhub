import { View, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface ButtonAccessProps{
    AccessButtonImage:ImageSourcePropType;
    FunctionOnPress:() => void;
}

export const AccessDataImage:React.FC<ButtonAccessProps> = (props) => {
    return(
        <View style={[styles.borderRadius3, styles.backgroundTransparent, styles.alignItemsCenter, styles.justifyContentCenter, styles.m2,{borderWidth:2, borderColor:'#C3C8D7', width:32, height:32}]}>
            <TouchableOpacity onPress={props.FunctionOnPress}>
                <Image source={props.AccessButtonImage} />
            </TouchableOpacity>
        </View>
    );
}