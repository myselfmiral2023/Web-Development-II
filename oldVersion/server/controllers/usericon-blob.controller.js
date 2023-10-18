import { BlobServiceClient } from "@azure/storage-blob";


const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER_USERICON);

// Upload user profile image
export const uploadUserProfileImage = async (req, res) => {
    try {
      const file = req.file;
  
      const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
      await blockBlobClient.uploadData(file.buffer);
  
      res.status(200).send("User profile uploaded to Azure Blob storage");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  // Get user profile image
export const getUserProfileImage = async (req, res) => {
  
    try {
      const fileName = req.params.fileName;
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      // const downloadBlockBlobResponse = await blockBlobClient.download();
      // res.set('Content-Type', 'image/jpeg');
      //res.status(200).send(downloadBlockBlobResponse.readableStreamBody);
      res.status(200).send(blockBlobClient.url);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to Get user profile' });
      }
    }
  };

  // Delete user profile
export const deleteUserProfileImage = async (req, res) => {
    const fileName = req.params.fileName;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  
    await blockBlobClient.delete();
    res.status(200).send("User profile deleted from Azure Blob storage");
  };
  
  // Get all user profile images
  export const getUserProfileImageNames = async (req, res) => {
  try {
    
  
    let fileNames = [];
  
    // Get container client
    const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER_USERICON);
  
    // Get list of all blobs in container
    const blobs = containerClient.listBlobsFlat();
  
    // Loop through blobs, adding each name to array
    for await (const blob of blobs) {
      fileNames.push(blob.name);
    }
    fileNames.push("Total user images:==========  " + fileNames.length);
  
    res.status(200).json(fileNames);
  } catch (error) {
    res.status(500).json(error);
  }
  
  }