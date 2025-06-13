async function fetchImageProfile (nameFile:string)
{
    const response = await fetch(`http://10.75.45.30/storageSkillHub/imageProfile/${nameFile}`)

    return response.url
   
}
export default fetchImageProfile;