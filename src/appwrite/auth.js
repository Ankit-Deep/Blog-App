import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

// **This file is for auth services only

// Creating a class for authentication
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // async method to sign up / create account for a user
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (user) {
        // Automattically log in the user if he has created the account
        return this.logIn({email, password});
      } else {
        return user;
      }
    } catch (error) {
      console.error("Can't Create account : ", error);
      throw error;
    }
  }

  // async method to log in a user
  async logIn({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login failed : ", error);
      throw error;
    }
  }

  // async method for logging out the user
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Can't log out : ", error);
      throw error;
    }
  }

  // async method to check if user is logged in or out
  async getCurrentState() {
    try {
      return await this.account.get();
    } catch (error) {
      //    console.log("Appwrite serive :: getCurrentUser :: error", error);
      console.error("Can't get Current user state: ", error);
      throw error;
    }
  }
}

// Object instance for AuthService class
const authService = new AuthService();

// Exporting the authService object because whenever we have to use any anything from the above class we can use this object
export default authService;
