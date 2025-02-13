import React from "react";
import { LoginButton } from "@telegram-auth/react";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";

const validator = new AuthDataValidator({ botToken: "7570508468:AAG23SYMkKGXZJaelzQGMMx6zbbQTQsM8Ss" });

interface TelegramAuthData {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name?: string;
  photo_url?: string;
  username?: string;
}

interface TelegramButtonProps {
  onSuccess: (user: { first_name: string; username?: string }) => void;
}

const TelegramButton: React.FC<TelegramButtonProps> = ({ onSuccess }) => {
  const handleAuth = async (data: TelegramAuthData) => {
    console.log("Received Data:", data);
    
    try {
      const formattedData: Record<string, string> = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
      );

      const authData = urlStrToAuthDataMap(`https://yourdomain.com?${new URLSearchParams(formattedData)}`);
      const user = await validator.validate(authData);

      console.log("User data is valid:", user);
      onSuccess({ first_name: user.first_name, username: user.username });

    } catch (error) {
      console.error("Validation failed:", error);
      alert("Login validation failed!");
    }
  };

  return (
    <div className="justify-center items-center flex">
    <LoginButton
      botUsername="auth1223_bot"
      onAuthCallback={handleAuth}
      buttonSize="large"
      cornerRadius={5}
      showAvatar={true}
      lang="en"
    />
    </div>
  );
};

export default TelegramButton;
