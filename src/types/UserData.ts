export interface UserSettings {
  requireTwitchAuth: boolean;
  allowEmailNotifications: boolean;
  allowTwitchNotifications: boolean;
}

export interface UserData {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  email: string;
  id: number;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: number;
  settings: {
    [key: string]: UserSettings
  }
}