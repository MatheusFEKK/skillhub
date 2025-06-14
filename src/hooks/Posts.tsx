import { doc, getDoc, getDocs, query, collection, DocumentData, updateDoc, arrayUnion } from "firebase/firestore";
import { Post, PostArray } from "../types/Post";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/connectionFirebase";
import fetchImage from "../storage/fetchImage";
import fetchImageProfile from "../storage/fetchImageProfile";


const usePostHome = () => {
    const [ posts, refreshPosts ] = useState<Post[]>();
    const [ post, refreshPost ]   = useState<Post>();
    const [ imageUser, setImageUser ] = useState<string | undefined>(undefined);

    const getUserInfo = async (UIDUser:string | undefined) => {
        const userRef = doc(db, "users/" + UIDUser);
        const userInfo = await getDoc(userRef);

        return userInfo;
    }

    const getImageUser = async (UIDUser:string) => {
        const userRef = doc(db, 'users/'+UIDUser);
        const userInfo = await getDoc(userRef);

        if (userInfo.exists())
        {
            setImageUser(await fetchImageProfile(userInfo.data()?.profileImage));
        }else{
            setImageUser(undefined);
        }
    }

    const getAllPosts = async () => {
        
        try {
            console.log("getAllPosts called")
            const queryPosts = query(collection(db, "posts"));

            const postsQuery = await getDocs(queryPosts);
            console.log("Fetching the posts");

            const Allposts = postsQuery.docs.map(async (doc) => {
                const response = await getUserInfo(doc.data()?.UIDUser);
                let ImageURL = null

                if (doc.data().ImagePost != null)
                {
                    ImageURL = await fetchImage(doc.data()?.ImagePost)
                    console.log("The image url is " +ImageURL)
                }
                    
                return{
                    Realname: response.data()?.name,
                    IdPost: doc.data()?.IdPost,
                    UIDUser: doc.data()?.UIDUser,
                    Username: response.data()?.username,
                    DescriptionPost: doc.data()?.DescriptionPost,
                    ImagePost: ImageURL,
                    Likes: doc.data()?.Likes,
                    Deslikes: doc.data()?.Deslikes,
                    ViewCount: 0,
                    CommentsPost: null,
                };
            });

            const PostsFetch = await Promise.all(Allposts)
            refreshPosts([...PostsFetch]);
                
            
        }catch(error)
        {
            console.log("Something goes wrong while fetching the posts " + error);
        }
    }
    const CommentInAPost = async (postId:string, comment:string) => {
        const postRef = doc(db, 'posts', postId);

        try {
            await updateDoc(postRef, {
                Comments: arrayUnion(comment),
            });
        }
        catch(error)
        {
            console.log("Error trying to store your comment " + error);
        }
    }

    const getSpecficPost = async (postId:string) => {
        if (postId)
        {
            const postRef = doc(db, 'posts', postId)
            const query   = await getDoc(postRef)
            const userInfo = await getUserInfo(query.data()?.UIDUser)
            
            if (query.exists())
            {
                const ImageURL = await fetchImage(query.data()?.ImagePost)

            refreshPost({
                Realname: userInfo.data()?.name,
                IdPost: query.data()?.IdPost,
                UIDUser: query.data()?.UIDUser,
                Username: userInfo.data()?.username,
                DescriptionPost: query.data()?.DescriptionPost,
                ImagePost: query.data().ImagePost == null ? null : ImageURL,
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
            (async () => {
                try {
                    if (auth.currentUser)
                    {
                        await getImageUser(auth.currentUser?.uid);
                        console.log("Image fetched " + imageUser)
                    }
                }catch(error)
                {
                    console.log(error);
                }
            })();
    },[])

   
    
    return { getAllPosts, getSpecficPost, posts, post, getUserInfo, getImageUser, imageUser }
}
export default usePostHome;

