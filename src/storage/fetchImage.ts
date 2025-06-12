async function fetchImage (nameFile:string)
{
    const response = await fetch(`http://10.75.45.26/storageSkillHub/imageFiles/${nameFile}`)

    return response.url
   
}
export default fetchImage;