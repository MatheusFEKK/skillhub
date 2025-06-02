import { Text, View, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { PostProps } from "../types/Post";



export const PostTemplate:React.FC<PostProps> = (props) => {
    return(
        <View style={[styles.alignItemsCenter, {backgroundColor:'#F4F7FD', width:350, height:500, borderRadius:15}]}>
            <View style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}}>
                <Image width={45} height={45} source={require('../images/userIcon.png')} />
                <View style={{margin:10}}>
                    <Text style={{fontWeight:'bold'}}>{props.Username}</Text>
                    <Text style={{opacity:0.5}}>{props.Realname}</Text>
                </View>
            </View>
                    <View style={[styles.container, {position:'relative', bottom:10}]}>
                        <Text>
                            {props.TextPost}
                        </Text>
                    </View>
            {props.UserImage == undefined ? (
                <View></View>
            ) :
                <View style={{width:310, height:327,backgroundColor:'black', borderRadius:15}}>
                    <Image source={props.UserImage} />
                </View>
            }

                <View style={{position:'absolute',top:420,alignSelf:'flex-start', marginLeft:20, marginTop:40}}>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center',width:58, height:32, outlineColor:'#A1A7B9', outlineWidth:1, borderRadius:15, flexDirection:'row'}}>
                        <Image source={require('../images/message-circle.png')} />
                        <Text style={{color:"#A1A7B9"}}>{props.Comments}</Text>
                    </TouchableOpacity>

                </View>

                <View style={[styles.flexDirectionRow, styles.mR4, styles.gap1,{position:'absolute', top:418, alignSelf:'flex-end', marginTop:40,borderColor:'#A1A7B9', borderWidth:1, borderRadius:40}]}>
                    <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1, {borderStartStartRadius:40}]}>
                        <Text style={[styles.fontWeightSemiBold, {color:'#7B8499'}]}>0</Text>
                        <Image source={require('../images/thumbs-up.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.flexDirectionRow, styles.alignItemsCenter, styles.m1, {borderStartStartRadius:40}]}>
                        <Text style={[styles.fontWeightSemiBold, {color:'#7B8499'}]}>0</Text>
                        <Image source={require('../images/thumbs-down.png')} />
                    </TouchableOpacity>
                </View>
            </View>
    );
}