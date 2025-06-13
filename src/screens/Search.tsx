import { View, TextInput, FlatList } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { collection, doc, endAt, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/connectionFirebase";
import { useEffect, useRef, useState } from "react";
import { Post, PostArray } from "../types/Post";
import PostHome from "../hooks/Posts";
import fetchImage from "../storage/fetchImage";
import { PostTemplate } from "../components/PostTemplate";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";

export const SearchScreen:React.FC = () => {
    const { WhichReacting } = VerifyLikeDeslike();
    const [ search, setSearch ] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [ posts, refreshPosts ] = useState<PostArray>([]);
    const { getUserInfo } = PostHome();

    useEffect(() => {
        if (timeoutRef.current)
        {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            Search();
            console.log("Debounce " + search)
        }, 500)
        
        return () => {
            if (timeoutRef.current)
            {
                clearTimeout(timeoutRef.current);
            }
        }
    },[search])

    const Search = async () => {
        const queryPosts = collection(db, 'posts');
        const querySnapshot = await getDocs(queryPosts);

        const filtered = querySnapshot.docs.filter(doc => 
            doc.data().DescriptionPost && doc.data().DescriptionPost.includes(search)
        );
        
            if (!querySnapshot.empty)
            {
                console.log("Information acquired");
            }else{
                console.log("Information not acquired");
            }
            const data:Post[] = []
            
            filtered.map(async (doc) => {
                const ImageURL = await fetchImage(doc.data()?.ImagePost)
                const userInfo = await getUserInfo(doc.data()?.UIDUser);


                data.push({
                    Realname: userInfo.data()?.name,
                    IdPost: doc.data()?.IdPost,
                    UIDUser: doc.data()?.UIDUser,
                    Username: userInfo.data()?.username,
                    DescriptionPost: doc.data()?.DescriptionPost,
                    ImagePost: doc.data().ImagePost == null ? null : ImageURL,
                    Likes: doc.data()?.Likes,
                    Deslikes: doc.data()?.Deslikes,
                    ViewCount: 0,
                    CommentsPost: null,
                })

                refreshPosts(data);
                console.log("This is the posts on the search screen: " + doc.data()?.DescriptionPost);
            })

            
        
    }

    return(
        <View style={styles.root}>
            <View style={[styles.container, styles.gap2]}>
                <TextInput placeholder="Pesquisar" onChangeText={(value) => setSearch(value)}/>
                <FlatList data={posts} renderItem={({item}) => <PostTemplate IdPost={item?.IdPost} ImagePost={item?.ImagePost} Username={item?.Username} Realname={item?.Realname} DescriptionPost={item?.DescriptionPost} LikeFunction={() => WhichReacting('like', item?.IdPost, auth.currentUser?.uid)} DeslikeFunction={() => WhichReacting('deslike', item?.IdPost, auth.currentUser?.uid)}/>} />
            </View>
        </View>
    );
}