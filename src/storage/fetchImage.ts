async function fetchImage (nameFile:string)
{
    const response = await fetch(`http://192.168.64.74/storageSkillHub/imageFiles/${nameFile}`)

    return response.url
   
}
export default fetchImage;