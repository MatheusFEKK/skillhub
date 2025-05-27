import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "../styles/GlobalStyles";

interface ButtonGroupProps{
    textButton1?:string;
    textButton2?:string;
    functionButton1: (param:number) => void;
    functionButton2: (param:number) => void;
    Activated: number;
}

export const ButtonGroup:React.FC<ButtonGroupProps> = (props) => {
    return(
        <View style={[styles.flexDirectionRow]}>

            <TouchableOpacity style={[styles.buttonDefaultMin, styles.alignItemsCenter, styles.justifyContentCenter, (props.Activated == 0) ? {borderBottomColor:'#54A7F4'}: {borderBottomColor:'#C3C8D7'}]} onPress={() => props.functionButton1(0)}>
                <Text style={[styles.fontSize4, styles.fontWeightMedium]}>{props.textButton1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonDefaultMin, styles.alignItemsCenter, styles.justifyContentCenter, (props.Activated == 1) ? {borderBottomColor:'#54A7F4'}: {borderBottomColor:'#C3C8D7'}]} onPress={() => props.functionButton2(1)}>
                <Text style={[styles.fontSize4, styles.fontWeightMedium]}>{props.textButton2}</Text>
            </TouchableOpacity>

        </View>
    );
}