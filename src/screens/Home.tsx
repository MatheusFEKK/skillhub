import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import { db } from "../firebase/connectionFirebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { PostArray } from "../types/Post";


export const Home:React.FC = () => {
    const [ posts, refreshPosts ] = useState<PostArray | null>([]);

    const getUserInfo = async (UIDUser:string) => {
        const userRef = doc(db, "users/" + UIDUser);
        const userInfo = await getDoc(userRef);

        return userInfo;
    }

    const getAllPosts = async () => {
        const queryPosts = query(collection(db, "posts"));
        
        const posts = await getDocs(queryPosts);

        const postsPromises = posts.docs.map(async (doc) => {
            const response = await getUserInfo(doc.data()?.UIDUser);
            console.log(response.data()?.username)
            console.log(doc.data()?.IdPost)

            if (response && response.exists())
            {
                return {
                    Realname: response.data()?.name,
                    IdPost: doc.data()?.IdPost,
                    UIDUser: doc.data()?.UIDUser,
                    Username: response.data()?.username,
                    ImagePost: null,
                    DescriptionPost: doc.data()?.DescriptionPost,
                    Likes: doc.data()?.Likes,
                    Deslikes: doc.data()?.Deslikes,
                    ViewCount: 0,
                    CommentsPost: null,
                } as unknown as PostArray;
            }
            return null;   
        });
        
        const allPosts:PostArray = await Promise.all(postsPromises);
        refreshPosts(allPosts);
            
        
    }

    useEffect(() => {
        getAllPosts();
        console.log(posts)
    },[])

    const likePost = async (postId:string, userId:string) => {
        const postRef = doc(db, 'posts/'+postId);
        
        try {
            await updateDoc(postRef, {
                likes: arrayUnion(userId)
            })
        }
        catch(error)
        {
            console.log("Error trying to save the like in the post " + postId);
        }
    }

    const navigation = useNavigation<NavigationPropStack>();
    return(
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                    <TouchableOpacity style={[styles.containerToPost, styles.alignItemsCenter, styles.justifyContentCenter, styles.p2, styles.gap2]} onPress={() => navigation.navigate("CreatePost")}>
                        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.alignSelfStart]}>
                            <Image source={require('../images/userIcon.png')} />
                            <Text style={[styles.fontSize3, styles.colorTextLightGrey, styles.mL1]}>Compartilhe sua ideia...</Text>
                        </View>
                        <View style={[styles.container, styles.flexDirectionRow,{borderTopWidth:2, borderColor:'#C3C8D7'}]}>
                            <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')}  />
                        </View>
                    </TouchableOpacity>
                
            {/* <FlatList data={posts} renderItem={({item}
            ) => <PostTemplate Username={String(item?.Username)} Realname={String(item?.Realname)} TextPost={item?.TextPost} /> } keyExtractor={item => item.}/> */}
            </View>
        </View>
    );
}
