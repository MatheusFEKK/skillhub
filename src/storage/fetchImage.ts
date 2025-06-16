async function fetchImage (nameFile:string)
{
    const response = await fetch(`http://192.168.1.109/storageSkillHub/imageFiles/${nameFile}`)

    return response.url
   
}
export default fetchImage;