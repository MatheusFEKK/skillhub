import { useCallback, useEffect, useState } from "react";
import { db, } from "../firebase/connectionFirebase";
import { arrayRemove, arrayUnion, doc, FieldValue, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/connectionFirebase";

const VerifyLikeDeslike = () => 
{
    const [ postId, setPostId ]             = useState<string>('');
    const [ userId, setUserId ]             = useState<string | undefined>();
    const [ IsLiked, setLike ]              = useState<boolean>(false);
    const [ isDesliked, setDeslike ]        = useState<boolean>(false);
    const [ countLike, setCountLike ]       = useState(0);
    const [ countDeslike, setCountDeslike ] = useState(0);

    useEffect(() => {
        console.log("Liked is " + IsLiked);
    },[IsLiked])

    const WhichReacting = async (reaction:string, postId:string | undefined, userId:string | undefined) => {
        console.log('Chamou a função WhichReacting ' + "reação: "+ reaction +" "+ "postID: " + postId +"userID: "+ userId)
        if (reaction == 'like' && postId && userId)
        {   
            const postRef = doc(db, 'posts', postId)
            const query = await getDoc(postRef);

            if (query.exists())
            {
                const postData = query.data();
                const isLikedByUser = postData.Likes?.includes(userId);

                if (isLikedByUser)
                {
                    await deleteField('Likes', postId);
                }else{
                    await deleteField('Deslikes',postId)
                    .then(async (response) => {
                        await likePost(postId, userId);
                        console.log("Deleted with success the deslike and liked on the " + postId);
                        
                    })
                    .catch((response) => {
                        console.log("Some error occured trying to delete in the function WhichReacting " + response);
                    })
                }
            }        
        }

        if (reaction == 'deslike' && postId && userId)
        {
            const postRef = doc(db, 'posts', postId);
            const query = await getDoc(postRef);
            
            if (query.exists())
            {
                const postData = query.data();
                const isLikedByUser = postData.Deslikes?.includes(userId);

                if (isLikedByUser)
                {
                    await deleteField('Deslikes', postId);
                }else{
                    await deleteField('Likes', postId)
                    .then(async (response) => {
                        await deslikePost(postId, userId);
                        console.log("Deleted with success the like and desliked on the " + postId);
                    })
                    .catch((response) => {
                        console.log("Some error on the delete function")
                    })
                }
            }
        }
    }

    const deleteField = async (_field:string, postId:string | undefined) => {
        if (postId)
        {
            const ref = doc(db, 'posts', postId);
        
            await updateDoc(ref, {
                [_field]: arrayRemove(auth.currentUser?.uid)
            }).then((response) => {
                console.log("Deleted with success");
            }).catch((response) => {
                console.log("Somethings goes wrong trying to delete" + response);
            })

        }else{
            console.log("I don't have the postId you bitch");
        }
        
    }

    const verifyLike = async () => {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        
        if (postSnapshot.exists())
        {
            const postData = postSnapshot.data();
            const userLiked = postData.Likes?.includes(userId);
            setLike(userLiked);
        }
        else
        {
            setLike(false);
        }
    }

    const verifyDeslike = async () => {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        try{
            if (postSnapshot.exists())
            {
                const postData = postSnapshot.data();
                const userDesliked = postData.Deslikes?.includes(userId);
                setDeslike(userDesliked);
            }
            else{
                setDeslike(false);
            }
        }catch(error)
        {
            console.log("Error trying to verify the deslike " + error);
        }
    }

    const getLikes = async () => {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists())
        {
            const postData = postSnapshot.data();
            const likeCount = postData.Likes.length;
            setCountLike(likeCount);
            console.log("This post have " + likeCount);
        }else{
            setCountDeslike(0);
        }
    }

    const getDeslikes = async () => {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists())
        {
            const postData = postSnapshot.data();
            const deslikeCount = postData.Deslikes.length;
            setCountDeslike(deslikeCount);
        }else{
            setCountDeslike(0);
        }
    }

    const likePost = async (postId:string | undefined, userId:string | undefined) => {
        const postRef = doc(db, 'posts/'+postId);
        
        try {
            await updateDoc(postRef, {
                Likes: arrayUnion(userId)
            })
        }
        catch(error)
        {
            console.log("Error trying to save the like in the post " + postId + error);
        }
    }

    const deslikePost = async (postId:string | undefined, userId:string | undefined) => {
        const postRef = doc(db, 'posts/'+postId);

        try {
            await updateDoc(postRef, {
                Deslikes: arrayUnion(userId),
            })
        }
        catch(error)
        {
            console.log("Error trying to save the deslike in the post " + postId + error);
        }
    }

    useEffect(() => {
        if (postId && userId)
        {
            const realTimeUpdate = onSnapshot(doc(db, 'posts/'+ postId), async (doc) => {
            if (doc.exists())
            {
                console.log("Somethings has been acquired" + doc.data());
                await verifyLike();
                await verifyDeslike();
                await getLikes();
                await getDeslikes();
            }
            else{
                console.log("Nothing has been changed yet");
            }
        });  
    }
    else{
        return;
    }
    },[postId])
               

    return { IsLiked, isDesliked, setPostId, setUserId, countLike, countDeslike, WhichReacting, verifyLike }
}

export default VerifyLikeDeslike;