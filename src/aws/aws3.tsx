import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";

export const UploadFile = async (key: any, filePath: any) => {
    const client = new S3Client({});
    const bucketName = "pitwapp"
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: filePath
    });

    try {
        const response = await client.send(command);

        console.log(response);

    }catch(error)
    {
        if (error instanceof S3ServiceException && error.name === "EntityTooLarge")
        {
            console.error(`Error from S3 while uploading object to ${bucketName}. \
                The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
                or the multipart upload API (5TB max)`);
        } else if (error instanceof S3ServiceException)
        {
            console.error(`Error from S3 while uploading object to ${bucketName}.  ${error.name}: ${error.message}`)
        }else{
            throw error;
        }
    }
}