import { doc, getDoc, getDocs, query, collection, DocumentData } from "firebase/firestore";
import { Post, PostArray } from "../types/Post";
import { useEffect, useState } from "react";
import { db } from "../firebase/connectionFirebase";


const PostHome = () => {
    const [ posts, refreshPosts ] = useState<PostArray>([]);
    const [ post, refreshPost ]   = useState<Post>();

    const getUserInfo = async (UIDUser:string | undefined) => {
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
            console.log(response.data()?.username);
            console.log(doc.data()?.IdPost);

                const fetchImage = await fetch(`http://192.168.0.107/storageSkillHub/imageFiles/${doc.data()?.ImagePost}`).then((response) => {
                    return response.url
                });
            
            usersArrays.push({
                Realname: response.data()?.name,
                IdPost: doc.data()?.IdPost,
                UIDUser: doc.data()?.UIDUser,
                Username: response.data()?.username,
                DescriptionPost: doc.data()?.DescriptionPost,
                ImagePost: doc.data().ImagePost == null ? null : fetchImage,
                Likes: doc.data()?.Likes,
                Deslikes: doc.data()?.Deslikes,
                ViewCount: 0,
                CommentsPost: null,
            });

            
            refreshPosts(usersArrays);  
        });
    }

    const getSpecficPost = async (postId:string) => {
        if (postId)
        {
            const postRef = doc(db, 'posts', postId)
            const query   = await getDoc(postRef)
            const userInfo = await getUserInfo(query.data()?.UIDUser)
            
            const usersArrays:Post[] = [];
            
            if (query.exists())
            {
                const fetchImage = await fetch(`http://192.168.0.107/storageSkillHub/imageFiles/${query.data()?.ImagePost}`).then((response) => {
                        return response.url
                    });

            refreshPost({
                Realname: userInfo.data()?.name,
                IdPost: query.data()?.IdPost,
                UIDUser: query.data()?.UIDUser,
                Username: userInfo.data()?.username,
                DescriptionPost: query.data()?.DescriptionPost,
                ImagePost: query.data().ImagePost == null ? null : fetchImage,
                Likes: query.data()?.Likes,
                Deslikes: query.data()?.Deslikes,
                ViewCount: 0,
                CommentsPost: null,
            })
            }
        }
    }

    useEffect(() => {
        getAllPosts();
    },[])
    
    return { getAllPosts, getSpecficPost, posts, post, getUserInfo }
}
export default PostHome;

