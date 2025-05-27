import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "../styles/GlobalStyles";
import ButtonDefault from "../components/ButtonDefault";
import InputUser from "../components/InputUser";
import { ButtonGroup } from "../components/ButtonGroup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/connectionFirebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import { UserConditions } from "../components/CheckBoxUser";
import ValidatePassword from "../hooks/PasswordValidation";
import { BottomBarProps } from "../routes/BottomBar";

interface userObj {
    name:string;
    username: string;
}

export const AuthScreen:React.FC = () => {
    const navigation = useNavigation<NavigationPropStack>();

    const [ buttonActivated, buttonActive ] = useState(0);
    const [ user, setUser ] = useState('');
    const [ userInfo, setUserInfo ] = useState<userObj | null>(null);
    const [ message, setMessage ] = useState<string | null>(null);
    const [ username, setUsername ] = useState<string>('')
    const [ name, setName ] = useState<string>(''); 
    const [ email, setEmail ] = useState<string>(''); 
    
    
    const { password, setPassword, passwordLengthRequirement, passwordHaveNumber, passwordHaveSpecialCaptalize, canProceed, setUserCondition, userConditions } = ValidatePassword();

    const [ passwordConfirm, setPasswordConfirm ] = useState<string>(''); 

    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        console.log("All inputs has been clean!");
    },[buttonActivated])

   /* const getDataInfo = async (uid:string) =>
    {
        const dataRef = doc(db, "users/", uid);
        const userInfo = await getDoc(dataRef);

        if (userInfo.exists())
        {
            console.log("Trying to get the data of the user " + user +userInfo.data().username);
            setUserInfo(userInfo.data().username);
        }
    }
        Function to get user information.
    */

    const signUpUser = async () =>
    {
        if (name != '' && email != '' && password != '')
        {
            if (password == passwordConfirm)
            {
                console.log("Sign-Up function called!");

                const data = 
                {
                    name: name,
                    username: username,
                }

                try{
                    
                    const response = await createUserWithEmailAndPassword(auth, email, password)
            
                        console.log("Here's the data that will be sended with the created account: " + data.username + response.user.uid)
    
                        const dataRef = doc(db, "users", response.user.uid);
    
                        await setDoc(dataRef, data)
                        .then((response) => {
                            Alert.alert("Signup sucessfully!")
                            console.log("Document has been added successfully");
                        })
                        .catch(error => {
                            console.log("Error trying to store in the firestore! "+ error)
                        })
                }catch(error)
                {
                    console.log("Error occured trying to create the account and storing in the firestore " + error);
                }

            }else
            {
                setMessage("The passwords doens't match")
            }

    
        }
        else
        {
            setMessage("Fill all the inputs to proceed...")
        }
    }

    const loginUser = () => 
    {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredencial) => console.log(userCredencial.user.toJSON()))
        Alert.alert("Logged with sucess!");
    }

    return(
    <View style={styles.root}>
        
      <View style={[ styles.container, styles.gap3]}>
            <Text style={{color:'red'}}>{message}</Text>
            <View >
                <ButtonGroup Activated={buttonActivated} textButton1="Login" textButton2="Inscreva-se" functionButton1={(value) =>buttonActive(value)} functionButton2={(value) =>buttonActive(value)}/>
            </View>

        {buttonActivated == 0 ? (
            <View style={[styles.gap3]}>
                
                <InputUser valueInput={email} ImageInputUser={require('../images/ic_outline-email.png')} PlaceHolderInputUser="E-mail" textInsert={(value) => setEmail(value)} inputSecure={false} autoCapitalize="none"/>

                <InputUser valueInput={password} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Senha" textInsert={(value) => setPassword(value)} inputSecure={true} autoCapitalize="none"/>
            
                <ButtonDefault PlaceHolderButtonDefault="Login" functionButtonDefault={() => loginUser()}/>
            </View>
        ): 
            <View style={[styles.gap2]}>
                
                <InputUser valueInput={name} ImageInputUser={require('../images/userInputIcon.png')} PlaceHolderInputUser="Insira seu nome" textInsert={(value) => setName(value)} inputSecure={false} autoCapitalize="words"/>

                <InputUser valueInput={username} ImageInputUser={require('../images/penIcon.png')} PlaceHolderInputUser="Crie um apelido de usuário" textInsert={(value) => setUsername(value)} inputSecure={false} autoCapitalize="none" maxLength={18}/>


                <InputUser valueInput={email} ImageInputUser={require('../images/ic_outline-email.png')} PlaceHolderInputUser="E-mail" textInsert={(value) => setEmail(value)} inputSecure={false} autoCapitalize="none"/>

                <InputUser valueInput={password} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Senha" textInsert={(value) => setPassword(value)} inputSecure={false} autoCapitalize="none" maxLength={18}/>

                <InputUser valueInput={passwordConfirm} ImageInputUser={require('../images/passwordIcon.png')} PlaceHolderInputUser="Confirmar senha" textInsert={(value) => setPasswordConfirm(value)} inputSecure={true} autoCapitalize="none" maxLength={18}/>
                <View style={styles.gap1}>

                
                    <UserConditions CheckIsDisabled={false} TextCondition={"Pelo menos 8 caracteres"} isChecked={passwordLengthRequirement} />

                    <UserConditions CheckIsDisabled={false} TextCondition={"Pelo menos um número"} isChecked={passwordHaveNumber} />

                    <UserConditions CheckIsDisabled={false} TextCondition={"Pelo menos uma letra maiúsculo ou um caracter especial"} isChecked={passwordHaveSpecialCaptalize}/>

                    <UserConditions  CheckIsDisabled={false} TextCondition={"Ao criar uma conta você concorda com os termos e\n condições, de uso em um contrato legal."} isChecked={userConditions} OnChangeCheck={(value) => setUserCondition(value)}/>

                </View>
                    <ButtonDefault PlaceHolderButtonDefault="Inscrever-se" functionButtonDefault={() => signUpUser()} isDisabled={canProceed}/>
                  
            </View>
                }
        </View>
    </View>
    );
}