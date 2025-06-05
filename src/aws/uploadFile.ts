import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";
import { client } from "./awsConfig";
import { Buffer } from "buffer";
import * as FileSystem from 'expo-file-system';

export const UploadFile = async (bucketName:string, key:string, filePath:string) => {
    const pathOnS3 = `social/${key}`

    const fileData = await FileSystem.readAsStringAsync(filePath, { encoding:FileSystem.EncodingType.Base64 });

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: pathOnS3,
        Body: Buffer.from(fileData, 'base64'),
    });

    try{
        const response = await client.send(command);
        console.log(response);
    }catch (error)
    {
        if (error instanceof S3ServiceException && error.name === "EntityTooLarge")
        {
            return`Error from S3 while uploading object to ${bucketName}. \
            The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
            or the multipart upload API (5TB max).`
        }else if (error instanceof S3ServiceException)
        {
            return `Error from S3 while uploading object to ${bucketName}. ${error.name}: ${error.message}`
        }else{
            throw error;
        }
    }
};