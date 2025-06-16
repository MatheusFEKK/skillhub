import { TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, Alert, Text } from "react-native";
import { NavigationPropStack } from "../routes/Stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "../styles/GlobalStyles";
import { SmallerButtonDark } from "../components/ButtonSmallerDark";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/connectionFirebase";
import { db } from "../firebase/connectionFirebase";
import { ImagePickerComponent } from "../components/GalleryAccess";
import * as ImagePicker from 'expo-image-picker';
import { UploadFile } from "../storage/uploadFile";
import { v4 as uuid } from 'uuid'
import usePostHome from "../hooks/Posts";

interface PostData{
    IdPost:string,
    UIDUser:string | undefined,
    DescriptionPost: string,
    ImagePost: string | null,
    Likes:[],
    Deslikes:[],
}

export const CreatePost:React.FC = () => {
    const [ image, setImage ] = useState<ImagePicker.ImagePickerSuccessResult | null>(null);
    const [ imageType, setImageType ] = useState<string | undefined>(undefined);
    const [ textPost, textingThePost ] = useState<string>('');
    const [ GalleryVisible, setGallery ] = useState(false);
    const { getAllPosts, imageUser } = usePostHome();
    const navigationStack = useNavigation<NavigationPropStack>();

    const getTime = () => {
        return new Date().getTime().toString();
    }

    async function CreatePost()
    {
        console.log("Creating post")
        const randomNameFile = uuid() + '.jpg';

        const postID = getTime();


        if (image != null)
        {
            await UploadFile(image.assets[0].uri, randomNameFile)
            
        }
        const PostData:PostData = {
            IdPost:postID,
            UIDUser:auth.currentUser?.uid,
            DescriptionPost: textPost,
            ImagePost: image != null ? randomNameFile : null,
            Likes:[],
            Deslikes:[],
        }
        
        const newPost = doc(collection(db, "posts"), postID);

        await setDoc(newPost, PostData)
        .then(async(response) => {
            navigationStack.goBack();
        })
        .catch((response) => Alert.alert("Failed on posting" + response))
        


    }
    
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64:false,
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            allowsEditing:false,
            aspect: [4,3],
            quality: 1,
        });
        
        console.log(result);
        
        if (!result.canceled)
            {
                setImage(result);
            }

        };
    

    return(
        <View style={[styles.root]}>
            <View style={[styles.m3]}>
                <TouchableOpacity onPress={() => navigationStack.goBack()}>
                    <Image source={require('../images/back-icon.png')} />
                </TouchableOpacity>
            </View>
            <View style={[styles.container, styles.flexDirectionRow]}>
                <Image style={{width:45, height:45, borderRadius:100, objectFit:'fill'}} source={imageUser ? {uri:imageUser} : require('../images/userIcon.png')} />
                <TextInput style={[styles.width6]} placeholder={"Compartilhe sua ideia..."} onChangeText={(value) => textingThePost(value)} />
            </View>
            <ImagePickerComponent VisibilityGallery={GalleryVisible} ChangeVisibility={() => setGallery(false)}/>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.root, styles.alignItemsCenter]} >
                    <View style={[styles.width5,{borderTopWidth:2, borderTopColor:'#C3C8D7'}]}></View>
                    <View style={[styles.width5, styles.flexDirectionRow, styles.justifyContentBetween, styles.p1]}>
                        <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')} FunctionOnPress={() => pickImage()} />

                        
            <SmallerButtonDark PlaceHolderButtonSmallerDark={"Postar"} FunctionButtonSmallerDark={async() => await CreatePost()} />   
                    </View>
            </KeyboardAvoidingView>

                        {image && 
                        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, {position:'absolute', bottom:70}]}> 
                            <Text style={styles.fontWeightBold}>Selected Images</Text>
                            <Image source={{uri:image.assets[0].uri}} width={50} height={50}/> 
                        </View>}
        </View>
    );
}