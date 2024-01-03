import appDataJson from '../salesdata.json';
import UserProfile from "./UserProfile";

export default class AppData {
  userProfiles;
  constructor() {
    this.userProfiles = loadProfiles();
  }
  
}

function loadProfiles() {
  console.log(appDataJson);
  return appDataJson.map((profile)=>
        new UserProfile(profile)
      );
}