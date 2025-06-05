import { ImageSourcePropType } from "react-native";
import { CommentObj } from "./CommentObject";

export interface Post{
    Username:string;
    Realname:string;
    IdPost?:string;
    UIDUser?:string;
    ImagePost?:string;
    DescriptionPost?: string;
    Likes?:[];
    Deslikes?:[];
    ViewCount?:number;
    CommentsPost?:CommentObj[] | null;
}

export type PostArray = Post[];