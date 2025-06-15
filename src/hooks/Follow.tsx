import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/connectionFirebase";

const useFollowSystem = () => {

    const followUser = async (userID:string, userIDToFollow:string) => {
        const userRef = doc(db, 'users/', userID);
        const userFollowed = doc(db, 'users/', userID);
        
        try {
            await updateDoc(userRef,{
                Following: arrayUnion(userIDToFollow)
            }).then(async (response) => {
                await updateDoc(userFollowed, {
                    Followers: arrayUnion(userID)
                })
            })
        }catch(error)
        {
            console.log("Something goes wrong while trying to follow ");
        }
    }

    const unfollowUser = async (userId:string, userIdToUnfollow:string) => {
        const userRef = doc(db, 'users/', userId);
        const userUnfollowed = doc(db, 'users/', userIdToUnfollow);

        try {
            await updateDoc(userRef, {
                Following: arrayRemove(userId)
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

export default useFollowSystem;