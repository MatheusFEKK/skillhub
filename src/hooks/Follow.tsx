import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/connectionFirebase";
import { useEffect, useState } from "react";

const useFollowSystem = () => {
    const [ userId, setUserId ]             = useState<string | undefined>();
    const [ otherUserId, setOtherUserId]    = useState<string | undefined>();
    const [ isFollowing, setFollow ] = useState<boolean>(false);

    const followUser = async (userId:string | undefined, userIDToFollow:string) => {

        if (userId)
            {
                    const userRef = doc(db, 'users/', userId);
                    const userFollowed = doc(db, 'users/', userIDToFollow);
                    try {
                        await updateDoc(userRef,{
                            Following: arrayUnion(userIDToFollow)
                        }).then(async (response) => {
                            await updateDoc(userFollowed, {
                                Followers: arrayUnion(userId)
                            })
                        })
                    }catch(error)
                    {
                        console.log("Something goes wrong while trying to follow ");
                    }
                }        
    }

    const unfollowUser = async (userId:string | undefined, userIdToUnfollow:string) => {
            if (userId)
                {
                    const userRef = doc(db, 'users/', userId);
                    const userUnfollowed = doc(db, 'users/', userIdToUnfollow);
            
                    try {
                        await updateDoc(userRef, {
                            Following: arrayRemove(userIdToUnfollow)
                        }).then(async (response) => {
                            await updateDoc(userUnfollowed, {
                                Followers: arrayRemove(userId)
                            })
                        })
                    }catch(error)
                    {
                        console.log("Something goes wrong while trying to unfollow ");
                    }
                }        
    }

    const isFollowingUser = async (userID:string | undefined, userIDFollowing:string) => {
        if (userID)
        {
            const userRef = doc(db, 'users/', userID)
            const dataSnapshot = await getDoc(userRef);
    
            if (dataSnapshot.exists())
            {
                const userFollowers = dataSnapshot.data();
                const fetchFollowing = userFollowers?.Following.includes(userIDFollowing);
                setFollow(fetchFollowing);
            }else{
                setFollow(false);
            }
        }
        
    }

    useEffect(() => {
        const realTimeUpdate = onSnapshot(doc(db, 'users/'+ otherUserId), async (doc) => {
                if (doc.exists())
                {
                    if (otherUserId)
                    {
                        console.log("Get the follow or unfollow" + doc.data());
                        await isFollowingUser(userId, otherUserId)
                    }
                }
                else{
                    console.log("Nothing has been changed yet in the follow or unfollow");
                }
            });  
    }, [otherUserId])

        

    return { isFollowingUser, isFollowing, followUser, unfollowUser, setUserId, setOtherUserId, setFollow}
}



export default useFollowSystem;