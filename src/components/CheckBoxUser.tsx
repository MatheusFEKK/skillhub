import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { styles } from "../styles/GlobalStyles";

interface CheckBoxProps{
    isChecked: boolean;
    OnChangeCheck?: (value:boolean) => void;
    CheckIsDisabled: boolean;
    TextCondition: string;
}

export const UserConditions:React.FC<CheckBoxProps> = (props) => {
    return(
        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.gap2]}>

            <Checkbox style={props.isChecked ? styles.gap1 : styles.borderRadius1} color={props.isChecked ? '#000' : '#7B8499'} disabled={props.CheckIsDisabled} value={props.isChecked} onValueChange={props.OnChangeCheck} />

            <Text style={{fontSize:12, fontWeight:"600", color:'#7B8499'}}>{props.TextCondition}</Text>
        </View>
    );
}

