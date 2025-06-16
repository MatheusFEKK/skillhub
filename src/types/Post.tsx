import { CommentObj } from "./CommentObject";

export interface Post{
    Username:string;
    Realname:string;
    profileImage?:string;
    IdPost:string;
    UIDUser?:string;
    ImagePost?:string | null;
    DescriptionPost?: string;
    DescriptionProfile?:string;
    Likes?:[];
    Deslikes?:[];
    ViewCount?:number;
    ImageUser?:string | null;
    CommentsPost?:CommentObj[] | null;
    LikeFunction?: () => void;
    DeslikeFunction?: () => void;
    onSubmit?: () => void;
    VerifyLikeDeslike?: boolean;
    OpenPost?: (postId:string) => void;
    CommentsOfComment?:CommentObj[] | null
} 

export type PostArray = Post[];