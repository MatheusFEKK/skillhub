export type CommentOfTheCommentsObj = {
    UIDUser?:string | undefined | null,
    ImageUser?:() => Promise<string> | undefined | null,
    Username?:string | undefined | null,
    Realname?:string | undefined | null,
    Comment:string | undefined | null,
}


export type CommentObj = {
    Comment:string,
    CommentsOfThatComment:[CommentOfTheCommentsObj],
    ImageUser:string,
    Realname:string,
    Username:string,
    UIDUser:string,
    ModalVisible?:boolean,
    ChangeVisibility: () => void,
}

