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
import { Post } from "../types/Post";

interface url {
    url:string
}

type UrlArray = url[]

export const Home:React.FC = () => {
    const [ posts, refreshPosts ] = useState<PostArray>([]);
    const [ imagePosts, refreshImages ] = useState<UrlArray>([]);

    const getUserInfo = async (UIDUser:string) => {
        const userRef = doc(db, "users/" + UIDUser);
        const userInfo = await getDoc(userRef);

        return userInfo;
    }

    const getAllPosts = async () => {
        const queryPosts = query(collection(db, "posts"));
        
        const posts = await getDocs(queryPosts);

         // Otimizar método de puxar os posts do banco (Se sobrar tempo)
         
        const usersArrays:Post[] = [];

        posts.docs.map(async (doc) => {
            const response = await getUserInfo(doc.data()?.UIDUser);
            console.log(response.data()?.username)
            console.log(doc.data()?.IdPost)

            const fetchImage = await fetch(`http://10.75.45.30/storageSkillHub/imageFiles/${doc.data()?.ImagePost}`).then((response) => {
                return response.url
            });
            
            usersArrays.push({
                Realname: response.data()?.name,
                IdPost: doc.data()?.IdPost,
                UIDUser: doc.data()?.UIDUser,
                Username: response.data()?.username,
                DescriptionPost: doc.data()?.DescriptionPost,
                ImagePost:fetchImage,
                Likes: doc.data()?.Likes,
                Deslikes: doc.data()?.Deslikes,
                ViewCount: 0,
                CommentsPost: null,
            });
            
            refreshPosts(usersArrays);  
        });
    }
    
    useEffect(() => {
        getAllPosts();
        console.log(posts.forEach((response) => {
            console.log('From post object : ' + response.ImagePost)
        }))
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
                
            <FlatList contentContainerStyle={[styles.mT5, styles.gap3]} data={posts} renderItem={({item}
            ) => <PostTemplate IdPost={item?.IdPost} ImagePost={item?.ImagePost} Username={item?.Username} Realname={item?.Realname} DescriptionPost={item?.DescriptionPost} /> }/>
            </View>
        </View>
    );
}
