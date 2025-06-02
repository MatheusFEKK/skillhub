import { ImageSourcePropType } from "react-native";
import { CommentObj } from "./CommentObject";

export interface Post{
    Username:string;
    Realname:string;
    IdPost?:string;
    UIDUser?:string;
    ImagePost?:ImageSourcePropType | null;
    DescriptionPost?: string;
    Likes?:[];
    Deslikes?:[];
    ViewCount?:number;
    CommentsPost?:CommentObj[];
}

export type PostArray = Post[];