import { FlatList, Image, View } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { db } from "../firebase/connectionFirebase";
import { doc, Firestore, getDoc, onSnapshot } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";
import { Text } from "@react-navigation/elements";



type achievementKey = "post_1" | "likes_1" | "deslikes_1";

const achievementImages: Record<achievementKey, any> = {
    post_1: require("../images/conquista.png"),
    likes_1: require("../images/conquista-star.png"),
    deslikes_1: require("../images/conquista-bad-star.png")
}

function getAwardImage(key: achievementKey) {
    return achievementImages[key];
}

interface AchievementsData {
    post_1?: boolean;
    likes_1?: boolean;
    deslikes_1?: boolean;
}

interface AchievementCardBodyProps {
    achievementKey: achievementKey;
}

const AchievementCardBody = ({ achievementKey }: AchievementCardBodyProps) => {
    return (
        <View>
            <Image
                style={{ width: 36, height: 36 }}
                source={getAwardImage(achievementKey)}
            />
        </View>
    );
};

export const AchievementsDisplayProfile = () => {
    const usuario = auth.currentUser;
    const [achievements, setAchievements] = useState<Object | null>(null);



    useEffect(() => {
        const usuario = auth.currentUser;
        const idUser = String(usuario?.uid);
        const docRef = doc(db, "achievements/" + idUser);

        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                setAchievements(docSnap.data() as AchievementsData);
            }


        })
        return unsubscribe

    }, [])



    const activeAchievements = achievements ? (Object.keys(achievements) as achievementKey[]).filter((key): key is achievementKey => achievements[key] === true && Object.hasOwn(achievementImages, key)).slice(0, 3) : [];

    return (
        <View style={[styles.flexDirectionRow]}>
            {activeAchievements.length > 0 ? (
                <View style={{ flexDirection: "row" }}>
                    {activeAchievements.map((key, index) => (
                        <View key={key} style={{ marginLeft: index > 0 ? -20 : 0 }}>
                            <AchievementCardBody achievementKey={key} />
                        </View>
                    ))}
                </View>
            ) : (
                <Image
                    style={{ width: 36, height: 36 }}
                    source={require("../images/conquista-off.png")}
                />
            )}
        </View>
    )

}