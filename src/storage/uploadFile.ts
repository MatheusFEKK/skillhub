import { v4 as uuid } from 'uuid'

export const UploadFile = async (fileURI:string) => {
        const randomNameFile = uuid() + '.jpg';
        const formData = new FormData();
        
        formData.append('uploadFile', {
            uri:fileURI,
            type:'image/jpeg',
            name:randomNameFile,
        } as any); 
        formData.append('testing', 'teste');
        
        try{
            await fetch('http://192.168.0.107/storageSkillHub/receiveFile.php', 
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