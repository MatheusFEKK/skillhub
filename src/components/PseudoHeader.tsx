import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { PseudoHeaderNavigateProps, PseudoHeaderType } from "../types/PseudoHeaderType";
import { StackTypes } from "../types/StackTypes";

interface Props  {
    navigate: keyof StackTypes;
    headerTitle:string | undefined;
    params?: any;
}





export const PseudoHeader: React.FC<Props> = (props) =>{

    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>()

      const navigationHandler = () => {
        try {
                navigation.navigate(props.navigate);
           
        } catch (error) {
            console.error('Navigation error:', error);
            navigation.goBack();
        }
    };



    return(
        <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween , styles.alignItemsCenter, {height:45}]}>
                <TouchableOpacity onPress={navigationHandler}>
                    <Image style={{height: 35, width:35, objectFit:'fill'}} source={require("../images/return.png")} />
                </TouchableOpacity>
                {props.headerTitle ? <Text style={[styles.fontSize3, {fontWeight:"700"}]}>{props.headerTitle}</Text> : <Text style={styles.fontSize4}>N/A</Text>}
                <View style={[{borderWidth: 2, borderRadius: 10, padding:5, borderColor: "#3546B2"}]}>
                    <Image 
                        source={require("../images/SkillHub_Logo_Transparent.png")}
                        style={{width:25, height:25, objectFit: "fill"}}
                    />
                </View>
        </View>
    )
}



