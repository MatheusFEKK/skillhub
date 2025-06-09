import { useState, useEffect, use } from "react";
import { UserConditions } from "../components/CheckBoxUser";

const ValidatePassword = () =>
{
    const [ password, setPassword ] = useState<string>(''); 
    const [ passwordLengthRequirement, setLengthRequirement ] = useState(false);
    const [ passwordHaveNumber, setHaveNumber] = useState(false);
    const [ passwordHaveSpecialCaptalize , setSpecialCaptalize] = useState(false);
    const [ canProceed, setToProceed ] = useState(true);
    const [ userConditions, setUserCondition ] = useState(false);

    const regexNumber = /\d+/g;
    const regexCaptalizeLetter =  /[A-Z!@#$%^&*(),.?":{}|<>]/g;


    useEffect(() => {
        const hasMinimumLength:boolean    = password.length > 8;
        const hasNumber:boolean           = regexNumber.test(password);
        const hasSpecialCaptalize:boolean = regexCaptalizeLetter.test(password);

        setLengthRequirement(hasMinimumLength);
        setHaveNumber(hasNumber);
        setSpecialCaptalize(hasSpecialCaptalize);
    }, [password])

    useEffect(() => {
        const FormIsValid = passwordLengthRequirement && passwordHaveNumber && passwordHaveSpecialCaptalize && userConditions
        setToProceed(!FormIsValid);
    },[password, passwordHaveNumber, passwordHaveSpecialCaptalize, userConditions])

    return { password, setPassword, passwordLengthRequirement, passwordHaveNumber, passwordHaveSpecialCaptalize, canProceed, userConditions, setUserCondition};
}
export default ValidatePassword;