import { v4 as uuid } from 'uuid'


export const UploadFile = async (filePath:string) => {
    const randomKeyFile = uuid();
    const response = await fetch(filePath);

    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append('uploadFile', imageBlob, randomKeyFile+".jpeg");
    formData.append('jsonData', JSON.stringify(randomKeyFile));
    console.log(formData);
    const URL:string = 'http://10.75.45.30/storageServer/receiveFile.php/'
    

        const uploadResponse = await fetch (URL, {
            method:'POST',
            body:formData,
        });

        if (uploadResponse.ok)
        {
            const responseText = await uploadResponse.text();
            console.log("Uploaded with success " + responseText);
        }else{
            console.log("Upload failed " + uploadResponse.statusText);
        }
        // const responseJson = await data.json();
        // if (responseJson.status == 1)
        // {
        //     console.log("Connected with the storage server")
        // }else{
        //     console.log("Failed connection");
        // }
    
            // const uploadResponse = await fetch(URL, {
            //     method:'POST',
            //     body: formData,
            //     headers:{
            //         'Content-Type': 'multipart/form-data;',
            //     },
            // }).then((response) => {
            //     console.log(response.json());
            // })
            // .catch((response) => {
            //     console.log(response.json);
            // })
        
}