import { doc, getDoc, getDocs, query, collection, DocumentData, updateDoc, arrayUnion, where } from "firebase/firestore";
import { Post, PostArray } from "../types/Post";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/connectionFirebase";
import fetchImage from "../storage/fetchImage";
import fetchImageProfile from "../storage/fetchImageProfile";
import { CommentObj } from "../types/CommentObject";


const usePostHome = () => {
    const [ posts, refreshPosts ] = useState<Post[]>();
    const [ post, refreshPost ]   = useState<Post>();
    const [ postsFromUser, refreshPostsFromUser] = useState<Post[]>();
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

                let ImageURL = null;
                let ImageUser = null;

                if (doc.data().ImagePost != null)
                {
                    ImageURL = await fetchImage(doc.data()?.ImagePost)
                    console.log("The image url is " +ImageURL)
                }

                if (response.data()?.profileImage != null)
                {
                    ImageUser = await fetchImageProfile(response.data()?.profileImage)
                }
                    
                return{
                    Realname: response.data()?.name,
                    IdPost: doc.data()?.IdPost,
                    UIDUser: doc.data()?.UIDUser,
                    Username: response.data()?.username,
                    DescriptionPost: doc.data()?.DescriptionPost,
                    ImagePost: ImageURL,
                    ImageUser: ImageUser,
                    Likes: doc.data()?.Likes,
                    Deslikes: doc.data()?.Deslikes,
                    ViewCount: 0,
                    CommentsPost: doc.data()?.Comments || [],
                    CommentsOfComment: doc.data()?.CommentsOtherComment || []
                };
            });

            const PostsFetch = await Promise.all(Allposts)
            refreshPosts([...PostsFetch]);
                
            
        }catch(error)
        {
            console.log("Something goes wrong while fetching the posts " + error);
        }
    }

    const getTime = () => {
        return new Date().getTime().toString();
    }

    const getAllPostsFromAUser = async (userId:string) => {
        const queryPost = query(collection(db, 'posts'), where('UIDUser', '==', userId));
        const querySnapshot = await getDocs(queryPost)

        const Allposts = querySnapshot.docs.map(async (doc) => {
                const response = await getUserInfo(doc.data()?.UIDUser);

                let ImageURL = null;
                let ImageUser = null;

                if (doc.data().ImagePost != null)
                {
                    ImageURL = await fetchImage(doc.data()?.ImagePost)
                    console.log("The image url is " +ImageURL)
                }

                if (response.data()?.profileImage != null)
                {
                    ImageUser = await fetchImageProfile(response.data()?.profileImage)
                }
                    
                return{
                    Realname: response.data()?.name,
                    IdPost: doc.data()?.IdPost,
                    UIDUser: doc.data()?.UIDUser,
                    Username: response.data()?.username,
                    DescriptionPost: doc.data()?.DescriptionPost,
                    ImagePost: ImageURL,
                    ImageUser: ImageUser,
                    Likes: doc.data()?.Likes,
                    Deslikes: doc.data()?.Deslikes,
                    ViewCount: 0,
                    CommentsPost: doc.data()?.Comments || [],
                    CommentsOfComment: doc.data()?.CommentsOtherComment || []
                };
            });

            const PostsFetch = await Promise.all(Allposts)
            refreshPostsFromUser([...PostsFetch]); 


    }



    const CommentInAPost = async (userId:string | undefined, postId:string | undefined, comment:string) => {
        if (postId && userId)
        {
            const postRef = doc(db, 'posts', postId);
            const userRef = doc(db, 'users', userId);

            const dataSnapshot = await getDoc(userRef);

            const data = {
                IdPost: postId,
                IdComment: getTime(),
                UIDUser:userId,
                Realname: dataSnapshot.data()?.name,
                Username: dataSnapshot.data()?.username,
                ImageUser: dataSnapshot.data()?.profileImage,
                Comment:comment,
            }

            try {
                await updateDoc(postRef, {
                    Comments: arrayUnion(data),
                });
            }
            catch(error)
            {
                console.log("Error trying to store your comment " + error);
            }
        }
    }

    const CommentInAComment = async (postId:string | undefined, userId:string | undefined, commentId:string, Newcomment:string) => 
    {
        if (postId && userId)
        {
            const commentRef = doc(db, 'posts',  postId);
            const userRef = doc(db, 'users', userId);

            const dataSnapshot = await getDoc(userRef);

            const data = {
                IdPost: postId,
                IdCommentFather:commentId,
                IdComment: getTime(),
                UIDUser:userId,
                Realname: dataSnapshot.data()?.name,
                Username: dataSnapshot.data()?.username,
                ImageUser: dataSnapshot.data()?.profileImage,
                Comment:Newcomment,
            }

            try {
                await updateDoc(commentRef, {
                    CommentsOtherComment: arrayUnion(data),
                });
            }catch(error)
            {
                console.log("Somethings goes wrong while trying to comment a comment! " + error);
            }

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
                ImageUser: userInfo.data()?.profileImage,
                Likes: query.data()?.Likes,
                Deslikes: query.data()?.Deslikes,
                ViewCount: 0,
                CommentsPost: query.data()?.Comments || [],
                CommentsOfComment: query.data()?.CommentsOtherComment || [],
            })
            }
        }
    }

    useEffect(() => {
        getAllPosts();
        if (auth.currentUser?.uid)
        {
            getImageUser(auth.currentUser.uid)
        }
    },[])

   
    
    return { getAllPosts, getSpecficPost, posts, post, getUserInfo, getImageUser, imageUser, CommentInAPost, CommentInAComment, getAllPostsFromAUser, postsFromUser }
}
export default usePostHome;

