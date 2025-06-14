async function fetchImage (nameFile:string)
{
    const response = await fetch(`http://192.168.22.47/storageSkillHub/imageFiles/${nameFile}`)

    return response.url
   
}
export default fetchImage;