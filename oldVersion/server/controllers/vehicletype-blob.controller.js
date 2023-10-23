import { BlobServiceClient } from "@azure/storage-blob";


const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER);

// Upload file.  Whoever calls this add --app.post("/upload", upload.single("file"), uploadFile);
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
    await blockBlobClient.uploadData(file.buffer);

    res.status(200).send("File uploaded to Azure Blob storage");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get file 
export const getFile = async (req, res) => {
  
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
      res.status(500).json({ error: 'Failed to Get' });
    }
  }
};
// async function streamToBuffer(readableStream) {
//   return new Promise((resolve, reject) => {
//       const chunks = [];
//       readableStream.on('data', (data) => {
//           chunks.push(data instanceof Buffer ? data : Buffer.from(data));
//       });
//       readableStream.on('end', () => {
//           resolve(Buffer.concat(chunks));
//       });
//       readableStream.on('error', reject);
//   });
// }

// Delete file
export const deleteFile = async (req, res) => {
  try {
    const fileName = req.params.fileName;
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.delete();
  res.status(200).send("File deleted from Azure Blob storage");
    
  } catch (error) {
    console.log(error);
    res.status(404).send("The requested resource does not exist to be deleted.")
  }
  
};

// Get all file names
export const getFileNames = async (req, res) => {

  let fileNames = [];

  // Get container client
  const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER);

  // Get list of all blobs in container
  const blobs = containerClient.listBlobsFlat();

  // Loop through blobs, adding each name to array
  for await (const blob of blobs) {
    fileNames.push(blob.name);
  }
  fileNames.push("Total Files:==========  " + fileNames.length);

  res.status(200).json(fileNames);

}