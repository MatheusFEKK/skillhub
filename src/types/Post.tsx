import { CommentObj } from "./CommentObject";

export interface Post{
    Username:string;
    Realname:string;
    IdPost:string;
    UIDUser?:string;
    ImagePost?:string | null;
    DescriptionPost?: string;
    Likes?:[];
    Deslikes?:[];
    ViewCount?:number;
    CommentsPost?:CommentObj[] | null;
    LikeFunction?: () => void;
    DeslikeFunction?: () => void;
    onSubmit?: () => void;
    VerifyLikeDeslike?: boolean;
}

export type PostArray = Post[];