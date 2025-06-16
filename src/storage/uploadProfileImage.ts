export const UploadProfileImage = async (fileURI:string | undefined, fileName:string | null | undefined) => {
        
        const formData = new FormData();
        
        formData.append('profileImageUpload', {
            uri:fileURI,
            type:'image/jpeg',
            name:fileName,
        } as any); 
        
        try{
            await fetch('http://192.168.22.47/storageSkillHub/endpoints/profilePhotoUpload.php', 
                {
                    method:'POST',
                    body:formData,
                    headers:{
                    },
                },
            );
        }catch(error){
            console.log(error)
        }
    }