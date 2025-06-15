async function fetchImageProfile (nameFile:string)
{
    const response = await fetch(`http://192.168.1.109/storageSkillHub/imageProfile/${nameFile}`)

    return response.url
   
}
export default fetchImageProfile;