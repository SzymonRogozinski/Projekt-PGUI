import appDataJson from '../salesdata.json';
import UserProfile from "./UserProfile";

export default class AppData {
    userProfiles;

    constructor() {
        this.userProfiles = [];
    }
    
}

export function loadProfiles (user)  {
    return appDataJson.filter(el=>el.user.toLowerCase() === user.toLowerCase())[0]?.profiles?.map((profile) =>
        new UserProfile(profile)
    ) ?? [];
}
