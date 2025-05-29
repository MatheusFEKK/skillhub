import { ImageSourcePropType } from "react-native";
import { CommentObj } from "./CommentObject";

export type PostObj = {
    IdPost?:string;
    UIDUser?:string;
    ImagePost?:ImageSourcePropType;
    DescriptionPost?: string;
    LikeCount?:number;
    DeslikeCount?:number;
    ViewCount?:number;
    CommentsPost?:CommentObj[];
}