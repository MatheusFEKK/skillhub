export type CommentOfTheCommentsObj = {
    IdPost:string | undefined | null;
    IdComment: string | undefined | null;
    UIDUser?:string | undefined | null;
    ImageUser?:() => Promise<string> | undefined | null;
    Username?:string | undefined | null;
    Realname?:string | undefined | null;
    Comment:string | undefined | null;
}


export type CommentObj = {
    Comment:string;
    ImageUser:string;
    Realname:string;
    Username:string;
    UIDUser:string;
    ModalVisible?:boolean;
    ChangeVisibility: () => void;
    IdPost:string;
    IdComment:string;
    IdCommentFather?:string;
}

