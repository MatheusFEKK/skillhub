import { View, Text, Image, TouchableOpacity, FlatList, Pressable } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";
import PostHome from "../hooks/Posts";
import { auth } from "../firebase/connectionFirebase";

export const Home:React.FC = () => {
    const { WhichReacting } = VerifyLikeDeslike();
    const { posts, imageUser } = PostHome();
    const navigationStack = useNavigation<NavigationPropStack>() 

    const toProfile = ()=>{
        navigationStack.navigate("Profile");
    }

    return(
        <View style={styles.root}>
            <View style={[styles.container, styles.flexDirectionRow,styles.justifyContentBetween,styles.alignItemsCenter, styles.mT3]}>
                <View style={[{borderWidth: 2, borderRadius: 10, padding:5, borderColor: "#3546B2"}]}>
                    <Image 
                        source={require("../images/SkillHub_Logo_Transparent.png")}
                        style={{width:35, height:35, objectFit: "fill"}}
                    />
                </View>
                <View style={[{borderRadius: 100, borderWidth: 2, borderColor: "#C3C8D7"}]}>
                    <Pressable onPress={toProfile}>
                        <Image 
                                source={require("../images/Profile_avatar_placeholder_large.png")}
                                style={{width:45, height:45, objectFit: "fill", borderRadius: 25}}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={[styles.container]}>
                    <TouchableOpacity style={[styles.containerToPost, styles.alignItemsCenter, styles.justifyContentCenter, styles.p2, styles.gap2]} onPress={() => navigationStack.navigate("CreatePost")}>
                        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.alignSelfStart]}>
                            <Image style={{width:45, height:45, borderRadius:100, objectFit:'contain'}} source={imageUser ? {uri:imageUser} : require('../images/userIcon.png')} />
                            <Text style={[styles.fontSize3, styles.colorTextLightGrey, styles.mL1]}>Compartilhe sua ideia...</Text>
                        </View>
                        <View style={[styles.container, styles.flexDirectionRow,{borderTopWidth:2, borderColor:'#C3C8D7'}]}>
                            <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')}  />
                        </View>
                    </TouchableOpacity>
            <FlatList contentContainerStyle={[styles.mT5, styles.gap3, {marginBottom: 100}]} data={posts} renderItem={({item}
            ) => <PostTemplate profileImage={item?.profileImage} IdPost={item?.IdPost} ImagePost={item?.ImagePost} Username={item?.Username} Realname={item?.Realname} DescriptionPost={item?.DescriptionPost} LikeFunction={() => WhichReacting('like', item?.IdPost, auth.currentUser?.uid)} DeslikeFunction={() => WhichReacting('deslike', item?.IdPost, auth.currentUser?.uid)}/> }/>
            </View>
        </View>
    );
}
