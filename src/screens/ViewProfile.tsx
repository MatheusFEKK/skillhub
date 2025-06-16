import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PseudoHeader } from "../components/PseudoHeader";
import { useNavigation } from "@react-navigation/native";
import usePostHome from "../hooks/Posts";
import { useEffect, useState } from "react";
import { NavigationPropStack, NavigationScreenViewProfileProp } from "../routes/Stack";
import fetchImageProfile from "../storage/fetchImageProfile";
import { auth } from "../firebase/connectionFirebase";
import { BottomBarProps } from "../routes/BottomBar";
import useFollowSystem from "../hooks/Follow";

interface UserInterface {
    Realname: string;
    Username: string;
    Description?: string;
    profileImage?: string | null;
    Followers:[];
    Following:[];
}

export const ViewProfile = ({route}: NavigationScreenViewProfileProp) => {
    const [postViewSwitcher, setPostViewSwitcher] = useState("Visão geral");
    const { getUserInfo } = usePostHome();
    const { isFollowing, isFollowingUser, followUser, unfollowUser, setOtherUserId, setUserId, setFollow} = useFollowSystem();
    const [ userStored, setUserInfos ] = useState<UserInterface>();
    const navigation = useNavigation<NavigationPropStack>();
    const navigationBottom = useNavigation<BottomBarProps>();

    const getData = async () => {
        const dataSnapshot = await getUserInfo(route.params.userId);
            if (dataSnapshot.exists())
            {
                const userData = dataSnapshot.data();
                console.log(userData?.Nickname)

                let ImageURL = null;

                if (userData?.profileImage)
                {
                    ImageURL = await fetchImageProfile(userData?.profileImage)
                }
                
                setUserInfos({
                    Realname: userData?.name,
                    Username: userData?.username,
                    Description: userData?.description,
                    profileImage: ImageURL,
                    Followers: userData?.Followers,
                    Following: userData?.Following,
                });
            }else{
                console.log("Data do not exists");
            }
    }

    useEffect(() => {
        setOtherUserId(route.params.userId);
        setUserId(auth.currentUser?.uid);
        isFollowingUser(auth.currentUser?.uid, route.params.userId);
        console.log("Esse usuário esta sendo seguido: " + isFollowing);
        getData();
        if (route.params.userId === auth.currentUser?.uid)
        {
            navigationBottom.navigate('Profile');
        }
    },[route.params.userId, isFollowing])


    function switcherActive(key: string) {
        if (key === "Visão geral") {
            setPostViewSwitcher("Visão geral")
        }
        if (key === "Posts") {
            setPostViewSwitcher("Posts")
        }
        if (key === "Respostas") {
            setPostViewSwitcher("Respostas")
        }
    }

    return (
        <View style={[styles.root, styles.defaultRootBackground]}>
                    <PseudoHeader navigate="Home" headerTitle={userStored?.Username} />
                    <ScrollView style={styles.container}>
                        <View style={[styles.mT3, styles.pB3, { borderColor: "#C3C8D7", borderBottomWidth: 3 }]}>
                            <View style={[styles.flexDirectionRow, styles.justifyContentBetween, styles.mV2]}>
                                <View style={[styles.flexDirectionRow, styles.gap2, styles.alignItemsCenter]}>
                                    <Image source={ userStored?.profileImage != null ? { uri: userStored.profileImage} : require("../images/Profile_avatar_placeholder_large.png")}
                                        style={{ objectFit:'fill', borderRadius: 100, width: 72, height: 72, borderColor: "#C3C8D7", borderWidth: 3 }} />
                                    <View style={[styles.gap1]}>
                                        <Text style={{ fontWeight: "800", fontSize: 14 }}>@{userStored?.Username}</Text>
                                        <Text style={{ color: "#7B8499", fontSize: 12 }}>{userStored?.Realname}</Text>
                                    </View>
                                </View>
                                <View style={styles.justifyContentCenter}>
                                    {isFollowing == false ? 
                                    <TouchableOpacity onPress={() => { followUser(auth.currentUser?.uid, route.params.userId) }} style={[styles.pH4, styles.pV1, styles.alignItemsCenter, styles.justifyContentCenter, { backgroundColor: "#20202A", borderRadius: 10 }]}>
                                        <Text style={{ color: "#EEF2F9", fontWeight: 600 }}>Seguir</Text>
                                    </TouchableOpacity> : (
                                        <TouchableOpacity onPress={() => { unfollowUser(auth.currentUser?.uid, route.params.userId) }} style={[styles.pH4, styles.pV1, styles.alignItemsCenter, styles.justifyContentCenter, { backgroundColor: "#EEF2F9", borderRadius: 10 }]}>
                                        <Text style={{ color: "#20202A", fontWeight: 600 }}>Seguindo</Text>
                                    </TouchableOpacity>
                                    )}
                                    
                                </View>
                            </View>
                            <View style={[styles.justifyContentBetween, styles.flexDirectionRow]}>
                                <View style={styles.gap2}>
                                    <View style={{maxWidth:140}}>
                                        <Text style={{ fontWeight: "700", fontSize: 14 }}>{userStored?.Description ? userStored?.Description : "Nada informado."}</Text>
                                    </View>
                                    <View style={[styles.flexDirectionRow, styles.gap2]}>
                                        <Text style={{ fontSize: 12, fontWeight: 700 }}>{userStored?.Following.length} <Text style={{ fontWeight: 500, color: "#7B8499" }}> Seguindo</Text></Text>
                                        <Text style={{ fontSize: 12, fontWeight: 700 }}>{userStored?.Followers.length}<Text style={{ fontWeight: 500, color: "#7B8499" }}> Seguidores</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.flexDirectionRow, styles.mV5, styles.justifyContentCenter]}>
                            <Pressable onPress={() => switcherActive("Visão geral")} style={[styles.pV2, styles.alignItemsCenter, styles.justifyContentCenter, { flex: 1, backgroundColor: postViewSwitcher === "Visão geral" ? "#54A7F4" : "#E5E7EF", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]} >
                                <Text>Visão geral</Text>
                            </Pressable>
                            <Pressable onPress={() => switcherActive("Posts")} style={[styles.pV2, styles.alignItemsCenter, styles.justifyContentCenter, { flex: 1, backgroundColor: postViewSwitcher === "Posts" ? "#54A7F4" : "#E5E7EF", }]} >
                                <Text>Posts</Text>
                            </Pressable>
                            <Pressable onPress={() => switcherActive("Respostas")} style={[styles.pV2, styles.alignItemsCenter, styles.justifyContentCenter, { flex: 1, backgroundColor: postViewSwitcher === "Respostas" ? "#54A7F4" : "#E5E7EF", borderTopRightRadius: 10, borderBottomRightRadius: 10 }]} >
                                <Text>Respostas</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
    );
}