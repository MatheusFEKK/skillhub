import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import { doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/connectionFirebase";
import { useEffect, useState } from "react";
import fetchImageProfile from "../storage/fetchImageProfile";



export interface CommentProps{
    IdPost:string | undefined | null;
    IdComment:string | undefined | null;
    UIDUser?:string | undefined | null;
    ImageUser?:string | undefined | null;
    Username?:string | undefined | null;
    Realname?:string | undefined | null;
    Comment:string | undefined | null;
    MakeModalVisible: () => void;
    CommentsOfComment: number | undefined | null;
    Identifier:number;
}

export const CommentOfComponentTemplate:React.FC<CommentProps> = (props) => {
    const navigation = useNavigation<NavigationPropStack>();
    const [ replys, setReplys ] = useState<number | undefined>(0);
    const [ ImageUser, setImageUser ] = useState<string>()

    const getCommentId = async () =>
       {
        if (props.IdPost)
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
       }

       getCommentId();

       useEffect(() => {
        const fetch = async () => {
            await getCommentId();
            if (props.ImageUser)
            {
                setImageUser(await fetchImageProfile(props.ImageUser))
            }
        }
        fetch();
        console.log("Image of the user " + props.ImageUser)
       },[])

    return (
        <View style={[styles.root, styles.container, {height:'auto', marginLeft: props.Identifier > 0 ? 30 * props.Identifier : 0}]}>
            <TouchableOpacity style={{alignSelf:'flex-start', width:'100%', flexDirection:'row', alignItems:'center'}} onPress={() => navigation.navigate('ViewProfile', {
                            userId:String(props.UIDUser)
                        })}>
                            <Image style={{width:45, height:45, borderRadius:100, objectFit:'fill'}} source={ImageUser ? {uri:ImageUser} : require('../images/userIcon.png')} />
                            <View style={{margin:10, gap:10}}>
                                <View>
                                    <Text style={{fontWeight:'bold'}}>{props.Username}</Text>
                                    <Text style={{opacity:0.5}}>{props.Realname}</Text>
                                </View>
                                <Text>{props.Comment}</Text>
                            </View>
            </TouchableOpacity>
                        <TouchableOpacity style={{alignItems:'center', justifyContent:'center',width:58, padding:7.5, outlineColor:'#A1A7B9', outlineWidth:1, borderRadius:30, flexDirection:'row'}} onPress={props.MakeModalVisible}>
                            <Image source={require('../images/message-circle.png')} />
                            <Text style={{color:"#A1A7B9"}}>{props.CommentsOfComment}</Text>
                        </TouchableOpacity>
        </View>
    );
}