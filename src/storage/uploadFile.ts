export const UploadFile = async (fileURI:string, fileName:string) => {
        
        const formData = new FormData();
        
        formData.append('uploadFile', {
            uri:fileURI,
            type:'image/jpeg',
            name:fileName,
        } as any); 
        
        try{
            await fetch('http://192.168.1.109/storageSkillHub/endpoints/uploadFile.php', 
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