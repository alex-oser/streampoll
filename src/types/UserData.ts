export interface UserSettings {
  requireTwitchAuth: boolean;
  allowEmailNotifications: boolean;
  allowTwitchNotifications: boolean;
}

export interface UserData {
  email: string;
  id: number;
  photoUrl: string;
  username: string;
  settings: {
    [key: string]: UserSettings
  }
}