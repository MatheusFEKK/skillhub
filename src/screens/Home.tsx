import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";
import { AccessDataImage } from "../components/ButtonAccessDataImage";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";

export const Home:React.FC = () => {
    const navigation = useNavigation<NavigationPropStack>();
    return(
        <View style={[styles.root]}>
            <View style={[styles.container, styles.alignItemsCenter]}>
                    <TouchableOpacity style={[styles.containerToPost, styles.alignItemsCenter, styles.justifyContentCenter, styles.p2, styles.gap2]} onPress={() => navigation.navigate("CreatePost")}>
                        <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.alignSelfStart]}>
                            <Image source={require('../images/userIcon.png')} />
                            <Text style={[styles.fontSize3, styles.colorTextLightGrey, styles.mL1]}>Compartilhe sua ideia...</Text>
                        </View>
                        <View style={[styles.container, styles.flexDirectionRow,{borderTopWidth:2, borderColor:'#C3C8D7'}]}>
                            <AccessDataImage AccessButtonImage={require('../images/GalleryIcon.png')} />
                        </View>
                    </TouchableOpacity>
                <PostTemplate UserImage={require('../images/userIcon.png')} Username="MatheusFEKK" Realname="Matheus Felipe Lazarini Braghin" TextPost={"Quais técnicas devo aplicar para obter cores mais coerentes e vibrantes Recordo-me de ter lido os..."}/>

            </View>
        </View>
    );
}
