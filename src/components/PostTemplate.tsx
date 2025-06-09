import { useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { Post } from "../types/Post";
import { auth, db } from "../firebase/connectionFirebase";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";


export const PostTemplate:React.FC<Post> = (props) => {
    const { IsLiked, isDesliked ,setPostId, setUserId, countLike, countDeslike } = VerifyLikeDeslike();

    useEffect(() => {
        setPostId(props.IdPost);
        setUserId(auth.currentUser?.uid)
    },[])
    
    return(
        <View style={[styles.alignItemsCenter, {backgroundColor:'#F4F7FD', width:350, borderRadius:15}]}>
            <View style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}}>
                <Image width={45} height={45} source={require('../images/userIcon.png')} />
                <View style={{margin:10}}>
                    <Text style={{fontWeight:'bold'}}>{props.Username}</Text>
                    <Text style={{opacity:0.5}}>{props.Realname}{'\n'}Post N: {props.IdPost}</Text>
                </View>
            </View>
                    <View style={[styles.container, {position:'relative', bottom:10}]}>
                        <Text>
                            {props.DescriptionPost}
                        </Text>
                    </View>
            {props.ImagePost == null ? (
                <View></View>
            ) :
                <View>
                    <Image width={310} height={327} borderRadius={5} source={{uri: props.ImagePost}} />
                </View>
            }
                <View style={[styles.flexDirectionRow, styles.m3,{gap:160}]}>
                    <View>
                        <TouchableOpacity style={{alignItems:'center', justifyContent:'center',width:58, padding:7.5, outlineColor:'#A1A7B9', outlineWidth:1, borderRadius:30, flexDirection:'row'}}>
                            <Image source={require('../images/message-circle.png')} />
                            <Text style={{color:"#A1A7B9"}}>{props.CommentsPost?.toString()}</Text>
                        </TouchableOpacity>

                    </View>
            
                    <View style={[styles.flexDirectionRow, styles.gap1,{borderColor:'#A1A7B9', borderWidth:1, borderRadius:40}]}>
                    {IsLiked == false ? (
                        <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1]} onPress={props.LikeFunction}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#7B8499'}]}>{countLike}</Text>
                            <Image source={require('../images/thumbs-up.png')} />
                        </TouchableOpacity>

                    ) : 
                         <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1, {borderTopLeftRadius:15, borderBottomLeftRadius:15, backgroundColor:'#4781EE'}]} onPress={props.LikeFunction}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#FFFFFF'}]}>{countLike}</Text>
                            <Image source={require('../images/thumbs-up-liked.png')} />
                        </TouchableOpacity>
                    }
                    {isDesliked == false ? (
                        <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1]} onPress={props.DeslikeFunction}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#7B8499'}]}>{countDeslike}</Text>
                            <Image source={require('../images/thumbs-down.png')} />
                        </TouchableOpacity>
                    ) : 
                         <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1, {borderEndStartRadius:15, borderEndEndRadius:15, backgroundColor:'#4781EE'}]} onPress={props.DeslikeFunction}>
                            <Text style={[styles.fontWeightSemiBold, {color:'#FFFFFF'}]}>{countDeslike}</Text>
                            <Image source={require('../images/thumbs-down-desliked.png')} />
                        </TouchableOpacity>
                    }
                    </View>
                </View>
            </View>
    );
}