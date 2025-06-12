import { View, TextInput } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/connectionFirebase";
import { useEffect, useRef, useState } from "react";
import { Post } from "../types/Post";
import PostHome from "../hooks/Posts";
import fetchImage from "../storage/fetchImage";

export const SearchScreen:React.FC = () => {
    const [ search, setSearch ] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [ posts, refreshPosts ] = useState<Post>();
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

    useEffect(() => {
        console.log(timeoutRef);
    },[timeoutRef])

    const Search = async () => {
        const queryPost = collection(db, 'posts');
            const querySnapshot = await getDocs(queryPost);
        
            if (!querySnapshot.empty)
            {
                console.log("Information acquired");
            }else{
                console.log("Information not acquired");
            }
            
            const posts = querySnapshot.docs.map(async (doc) => {
                const ImageURL = await fetchImage(doc.data()?.ImagePost)
                const userInfo = await getUserInfo(doc.data()?.UIDUser);
                refreshPosts({
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
            })

            
        
    }

    useEffect(() => {
        console.log("This is the posts on the search screen: " + posts);
    },[posts])

    return(
        <View style={styles.root}>
            <View style={styles.container}>
                <TextInput placeholder="Pesquisar" onChangeText={(value) => setSearch(value)}/>
                
            </View>
        </View>
    );
}