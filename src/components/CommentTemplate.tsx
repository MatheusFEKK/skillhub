import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";

export interface CommentProps{
    UIDUser?:string | undefined | null,
    ImageUser?:() => Promise<string> | undefined | null,
    Username?:string | undefined | null,
    Realname?:string | undefined | null,
    Comment:string | undefined | null,
    CommentOfTheCommentsMany:number,
    MakeModalVisible: () => void;
}

export const CommentTemplate:React.FC<CommentProps> = (props) => {
    const navigation = useNavigation<NavigationPropStack>();

    return (
        <View>
            <TouchableOpacity style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}} onPress={() => navigation.navigate('ViewProfile', {
                            userId:String(props.UIDUser)
                        })}>
                            <Image style={{width:45, height:45, borderRadius:100, objectFit:'fill'}} source={props.ImageUser ? {uri:props.ImageUser} : require('../images/userIcon.png')} />
                            <View style={{margin:10, gap:10}}>
                                <View>
                                    <Text style={{fontWeight:'bold'}}>{props.Username}</Text>
                                    <Text style={{opacity:0.5}}>{props.Realname}</Text>
                                </View>
                                <Text>{props.Comment}</Text>
                            </View>
                            <TouchableOpacity style={{alignItems:'center', justifyContent:'center',width:58, padding:7.5, outlineColor:'#A1A7B9', outlineWidth:1, borderRadius:30, flexDirection:'row'}} onPress={props.MakeModalVisible}>
                            <Image source={require('../images/message-circle.png')} />
                            <Text style={{color:"#A1A7B9"}}>{props.CommentOfTheCommentsMany}</Text>
                        </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}