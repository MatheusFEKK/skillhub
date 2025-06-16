import { View, Text, Image, TouchableOpacity, FlatList, Pressable, ScrollView } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";
import usePostHome from "../hooks/Posts";
import { auth } from "../firebase/connectionFirebase";
import { useCallback, useEffect } from "react";

export const Home:React.FC = () => {
    const { WhichReacting } = VerifyLikeDeslike();
    const { posts, imageUser, getAllPosts } = usePostHome();
    const navigationStack = useNavigation<NavigationPropStack>() 

    const toProfile = () => {
        navigationStack.navigate("Profile");
    }

    useFocusEffect(
        useCallback(() => {
            getAllPosts();
        }, [])
    );

    return(
        <View style={[styles.root, styles.container, styles.defaultRootBackground, {paddingBottom: '2%'}]}>
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
                                source={ imageUser ? {uri: imageUser} : require("../images/Profile_avatar_placeholder_large.png")}
                                style={{width:45, height:45, objectFit: "fill", borderRadius: 25}}
                        />
                    </Pressable>
                </View>
            </View>
                 
            <FlatList contentContainerStyle={[styles.mT5, styles.pB4, styles.gap3, {marginBottom: 100}]} data={posts} keyExtractor={(item) => item.IdPost.toString()} extraData={posts}
                ListHeaderComponent={() => (
                            <TouchableOpacity style={[styles.containerToPost, styles.alignItemsCenter, styles.justifyContentCenter, styles.p2, styles.gap2]} onPress={() => navigationStack.navigate("CreatePost")}>
                                <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.alignSelfStart]}>
                                    <Image style={{width:45, height:45, borderRadius:1000, objectFit:'fill'}} source={imageUser ? {uri:imageUser} : require('../images/userIcon.png')} />
                                    <Text style={[styles.fontSize3, styles.colorTextLightGrey, styles.mL1]}>Compartilhe sua ideia...</Text>
                                </View>
                                <View style={[styles.container, styles.flexDirectionRow,{borderTopWidth:2, borderColor:'#C3C8D7'}]}>
                                    <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')}  />
                                </View>
                            </TouchableOpacity>
                )}
            renderItem={({item}
            ) => <PostTemplate UIDUser={item?.UIDUser} profileImage={item?.profileImage} IdPost={item?.IdPost} ImagePost={item?.ImagePost} CommentsPost={item?.CommentsPost} CommentsOfComment={item?.CommentsOfComment} Username={item?.Username} ImageUser={item?.ImageUser} Realname={item?.Realname} DescriptionPost={item?.DescriptionPost} LikeFunction={() => WhichReacting('like', item?.IdPost, auth.currentUser?.uid)} DeslikeFunction={() => WhichReacting('deslike', item?.IdPost, auth.currentUser?.uid)}/>  } />
            
        </View>
    );
}
