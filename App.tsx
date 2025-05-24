import React from "react";
import { View } from "react-native";
import { styles } from "./src/styles/GlobalStyles";
import ButtonDefault from "./src/components/ButtonDefault";
import ButtonDark from "./src/components/ButtonDark";
import ButtonLoginGoogle from "./src/components/ButtonLoginGoogle";
import InputUser from "./src/components/InputUser";
import { Stack } from "./src/routes/Stack";

const App:React.FC = () => {
  return(
    <Stack/>
  );
}

export default App;