// This file holds the file services (like upload , delete , get)
import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

// **This file is for file services only

//Class for File services (image files)
export class FileServices {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  // file upload
  async fileUpload(file) {
    try {
      return this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  // get file preview
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const fileService = new FileServices();

export default fileService;
