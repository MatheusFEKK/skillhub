import { Text, Modal, View, TouchableOpacity, Image, TextInput } from "react-native";
import { CommentObj } from "../types/CommentObject";
import { styles } from "../styles/GlobalStyles";
import { useEffect, useState } from "react";
import usePostHome from "../hooks/Posts";
import { SmallerButtonDark } from "../components/ButtonSmallerDark";
import { doc, getDoc, collection, getDocs, where, query } from "firebase/firestore";
import { auth, db } from "../firebase/connectionFirebase";


export const ModalCommentReply:React.FC<CommentObj> = (props) => {
    const { CommentInAComment} = usePostHome();
    const [ newComment, setComment ] = useState<string>('');
    const [ replys, setReplys ] = useState<number | undefined>();

      const getCommentId = async () =>
    {
        const postRef = doc(db, 'posts', props.IdPost);

        const dataSnapshot = await getDoc(postRef);

        if (dataSnapshot.exists())
        {
            const commentRef = collection(postRef, 'Comments')

            const commentQuery = query(commentRef, where('IdComment', '==', props.IdComment));

            const commentSnapshot = await getDocs(commentQuery);

            setReplys(commentSnapshot.size)
        }

    }

    
    useEffect(() => {
        console.log(props.ModalVisible)
        getCommentId();
        
        console.log("O post tem " + replys + " respostas");
        
    },[props.ModalVisible])

    useEffect(() => {
        console.log("esse é o id do comentário " + props.IdComment)
    },[props.IdComment])
    return(
        <Modal visible={props.ModalVisible} style={[styles.root, styles.container, styles.defaultRootBackground]}>
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
                <View>
                    <TextInput placeholder="Escreva seu comentário" value={newComment} onChangeText={(value) => setComment(value)} />
                    <SmallerButtonDark PlaceHolderButtonSmallerDark="Comentar" FunctionButtonSmallerDark={() => CommentInAComment(props.IdPost, auth.currentUser?.uid, props.IdComment, newComment)} />
                </View>
        </Modal>
    );
}