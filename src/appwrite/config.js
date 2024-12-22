import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

// **This file is for Database services only (to creae post/ update/ delete etc)

// Class for Database Services
export class Services {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    
  }

  // Creating all file services inside this only like (createFile, updateFile, deleteFile, getFile, getAllFile)

  // create post / document
  async createPost({ title, slug, content, featuredImage, userId, status }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        // slug,  // slug will be used as document id everywhere in this project
        // userId=ID.unique(),
        {
          // other data that has to be passed
          title,
          content,
          featuredImage,
          userId,
          status,
        }
      )
    } catch (error) {
      console.log("Error is : ", error);
      
      throw error;
    }
  }

  // update post / document
  async updatePost(slug, { title, content, featuredImage, userId, status }) {
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content, 
                featuredImage,
                userId, 
                status,
            }
        )
    } catch (error) {
        throw error;

    }
  }


  // Delete post / document
  async deletePost(slug) {
    try {
        return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
    } catch (error) {
        throw error;
        return false;
    }
  }

  // get individual post 
  async getPost(slug) {
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        throw error;
    }
  } 

  // get all posts
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
        return this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        throw error;
    }
  }

  // Shifiting all the file services to this to solve the issue


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



// Object instance for the above service
const service = new Services();

export default service;