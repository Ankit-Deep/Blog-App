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
  async createAccount(data) {
    try {
      const user = await this.account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name
      );

      if (user) {
        // Automattically log in the user if he has created the account
        console.log("New data: ", user);
        console.log("New Account $id: ", user.$id);

        // this.logIn({email, password});
        return user;
      } else {
        return user;
      }
    } catch (error) {
      console.error("Can't Create account : ", error);
      throw error.message;
    }
  }

  // async method to log in a user
  async logIn({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login failed : ", error.message);
      throw error.message;
    }
  }

  // async method for logging out the user
  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Can't log out : ", error);
      throw error.message;
    }
  }

  // async method to check if user is logged in or out
  async getCurrentState() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Can't get Current user state: ", error);
      // throw error;
    }
  }

  // get identities
  async getPreference() {
    try {
      const prefs = await this.account.getPrefs();
      if (prefs) {
        return prefs;
      }
    } catch (error) {
      console.log("Can't get current identity: ", error);
      throw error;
    }
  }
}

// Object instance for AuthService class
const authService = new AuthService();

// Exporting the authService object because whenever we have to use any anything from the above class we can use this object
export default authService;
