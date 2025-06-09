import { useEffect, useState } from "react";
import { db, } from "../firebase/connectionFirebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const VerifyLikeDeslike = () => 
{
    const [ postId, setPostId ]             = useState<string>('');
    const [ userId, setUserId ]             = useState<string | undefined>();
    const [ IsLiked, setLike ]              = useState<boolean>(false);
    const [ isDesliked, setDeslike ]        = useState<boolean>(false);
    const [ countLike, setCountLike ]       = useState(0);
    const [ countDeslike, setCountDeslike ] = useState(0);

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

        if (postSnapshot.exists())
        {
            const postData = postSnapshot.data();
            const userDesliked = postData.Deslikes?.includes(userId);
            setDeslike(userDesliked);
        }
        else{
            setDeslike(false);
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

    useEffect(() => {
        if (postId)
        {
            onSnapshot(doc(db, 'posts/'+ postId), (doc) => {
            if (doc.exists())
            {
                console.log("Somethings has been acquired" + doc.data());
                verifyLike();
                verifyDeslike();
                getLikes();
                getDeslikes();

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
               

    return { IsLiked, isDesliked, setPostId, setUserId, countLike, countDeslike }
}

export default VerifyLikeDeslike;