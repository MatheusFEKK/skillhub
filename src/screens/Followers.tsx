import { Text, View, ScrollView, Pressable, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { ButtonDark } from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase/connectionFirebase";
import { collectionGroup, doc, onSnapshot } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePostHome from "../hooks/Posts";
import { NavigationPropStack } from "../routes/Stack";
import AchievementCard from "../components/AchievementsCards";
import { AchievementsDisplayProfile } from "../components/AchievementsDisplayProfile";

interface NameInterface {
    Username: string;
}

interface UserInterface {
    Followers: [];
    Following: [];
}

interface UserInterfaceProp {
    Username: string;
    Nickname: string;
    profileImage?: string;

}

interface Prop {
    userUID: string
}

const FollowerItem: React.FC<Prop> = ({ userUID }) => {
    const [follower, setFollower] = useState<UserInterfaceProp>();

    async function getUserInfo() {
        const usuario = auth.currentUser;
        const idUser = String(userUID);
        const docRef = doc(db, "users/" + idUser);

        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const UserObject: UserInterfaceProp = {
                    Username: docSnap.data()?.name,
                    Nickname: docSnap.data()?.username,
                }
                setFollower(UserObject);
            }
        });

        return unsubscribe;
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image style={{width: 56, height: 56, borderRadius: 100, borderWidth: 2, borderColor: "#7B8499"}} source={require("../images/Profile_avatar_placeholder_large.png")}/>
            <View>
                <Text style={{fontSize: 16}}>@{follower?.Nickname}</Text>
                <Text style={{color: "#7B8499"}}>{follower?.Username}</Text>
            </View>
        </View>
    )
}


export const Follower: React.FC = () => {

    const [userName, setUsername] = useState<string>();
    const [activeBody, setActiveBody] = useState<boolean>(true);
    const [userFollowers, setFollowers] = useState<UserInterface>()

    async function getUserName() {
        const usuario = auth.currentUser;
        const idUser = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUser);
        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const UserObject: NameInterface = { Username: docSnap.data()?.name }
                setUsername(UserObject.Username);
            }

        });
        return unsubscribe;
    }

    async function getUserFollowers() {

        const usuario = auth.currentUser;
        const idUser = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUser);
        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const UserObject: UserInterface = {
                    Followers: docSnap.data()?.Followers || [], Following: docSnap.data()?.Following || []
                };
                setFollowers(UserObject);

            }

        });
        return unsubscribe;


    }

    useEffect(() => {
        getUserName()
        getUserFollowers()
    }, [])

    return (
        <View style={styles.root}>
            <PseudoHeader navigate="Home" headerTitle={!activeBody ? "Seguidores de " + userName : "Conexões de " + userName} />
            <View style={[styles.container, styles.justifyContentBetween, styles.mV5, { flexDirection: "row" }]}>
                <Pressable style={{height:30, borderBottomWidth: 3, width: "50%", alignItems: 'center', borderBlockColor: activeBody ? "#54A7F4" : "#C3C8D7"  }} onPress={() => { setActiveBody(true) }}>

                        <Text>Seguindo</Text>

                </Pressable>
                <Pressable style={{height:30, borderBottomWidth: 3, width: "50%", alignItems: 'center', borderBlockColor: !activeBody ? "#54A7F4" : "#C3C8D7" }} onPress={() => { setActiveBody(false) }}>
 
                        <Text>Seguidores</Text>
                </Pressable>
            </View>
            {!activeBody ?
                <View>
                    <View style={styles.container}>
                        {
                            userFollowers?.Followers ?
                                userFollowers.Followers.length > 0
                                    ?
                                    <View>
                                        <FlatList
                                            contentContainerStyle={{ gap: 25 }}
                                            data={userFollowers.Followers}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => <FollowerItem userUID={item} />}
                                            ListEmptyComponent={
                                                <Text>Não está seguindo ninguém</Text>
                                            }
                                        />
                                    </View>
                                    :
                                    <View>
                                        <Text>
                                            Ainda não segue ninguém! Conecte-se com mais usuários em sua página inicial
                                        </Text>
                                    </View>
                                :
                                <View>
                                    <Text>
                                        N/A
                                    </Text>
                                </View>
                        }
                    </View>
                </View>
                :
                <View>
                    <View style={styles.container}>
                        {
                            userFollowers?.Following ?
                                userFollowers.Following.length > 0
                                    ?
                                    <View>
                                        <FlatList
                                            contentContainerStyle={{ gap: 25 }}
                                            data={userFollowers.Following}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => <FollowerItem userUID={item} />}
                                            ListEmptyComponent={
                                                <Text>Não está seguindo ninguém</Text>
                                            }
                                        />
                                    </View>
                                    :
                                    <View>
                                        <Text>
                                            Ainda não segue ninguém! Conecte-se com mais usuários em sua página inicial
                                        </Text>
                                    </View>
                                :
                                <View>
                                    <Text>
                                        N/A
                                    </Text>
                                </View>
                        }
                    </View>
                </View>
            }
        </View>
    );
}
