import { Text, View, ScrollView, Pressable, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { EmailAuthProvider, getAuth, signOut, User } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { ButtonDark } from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { BottomBarProps } from "../routes/BottomBar";
import { db } from "../firebase/connectionFirebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Assets, Header } from "@react-navigation/elements";
import InputUser from "../components/InputUser";
import { ButtonDefault } from "../components/ButtonDefault";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth/cordova";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { ImagePickerComponent } from "../components/GalleryAccess";
import * as ImagePicker from 'expo-image-picker';
import { UploadProfileImage } from "../storage/uploadProfileImage";
import { v4 as uuid } from 'uuid'
interface childComponentFunction {
    updateHeaderType: (key: number) => void,
    title: string,
    page: number
}

const HeaderDefault = () => {

    return (
        <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween, styles.alignItemsCenter, { height: 45 }]}>
            <Text style={[styles.fontSize3, { fontWeight: "700" }]}>Opções</Text>
            <Image
                source={require("../images/IconPlaceHolderMaxHeightWidth.png")}
                style={{ width: 40, height: 40 }}
            />
        </View>
    )
}

const HeaderUserInfoOptions: React.FC<childComponentFunction> = ({ updateHeaderType, title, page }) => {

    const changeHeaderParent = () => {
        updateHeaderType(page);
    }

    return (
        <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween, styles.alignItemsCenter, { height: 45 }]}>
            <TouchableOpacity onPress={changeHeaderParent}>
                <Image style={{ height: 35, width: 35, objectFit: 'fill' }} source={require("../images/return.png")} />
            </TouchableOpacity>
            <Text style={[styles.fontSize3, { fontWeight: "700" }]}>{title}</Text>
            <Image
                source={require("../images/IconPlaceHolderMaxHeightWidth.png")}
                style={{ width: 40, height: 40 }}
            />
        </View>
    )
}


const UserInfoOptions = () => {
    const [userName, setName] = useState<string>('');

    useEffect(() => {


    }, [])

    async function changeUsername() {
        const usuario = auth.currentUser;
        const idUser = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUser);
        updateDoc(docRef, { ...userName && { name: userName } })
    }


    function getUserEmail() {
        const usuario = auth.currentUser;
        if (usuario !== null) {
            return String(usuario.email)
        }
    }

    return (
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                <View style={[styles.gap3]}>
                    <InputUser valueInput={userName} ImageInputUser={require('../images/userInputIcon.png')} PlaceHolderInputUser="Alterar seu nome" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <View style={[styles.inputUser, styles.flexDirectionRow, styles.borderRadius2, { height: 56 }]}>
                        <Image style={styles.inputIcons} source={require("../images/ic_outline-email_blocked.png")} />
                        <TextInput editable={false} style={{ flex: 1, color: '#7B8499' }} placeholderTextColor={'#20202A'} value={getUserEmail()} />
                    </View>
                    <ButtonDefault PlaceHolderButtonDefault="Confirmar" functionButtonDefault={() => { changeUsername() }} isDisabled={false} />
                </View>
            </View>
        </View>
    )
}

