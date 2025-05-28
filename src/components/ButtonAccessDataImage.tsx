import { View, Image } from "react-native";
import { styles } from "../styles/GlobalStyles";

export const AcessDataImage:React.FC = () => {
    return(
        <View style={[styles.borderRadius3, styles.backgroundTransparent, styles.alignItemsCenter, styles.justifyContentCenter, {borderWidth:2, borderColor:'#C3C8D7', width:32, height:32}]}>
            <Image source={require('../images/GalleryIcon.png')} />
        </View>
    );
}