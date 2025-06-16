import { View, Image, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, FlatList } from "react-native";
import usePostHome from "../hooks/Posts";
import { useEffect, useState } from "react";
import { NavigationScreenProp } from "../routes/Stack";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";
import { auth } from "../firebase/connectionFirebase";
import { SmallerButtonDark } from "../components/ButtonSmallerDark";
import fetchImageProfile from "../storage/fetchImageProfile";
import { CommentTemplate } from "../components/CommentTemplate";
import { ModalCommentReply } from "./ModalCommentReply";

export const FullPost = ({route} :NavigationScreenProp) => {
    const { getSpecficPost, post, getUserInfo, CommentInAPost } = usePostHome();
    const {IsLiked, isDesliked, countDeslike, countLike, WhichReacting, setPostId, setUserId} = VerifyLikeDeslike();
    const navigation = useNavigation<NavigationPropStack>();
    const [ comment, setComment ] = useState<string>('')
    const [imageUser, setImageUser ] = useState<string>();
    const [ modalVisible, setModalVisilibity ] = useState<boolean>(false);
    
    const getImageUser = async () => {
        if (post?.ImageUser)
        {
            setImageUser(await fetchImageProfile(post.ImageUser));
        }
    }

    useEffect(() => {
        getSpecficPost(String(route.params.postId));
    },[]);
    
    useEffect(() => {
        getImageUser();
        getUserInfo(post?.IdPost)
        if (post?.IdPost)
        {
            setPostId(post?.IdPost);
            setUserId(auth.currentUser?.uid)
        }
        console.log("the liked is: " + IsLiked);
        console.log("The UID : " + post?.IdPost)
    },[post]);



    return(
        <View style={[styles.root, styles.defaultRootBackground]}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            
           <View style={[styles.m3]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../images/back-icon.png')} />
                </TouchableOpacity>

                <View style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}}>
                    <Image style={{width:45, height:45, borderRadius:100, objectFit:'fill'}} source={imageUser ? {uri:imageUser} : require('../images/userIcon.png')} />
                    <View style={{margin:10}}>
                        <Text style={{fontWeight:'bold'}}>{post?.Username}</Text>
                        <Text style={{opacity:0.5}}>{post?.Realname}</Text>
                    </View>
                </View>
                    <View style={[styles.container, {position:'relative', bottom:10}]}>
                        <Text>
                            {post?.DescriptionPost}
                        </Text>
                    </View>
            </View> 
            <View style={[styles.alignItemsCenter]}>

            
            {post?.ImagePost == null ? (
                <View></View>
            ) :
            <View>
                    <Image style={{width:310, height:327, borderRadius:2 ,objectFit: "contain"}} source={{uri: String(post.ImagePost)}} />
                </View>
            }
                <View style={[styles.flexDirectionRow, styles.m3,{gap:160}]}>
                    <View>
                        <TouchableOpacity style={{alignItems:'center', justifyContent:'center',width:58, padding:7.5, outlineColor:'#A1A7B9', outlineWidth:1, borderRadius:30, flexDirection:'row'}}>
                            <Image source={require('../images/message-circle.png')} />
                            <Text style={{color:"#A1A7B9"}}>{post?.CommentsPost?.length}</Text>
                        </TouchableOpacity>

                    </View>
            
                    <View style={[styles.flexDirectionRow, styles.gap1,{borderColor:'#A1A7B9', borderWidth:1, borderRadius:40}]}>
                    {IsLiked == false ? (
                        <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1]} onPress={() => WhichReacting('like', post?.IdPost, auth.currentUser?.uid)}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#7B8499'}]}>{countLike}</Text>
                            <Image source={require('../images/thumbs-up.png')} />
                        </TouchableOpacity>

) : 
<TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1, {borderTopLeftRadius:15, borderBottomLeftRadius:15, backgroundColor:'#4781EE'}]} onPress={() => WhichReacting('like', post?.IdPost, auth.currentUser?.uid)}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#FFFFFF'}]}>{countLike}</Text>
                            <Image source={require('../images/thumbs-up-liked.png')} />
                        </TouchableOpacity>
                    }
                    {isDesliked == false ? (
                        <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1]} onPress={() => WhichReacting('deslike', post?.IdPost, auth.currentUser?.uid)}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#7B8499'}]}>{countDeslike}</Text>
                            <Image source={require('../images/thumbs-down.png')} />
                        </TouchableOpacity>
                    ) : 
                    <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1, {borderEndStartRadius:15, borderEndEndRadius:15, backgroundColor:'#4781EE'}]} onPress={() => WhichReacting('deslike', post?.IdPost, auth.currentUser?.uid)}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#FFFFFF'}]}>{countDeslike}</Text>
                            <Image source={require('../images/thumbs-down-desliked.png')} />
                        </TouchableOpacity>
                    }
                    </View>
            </View>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} keyboardVerticalOffset={24}>
            <View style={[styles.flexDirectionRow, styles.container, styles.justifyContentBetween, styles.defaultRootBackground, {width:'100%'}]}>
                <TextInput style={styles.mL2} placeholder={"Comentar"} onChangeText={(value) => setComment(value)}/>
                <SmallerButtonDark PlaceHolderButtonSmallerDark="Postar" FunctionButtonSmallerDark={() => {CommentInAPost(auth.currentUser?.uid, post?.IdPost, comment); setComment('')}} />
            </View>  
        </KeyboardAvoidingView>  
            <FlatList data={post?.CommentsPost} renderItem={({item}) => 
                <View> 
                    <CommentTemplate Username={item.Username} Realname={item.Username} ImageUser={ async () => await fetchImageProfile(item.ImageUser)} UIDUser={item.UIDUser} Comment={item.Comment} MakeModalVisible={() => setModalVisilibity(true)} CommentOfTheCommentsMany={item.CommentsOfThatComment.length} /> 
                        
                        <ModalCommentReply ModalVisible={modalVisible} Comment={item.Comment} CommentsOfThatComment={item.CommentsOfThatComment} ChangeVisibility={() => setModalVisilibity(false)} ImageUser={item.ImageUser} Realname={item.Realname} UIDUser={item.UIDUser} Username={item.Username} /> 
                        
                        </View>}
                    />
        </ScrollView>       
            </View>
    );
    
}