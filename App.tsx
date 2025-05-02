import React from "react";
import { View } from "react-native";
import { styles } from "./src/styles/GlobalStyles";
import ButtonDefault from "./src/components/ButtonDefault";
import ButtonDark from "./src/components/ButtonDark";
import ButtonLoginGoogle from "./src/components/ButtonLoginGoogle";
import InputUser from "./src/components/InputUser";

const App:React.FC = () => {
  return(
    <View style={styles.container}>

      <ButtonDark PlaceHolderButtonDark={'Entrar'}/>
      <ButtonDefault PlaceHolderButtonDefault={'Cadastrar'}/>
      <ButtonLoginGoogle />

      <InputUser PlaceHolderInputUser={'Digite seu e-mail'} ImageInputUser={require('./src/images/ic_outline-email.png')}/>


    </View>
  );
}

export default App;