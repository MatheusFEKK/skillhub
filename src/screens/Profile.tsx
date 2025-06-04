import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import ButtonDark from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { BottomBarProps } from "../routes/BottomBar";
import { db } from "../firebase/connectionFirebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";

export const ProfileUser: React.FC = () => {

    const [userName, setUserName] = useState<string | null>();

    async function getUserNameProfile() {
        const usuario = auth.currentUser;
        const idUsuario = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUsuario);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserName(docSnap.data()?.name);
        } else {
            console.log("User does not exists");
        }
    }
    useEffect(() => {
        getUserNameProfile();

    }, [])





    const signOutUser = async () => {
        try {
            await signOut(auth)
            console.log("Disconnect from the account!");
        } catch (error) {
            console.log("It was not possible to log out from the app! " + error);
        }
    }
    const navigation = useNavigation<BottomBarProps>();

    return (
        <View style={[styles.root, {backgroundColor: "#EEF2F9"}]}>
            <PseudoHeader navigate="Home" headerTitle={userName} />
            <ScrollView>
                <View style={[styles.container, styles.mT3, styles.pB3, { borderColor: "#C3C8D7", borderBottomWidth: 3 }]}>
                    <View style={[styles.flexDirectionRow, styles.justifyContentBetween, styles.mV2]}>
                        <View style={[styles.flexDirectionRow, styles.gap2, styles.alignItemsCenter]}>
                            <Image source={require("../images/Profile_avatar_placeholder_large.png")}
                                style={{ borderRadius: 100, width: 72, height: 72, borderColor: "#C3C8D7", borderWidth: 3 }} />
                            <View style={[styles.gap1]}>
                                <Text style={{ fontWeight: "800", fontSize: 14 }}>@KaiserStudant</Text>
                                <Text style={{ color: "#7B8499", fontSize: 12 }}>Gael Lopes</Text>
                            </View>
                        </View>
                        <View style={styles.justifyContentCenter}>
                            <TouchableOpacity style={[styles.pH4, styles.pV1, styles.alignItemsCenter, styles.justifyContentCenter, { backgroundColor: "#20202A", borderRadius: 10 }]}>
                                <Text style={{ color: "#EEF2F9", fontWeight: 600 }}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.justifyContentBetween, styles.flexDirectionRow]}>
                        <View style={styles.gap2}>
                            <Text style={{ fontWeight: "700", fontSize: 14 }}>Descrição placeholder</Text>
                            <View style={[styles.flexDirectionRow, styles.gap2]}>
                                <Text style={{ fontSize: 12, fontWeight: 700 }}>14 <Text style={{ fontWeight: 500, color: "#7B8499" }}> Seguindo</Text></Text>
                                <Text style={{ fontSize: 12, fontWeight: 700 }}>140<Text style={{ fontWeight: 500, color: "#7B8499" }}> Seguidores</Text></Text>
                            </View>
                        </View>
                         <View>
                            <Text style={{fontSize:12, fontWeight: 600, color:"#54A7F4"}}>Conquistas</Text>
                         </View>
                    </View>
                </View>
                <View style={[styles.container, styles.flexDirectionRow, styles.mV5]}>
                    <Pressable style={[styles.pV2, styles.pH5, styles.alignItemsCenter, styles.justifyContentCenter,{backgroundColor: "#E5E7EF", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]} >
                        <Text>Visão geral</Text>
                    </Pressable>
                    <Pressable style={[styles.pV2, styles.pH5, styles.alignItemsCenter, styles.justifyContentCenter,{backgroundColor: "#E5E7EF",}]} >
                        <Text>Visão geral</Text>
                    </Pressable>
                    <Pressable style={[styles.pV2, styles.pH5, styles.alignItemsCenter, styles.justifyContentCenter,{backgroundColor: "#E5E7EF",}]} >
                        <Text>Visão geral</Text>
                    </Pressable>
                </View>
                <View style={[styles.container, styles.mV2]}>
                    <ButtonDark PlaceHolderButtonDark="Desconectar" FunctionButtonDark={() => signOutUser()} />
                </View>
            </ScrollView>
        </View>
    )
}