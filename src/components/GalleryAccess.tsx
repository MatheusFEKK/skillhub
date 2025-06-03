import { useState } from "react";
import { styles } from "../styles/GlobalStyles";
import * as ImagePicker from 'expo-image-picker';
import { Modal, Button, Image, TouchableOpacity, Text } from "react-native";

interface ImagePickerProps{
    VisibilityGallery: boolean;
    ChangeVisibility: () => void;
}

export const ImagePickerComponent:React.FC<ImagePickerProps> = (props) => {
   
    return(
        <Modal visible={props.VisibilityGallery} style={styles.container}>
            <Button title={"Pick an image from the cmaera roll"} onPress={pickImage} />
            
            <TouchableOpacity onPress={props.ChangeVisibility}>
                <Text>X</Text>
            </TouchableOpacity>
        </Modal>
    )
}