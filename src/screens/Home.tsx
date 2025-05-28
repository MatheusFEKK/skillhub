import { View, Text, Image } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostTemplate } from "../components/PostTemplate";
import { AcessDataImage } from "../components/ButtonAccessDataImage";


export const Home:React.FC = () => {
    return(
        <View style={[styles.root]}>
            <View style={[styles.container, styles.alignItemsCenter]}>
                <View style={[styles.containerToPost, styles.alignItemsCenter, styles.justifyContentCenter, styles.padding5, styles.gap2]}>
                    <View style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.alignSelfStart ]}>
                        <Image source={require('../images/userIcon.png')} />
                        <Text style={[styles.fontSize3, styles.colorTextLightGrey, styles.marginLeft1]}>Compartilhe sua ideia...</Text>
                    </View>

                    <View style={[styles.container, styles.flexDirectionRow, {borderTopWidth:2, borderColor:'#C3C8D7'}]}>
                        <AcessDataImage />
                    </View>
                </View>
                <PostTemplate UserImage={require('../images/userIcon.png')} Username="MatheusFEKK" Realname="Matheus Felipe Lazarini Braghin" TextPost={"Quais técnicas devo aplicar para obter cores mais coerentes e vibrantes Recordo-me de ter lido os..."}/>
            </View>
        </View>
    );
}
