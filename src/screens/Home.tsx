import { View } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";


export const Home:React.FC = () => {
    return(
        <View style={[styles.container, styles.alignItemsCenter]}>
            <PostTemplate UserImage={require('../images/userIcon.png')} Username="MatheusFEKK" Realname="Matheus Felipe Lazarini Braghin"/>
            
        </View>
    );
}
