import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";
import PostHome from "../hooks/Posts";
import { auth } from "../firebase/connectionFirebase";
import { BottomBarProps } from "../routes/BottomBar";

export const Home:React.FC = () => {
    const { WhichReacting } = VerifyLikeDeslike();
    const { posts } = PostHome();
    const navigationStack = useNavigation<NavigationPropStack>() 

    return(
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                    <TouchableOpacity style={[styles.containerToPost, styles.alignItemsCenter, styles.justifyContentCenter, styles.p2, styles.gap2]} onPress={() => navigationStack.navigate("CreatePost")}>
                        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.alignSelfStart]}>
                            <Image source={require('../images/userIcon.png')} />
                            <Text style={[styles.fontSize3, styles.colorTextLightGrey, styles.mL1]}>Compartilhe sua ideia...</Text>
                        </View>
                        <View style={[styles.container, styles.flexDirectionRow,{borderTopWidth:2, borderColor:'#C3C8D7'}]}>
                            <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')}  />
                        </View>
                    </TouchableOpacity>
                
            <FlatList contentContainerStyle={[styles.mT5, styles.gap3]} data={posts} renderItem={({item}
            ) => <PostTemplate profileImage={item?.profileImage} IdPost={item?.IdPost} ImagePost={item?.ImagePost} Username={item?.Username} Realname={item?.Realname} DescriptionPost={item?.DescriptionPost} LikeFunction={() => WhichReacting('like', item?.IdPost, auth.currentUser?.uid)} DeslikeFunction={() => WhichReacting('deslike', item?.IdPost, auth.currentUser?.uid)}/> }/>
            </View>
        </View>
    );
}
