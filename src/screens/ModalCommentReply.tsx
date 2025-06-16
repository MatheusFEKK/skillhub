import { Text, Modal, View, TouchableOpacity, Image } from "react-native";
import { CommentObj } from "../types/CommentObject";
import { styles } from "../styles/GlobalStyles";
import { useEffect } from "react";

export const ModalCommentReply:React.FC<CommentObj> = (props) => {
    useEffect(() => {
        console.log(props.ModalVisible)
    },[props.ModalVisible])
    return(
        <Modal visible={props.ModalVisible} style={[styles.root, styles.container]}>
            <TouchableOpacity onPress={props.ChangeVisibility}>
                    <Image source={require('../images/back-icon.png')} />
                </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}} onPress={props.ChangeVisibility}>
                <Image style={{width:45, height:45, borderRadius:100, objectFit:'fill'}} source={props.ImageUser ? {uri:props.ImageUser} : require('../images/userIcon.png')} />
                <View style={{margin:10, gap:10}}>
                    <View>
                        <Text style={{fontWeight:'bold'}}>{props.Username}</Text>
                        <Text style={{opacity:0.5}}>{props.Realname}</Text>
                    </View>
                    <Text>{props.Comment}</Text>
                </View>
                </TouchableOpacity>
        </Modal>
    );
}