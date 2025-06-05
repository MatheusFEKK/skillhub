import { TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, Alert, Text } from "react-native";
import { NavigationPropStack } from "../routes/Stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/GlobalStyles";
import { SmallerButtonDark } from "../components/ButtonSmallerDark";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/connectionFirebase";
import { db } from "../firebase/connectionFirebase";
import { ImagePickerComponent } from "../components/GalleryAccess";
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';

interface PostData{
    IdPost:string,
    UIDUser:string | undefined,
    DescriptionPost: string,
    ImagePost: string | null,
    CommentsPost:[],
    Likes:[],
    Deslikes:[],
}

export const CreatePost:React.FC = () => {
    const [ image, setImage ] = useState<string | null>(null);
    const [ textPost, textingThePost ] = useState<string>('');
    const navigationStack = useNavigation<NavigationPropStack>();
    const [ GalleryVisible, setGallery ] = useState(false);

    const getTime = () => {
        return new Date().getTime().toString();
    }

    const UploadFile = async (filePath:string) => {
    const randomKeyFile = uuid();
    const response = await fetch(filePath);

    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append('sendFile', '1');
    formData.append('uploadFile', imageBlob, randomKeyFile+".jpeg");
    formData.append('jsonData', JSON.stringify(randomKeyFile));
    console.log(formData);

    const URL:string = 'http://10.75.45.30/storageServer/receiveFile.php'
    
        const uploadResponse = await fetch (URL, {
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        });

        if (uploadResponse.ok)
        {
            const responseText = await uploadResponse.text();
            console.log("Uploaded with success " + responseText);
        }else{
            console.log("Upload failed " + uploadResponse.statusText);
        }
    }

    async function CreatePost()
    {
        const PostData:PostData = {
            IdPost:getTime(),
            UIDUser:auth.currentUser?.uid,
            DescriptionPost: textPost,
            ImagePost: String(image),
            CommentsPost:[],
            Likes:[],
            Deslikes:[],
        }
        
        const newPost = doc(collection(db, "posts"));

        
        await setDoc(newPost, PostData)
        .then((response) => navigationStack.goBack())
        .catch((response) => Alert.alert("Failed on posting" + response))

        if (image !== null)
        {
            await UploadFile(image)
            
        }else
        {
            return;
        }
    }
    
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            allowsEditing:false,
            aspect: [4,3],
            quality: 1,
        });
        
        console.log(result);
        
        if (!result.canceled)
            {
                setImage(result.assets[0].uri);
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
                <Image source={require('../images/userIcon.png')} />
                <TextInput style={[styles.width6]} placeholder={"Compartilhe sua ideia..."} onChangeText={(value) => textingThePost(value)} />
            </View>
            <ImagePickerComponent VisibilityGallery={GalleryVisible} ChangeVisibility={() => setGallery(false)}/>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.root, styles.alignItemsCenter]} >
                    <View style={[styles.width5,{borderTopWidth:2, borderTopColor:'#C3C8D7'}]}></View>
                    <View style={[styles.width5, styles.flexDirectionRow, styles.justifyContentBetween, styles.p1]}>
                        <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')} FunctionOnPress={() => pickImage()} />

                        
            <SmallerButtonDark PlaceHolderButtonSmallerDark={"Postar"} FunctionButtonSmallerDark={() => CreatePost()} />   
                    </View>
            </KeyboardAvoidingView>

                        {image && 
                        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, {position:'absolute', bottom:70}]}> 
                            <Text style={styles.fontWeightBold}>Selected Images</Text>
                            <Image source={{uri:image}} width={50} height={50}/> 
                        </View>}
        </View>
    );
}