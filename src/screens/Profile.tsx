import { Text, View, ScrollView, Pressable, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect, useCallback } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { ButtonDark } from "../components/ButtonDark";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { db } from "../firebase/connectionFirebase";
import { doc, onSnapshot } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePostHome from "../hooks/Posts";
import { NavigationPropStack } from "../routes/Stack";
import AchievementCard from "../components/AchievementsCards";
import { AchievementsDisplayProfile } from "../components/AchievementsDisplayProfile";
import { PostTemplate } from "../components/PostTemplate";
import VerifyLikeDeslike from "../hooks/LikeDeslikeVerification";

interface UserInterface {
    Username: string;
    Nickname: string;
    Description?: string;
    profileImage?: string;
    Followers:[];
    Following:[];
}

export const ProfileUser: React.FC = () => {

    const [userStored, setUserStored] = useState<UserInterface | null>();
    const [postViewSwitcher, setPostViewSwitcher] = useState("Visão geral");
    const { WhichReacting } = VerifyLikeDeslike();
    const { imageUser, postsFromUser, getAllPostsFromAUser } = usePostHome();

    function switcherActive(key: string) {
        if (key === "Visão geral") {
            setPostViewSwitcher("Visão geral")
        }
        if (key === "Destaques") {
            setPostViewSwitcher("Destaques")
        }
        
    }
    
    async function getUserInfo() {
        const usuario = auth.currentUser;
        const idUser = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUser);

        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const UserObject:UserInterface = {
                    Username: docSnap.data()?.name,
                    Nickname: docSnap.data()?.username,
                    Description: docSnap.data()?.description,
                    Followers: docSnap.data()?.Followers,
                    Following: docSnap.data()?.Following,
                    
                }
                storeUser('UsuarioSalvo', UserObject);
                changePreviousUser();
                
            }

        });

        return unsubscribe;
    }

    const storeUser = async (key: string, data: any) => {
        try {
            const jsonObject = JSON.stringify(data);
            await AsyncStorage.setItem(key, jsonObject);
            console.log("The user has been stored in the AsyncStorage");
        } catch (error) {
            console.log(error)
        }

    }

    const changePreviousUser = async () => {
        try {
            const savedValue = await AsyncStorage.getItem('UsuarioSalvo');
            console.log(savedValue)
            if (savedValue != null) {
                const objectValue = JSON.parse(savedValue);
                setUserStored(objectValue);
                console.log("The user has been changed!")
            }
        } catch (error) {
            console.log(error);
        }
    }


    useFocusEffect(
            useCallback(() => {
                if (auth.currentUser?.uid)
                {
                    getAllPostsFromAUser(auth.currentUser?.uid);
                    console.log("Executada a função de pegar posts no perfil " + postsFromUser)
                }else{
                    console.log("Nao tem userid")
                }
            }, [])
        );

    useEffect(() => {
        getUserInfo();
        console.log("A tela está em " + postViewSwitcher)
    }, []);



    const signOutUser = async () => {
        try {
            await signOut(auth)
            console.log("Disconnect from the account!");
        } catch (error) {
            console.log("It was not possible to log out from the app! " + error);
        }
    }
    const navigation = useNavigation<NavigationPropStack>();

    const AwardNavigation = useNavigation<NavigationPropStack>();

    return (
        <View style={[styles.root, styles.defaultRootBackground]}>
            <PseudoHeader navigate="Home" headerTitle={userStored?.Nickname} />
            <ScrollView style={styles.container}>
                <View style={[styles.mT3, styles.pB3, { borderColor: "#C3C8D7", borderBottomWidth: 3 }]}>
                    <View style={[styles.flexDirectionRow, styles.justifyContentBetween, styles.mV2]}>
                        <View style={[styles.flexDirectionRow, styles.gap2, styles.alignItemsCenter]}>
                            <Image source={ imageUser ? { uri: imageUser} : require("../images/Profile_avatar_placeholder_large.png")}
                                style={{ objectFit:'fill', borderRadius: 100, width: 72, height: 72, borderColor: "#C3C8D7", borderWidth: 3 }} />
                            <View style={[styles.gap1]}>
                                <Text style={{ fontWeight: "800", fontSize: 14 }}>@{userStored?.Nickname}</Text>
                                <Text style={{ color: "#7B8499", fontSize: 12 }}>{userStored?.Username}</Text>
                            </View>
                        </View>
                        <View style={styles.justifyContentCenter}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Options") }} style={[styles.pH4, styles.pV1, styles.alignItemsCenter, styles.justifyContentCenter, { backgroundColor: "#20202A", borderRadius: 10 }]}>
                                <Text style={{ color: "#EEF2F9", fontWeight: 600 }}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.justifyContentBetween, styles.flexDirectionRow]}>
                        <View style={styles.gap2}>
                            <View style={{maxWidth:140}}>
                                <Text style={{ fontWeight: "700", fontSize: 14 }}>{userStored?.Description ? userStored?.Description : "Nada informado."}</Text>
                            </View>
                            <View style={[styles.flexDirectionRow, styles.gap2]}>
                                <Text style={{ fontSize: 12, fontWeight: 700 }}>{userStored?.Following.length}<Text style={{ fontWeight: 500, color: "#7B8499" }}> Seguindo</Text></Text>
                                <Text style={{ fontSize: 12, fontWeight: 700 }}>{userStored?.Followers.length}<Text style={{ fontWeight: 500, color: "#7B8499" }}> Seguidores</Text></Text>
                            </View>
                        </View>
                        <View>
                            <Pressable onPress={()=>{navigation.navigate("Achievement")}}>
                                <Text style={{ fontSize: 12, fontWeight: 600, color: "#54A7F4" }}>Conquistas</Text>
                                <AchievementsDisplayProfile/>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[styles.flexDirectionRow, styles.mV5, styles.justifyContentCenter]}>
                    <Pressable onPress={() => switcherActive("Visão geral")} style={[styles.pV2, styles.alignItemsCenter, styles.justifyContentCenter, { flex: 1, backgroundColor: postViewSwitcher === "Visão geral" ? "#54A7F4" : "#E5E7EF", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]} >
                        <Text>Visão geral</Text>
                    </Pressable>
                    <Pressable onPress={() => switcherActive("Destaques")} style={[styles.pV2, styles.alignItemsCenter, styles.justifyContentCenter, { flex: 1, backgroundColor: postViewSwitcher === "Destaques" ? "#54A7F4" : "#E5E7EF", borderTopRightRadius:10, borderBottomRightRadius:10 }]} >
                        <Text>Posts</Text>
                    </Pressable>
                </View>
                {postViewSwitcher === "Visão geral" ? 
                    <FlatList data={postsFromUser} renderItem={({item}) => 
                        <PostTemplate UIDUser={item?.UIDUser} profileImage={item?.profileImage} IdPost={item?.IdPost} ImagePost={item?.ImagePost} CommentsPost={item?.CommentsPost} CommentsOfComment={item?.CommentsOfComment} Username={item?.Username} ImageUser={item?.ImageUser} Realname={item?.Realname} DescriptionPost={item?.DescriptionPost} LikeFunction={() => WhichReacting('like', item?.IdPost, auth.currentUser?.uid)} DeslikeFunction={() => WhichReacting('deslike', item?.IdPost, auth.currentUser?.uid)} />
                    } />
                 : <View style={[styles.root, styles.container, styles.defaultRootBackground, styles.alignItemsCenter]}><Text>Nenhum Post</Text></View>}
            </ScrollView>
        </View>
    )
}