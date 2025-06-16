import { Text, Modal } from "react-native";
import { CommentObj } from "../types/CommentObject";
import { useEffect } from "react";

export const ModalCommentReply:React.FC<CommentObj> = (props) => {
    useEffect(() => {
        console.log(props.ModalVisible)
    },[props.ModalVisible])
    return(
        <Modal visible={props.ModalVisible}>
            <Text>{props.Comment}</Text>
        </Modal>
    );
}