const UserPasswordOptions = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [userName, setName] = useState<string>('');
    const [passwordVerify, setPasswordVerify] = useState<string>('');
    const user = auth.currentUser;


    const mudarSenha =  async ()=>{

        try{
            if (user && user.email) {
                const cred = EmailAuthProvider.credential(
                    user.email,
                    currentPassword
                );
                 await reauthenticateWithCredential(user, cred);
                 await updatePassword(user, passwordVerify);
                 console.log("Senha alterada")
            }

        }catch(error){
            console.log(error)
        }
    } 


    return (
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                <View style={[styles.gap3]}>
                    <InputUser valueInput={currentPassword} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Digite sua senha antiga" textInsert={(value) => setCurrentPassword(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={passwordVerify} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Alterar senha" textInsert={(value) => setPasswordVerify(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={userName} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Confirmar senha" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <ButtonDefault PlaceHolderButtonDefault="Confirmar" functionButtonDefault={() => { mudarSenha()}} isDisabled={false} />
                </View>
            </View>
        </View>
    )
}

const AdditionalInfoOptions = () => {
    const [userNick, setNick] = useState<string>('');
    const [userDescription, setDescription] = useState<string>('');
    const [image, setImage] = useState<ImagePicker.ImagePickerSuccessResult | null>(null);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result);
        }
    }



    async function changeAdditionalInfo() {
        const idImage = uuid() + '.jpeg';
        const usuario = auth.currentUser;
        const idUser = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUser);
        updateDoc(docRef, {
            ...userNick && { name: userNick },
            ...userDescription && { description: userDescription },
            ...image?.assets[0].assetId && { profileImage: idImage }
        })
        UploadProfileImage(image?.assets[0].uri, idImage)
    }



    return (
        <View style={[styles.root]}>
            <View style={[styles.container, styles.alignItemsCenter, styles.mB5, styles.gap3]}>
                <Image source={require("../images/Profile_avatar_placeholder_large.png")} style={{ width: 136, height: 136, borderRadius: 100, borderWidth: 3, borderColor: "#54A7F4" }} />
                <TouchableOpacity style={[styles.pH5, styles.pV1, { backgroundColor: "#20202A", borderRadius: 10 }]} onPress={() => pickImage()}>
                    <Text style={{ fontSize: 16, color: "#EEF2F9" }}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.container]}>
                <View style={[styles.gap3]}>
                    <InputUser valueInput={userNick} ImageInputUser={require('../images/penIcon.png')} PlaceHolderInputUser="Alterar apelido de usuário" textInsert={(value) => setNick(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={userDescription} ImageInputUser={require('../images/penIcon.png')} PlaceHolderInputUser="Criar descrição(max 30 letras)" textInsert={(value) => setDescription(value)} inputSecure={false} autoCapitalize="words" />
                    <ButtonDefault PlaceHolderButtonDefault="Confirmar" functionButtonDefault={() => { changeAdditionalInfo() }} isDisabled={false} />
                </View>
            </View>
        </View>
    )
}

export const UserOptions = () => {
    const [BodyType, setBodyType] = useState<number>(0);

    const updateHeaderType = (key: number) => {

        setBodyType(key);
    }


    const setComponentType = (key: number) => {
        setBodyType(key)
    }

    const bodyComponentType = () => {

        switch (BodyType) {
            case 1:
                return <UserInfoOptions />
                break;
            case 2:
                return <UserPasswordOptions />
                break;
            case 3:
                return <AdditionalInfoOptions />
                break;
            default:
                return <UserInfoOptions />
                break;
        }

    }

    const headerComponentType = () => {
        switch (BodyType) {
            case 1:
                return <HeaderUserInfoOptions updateHeaderType={updateHeaderType} title="Informações de usuário" page={0} />
            case 2:
                return <HeaderUserInfoOptions updateHeaderType={updateHeaderType} title="Alterar senha" page={0} />
            case 3:
                return <HeaderUserInfoOptions updateHeaderType={updateHeaderType} title="Informações adicionais" page={0} />
            default:
                return <HeaderDefault />
                break;
        }
    }


    return (
        <View style={[styles.root, styles.defaultRootBackground]}>
            {BodyType === 0 ? <HeaderDefault /> : headerComponentType()}
            {BodyType === 0 ? <View style={[styles.container, styles.mV3, styles.gap5]}>
                <Pressable onPress={() => setComponentType(1)} style={[styles.flexDirectionRow, styles.gap3, styles.alignItemsCenter]}>
                    <Image source={require("../images/userOptions.png")} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.fontSize4, { fontWeight: "700" }]}>Informações de usuário</Text>
                </Pressable>
                <Pressable onPress={() => setComponentType(2)} style={[styles.flexDirectionRow, styles.gap3, styles.alignItemsCenter]}>
                    <Image source={require("../images/passwordOption.png")} style={{ width: 21, height: 28, objectFit: "fill" }} />
                    <Text style={[styles.fontSize4, { fontWeight: "700" }]}>Alterar senha</Text>
                </Pressable>
                <Pressable onPress={() => setComponentType(3)} style={[styles.flexDirectionRow, styles.gap3, styles.alignItemsCenter]}>
                    <Image source={require("../images/personOption.png")} style={{ width: 23, height: 23 }} />
                    <Text style={[styles.fontSize4, { fontWeight: "700" }]}>Informações adicionais</Text>
                </Pressable>
            </View> : bodyComponentType()}

        </View>
    )
}