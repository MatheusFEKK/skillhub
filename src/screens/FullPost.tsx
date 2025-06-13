import { View, Image, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from "react-native";
import PostHome from "../hooks/Posts";
import { useEffect } from "react";
import { NavigationScreenProp } from "../routes/Stack";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";
import { auth } from "../firebase/connectionFirebase";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { SmallerButtonDark } from "../components/ButtonSmallerDark";

export const FullPost = ({route} :NavigationScreenProp) => {
    const { getSpecficPost, post, getUserInfo, imageUser } = PostHome();
    const {IsLiked, isDesliked, countDeslike, countLike, WhichReacting, setPostId, setUserId} = VerifyLikeDeslike();
    const navigation = useNavigation<NavigationPropStack>();
    

    useEffect(() => {
        getSpecficPost(String(route.params.postId))
    },[]);

    
    useEffect(() => {
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
        <View style={styles.root}>
           <View style={[styles.m3]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../images/back-icon.png')} />
                </TouchableOpacity>

                <View style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}}>
                    <Image width={45} height={45} source={require('../images/userIcon.png')} />
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
                            <Text style={{color:"#A1A7B9"}}>{post?.CommentsPost?.toString()}</Text>
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
            <View style={[styles.flexDirectionRow, styles.container, styles.justifyContentBetween]}>
                <TextInput placeholder={"Comentar"}/>
                <SmallerButtonDark PlaceHolderButtonSmallerDark="Postar" />
            </View>           
        </View>
    );
    
}