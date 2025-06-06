import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { ButtonDark } from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { BottomBarProps } from "../routes/BottomBar";
import { db } from "../firebase/connectionFirebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Header } from "@react-navigation/elements";
import InputUser from "../components/InputUser";
import { ButtonDefault } from "../components/ButtonDefault";

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
    const [userEmail, setEmail] = useState<string>('');

    return (
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                <View style={[styles.gap3]}>
                    <InputUser valueInput={userName} ImageInputUser={require('../images/userInputIcon.png')} PlaceHolderInputUser="Alterar seu nome" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={userEmail} ImageInputUser={require('../images/ic_outline-email.png')} PlaceHolderInputUser="Alterar e-mail" textInsert={(value) => setEmail(value)} inputSecure={false} autoCapitalize="words" />
                    <ButtonDefault PlaceHolderButtonDefault="Confirmar" functionButtonDefault={() => { }} isDisabled={false} />
                </View>
            </View>
        </View>
    )
}

const UserPasswordOptions = () => {
    const [userName, setName] = useState<string>('');
    const [userEmail, setEmail] = useState<string>('');

    return (
        <View style={[styles.root]}>
            <View style={[styles.container]}>
                <View style={[styles.gap3]}>
                    <InputUser valueInput={userName} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Digite sua senha antiga" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={userName} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Alterar senha" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={userEmail} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Confirmar senha" textInsert={(value) => setEmail(value)} inputSecure={false} autoCapitalize="words" />
                    <ButtonDefault PlaceHolderButtonDefault="Confirmar" functionButtonDefault={() => { }} isDisabled={false} />
                </View>
            </View>
        </View>
    )
}

const AdditionalInfoOptions = () => {
    const [userName, setName] = useState<string>('');
    const [userEmail, setEmail] = useState<string>('');

    return (
        <View style={[styles.root]}>
            <View style={[styles.container, styles.alignItemsCenter, styles.mB5, styles.gap3]}>
                <Image source={require("../images/Profile_avatar_placeholder_large.png")} style={{width: 136, height: 136, borderRadius: 100, borderWidth: 3, borderColor: "#54A7F4"}}/>
                <TouchableOpacity style={[styles.pH5, styles.pV1, {backgroundColor: "#20202A", borderRadius: 10}]}>
                    <Text style={{fontSize:16, color: "#EEF2F9"}}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.container]}>
                <View style={[styles.gap3]}>
                    <InputUser valueInput={userName} ImageInputUser={require('../images/penIcon.png')} PlaceHolderInputUser="Alterar apelido de usuário" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <InputUser valueInput={userName} ImageInputUser={require('../images/penIcon.png')} PlaceHolderInputUser="Criar descrição(max 20 letras)" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words" />
                    <ButtonDefault PlaceHolderButtonDefault="Confirmar" functionButtonDefault={() => { }} isDisabled={false} />
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