import { TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { NavigationPropStack } from "../routes/Stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/GlobalStyles";
import ButtonDark from "../components/ButtonDark";
import { SmallerButtonDark } from "../components/ButtonSmallerDark";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/connectionFirebase";
import { db } from "../firebase/connectionFirebase";
import { PostObj } from "../types/PostObject";
import { BottomBarProps } from "../routes/BottomBar";

export const CreatePost:React.FC = () => {
    const [ imageSelected, chooseImage ] = useState();
    const [ textPost, textingThePost ] = useState<string>('');
    const navigationStack = useNavigation<NavigationPropStack>();


    const getTime = () => {
        return new Date().getTime().toString();
    }

    async function CreatePost()
    {
        const PostData:PostObj = {
            IdPost:getTime(),
            UIDUser:auth.currentUser?.uid,
            DescriptionPost: textPost,
            CommentsPost:[],
            Likes:[],
            Deslikes:[],
        }
        
        const newPost = doc(collection(db, "posts"));

        await setDoc(newPost, PostData)
        .then((response) => navigationStack.goBack())
        .catch((response) => Alert.alert("the post is fucked"))
    }
    

    return(
        <View style={[styles.root]}>
            <View style={[styles.m3]}>
                <TouchableOpacity onPress={() => navigationStack.goBack()}>
                    <Image source={require('../images/back-icon.png')} />
                </TouchableOpacity>
            </View>
            <View style={[styles.container, styles.flexDirectionRow]}>
                <Image source={require('../images/userIcon.png')} />
                <TextInput style={[styles.width6]} placeholder={"Compartilhe sua ideia..."} onChangeText={(value) => textingThePost(value)} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.root, styles.alignItemsCenter]} >
                    <View style={[styles.width5,{borderTopWidth:2, borderTopColor:'#C3C8D7'}]}></View>
                    <View style={[styles.width5, styles.flexDirectionRow, styles.justifyContentBetween, styles.p1]}>
                        <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')} />
                        <SmallerButtonDark PlaceHolderButtonSmallerDark={"Postar"} FunctionButtonSmallerDark={() => CreatePost()} />   
                    </View>
            </KeyboardAvoidingView>

        </View>
    );
}