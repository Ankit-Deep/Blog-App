// This file stores/ maps which user liked which post/ blog
import { Client, Databases, Storage } from "appwrite";
import conf from "../conf/conf";

export class HashLikes {
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

  



}
