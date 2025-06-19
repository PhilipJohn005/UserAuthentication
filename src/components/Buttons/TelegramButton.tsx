import React from "react";
import { LoginButton } from "@telegram-auth/react";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";


const BOT_TOKEN= import.meta.env.TELEGRAM_BOT_TOKEN;
const validator = new AuthDataValidator({botToken:BOT_TOKEN});//bot token shld bne present in .env file

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
  closeModal: () => void;
}

const TelegramButton: React.FC<TelegramButtonProps>=({closeModal})=>{


  const handleAuth = async (data: TelegramAuthData) => {

    console.log("Received Data:", data);
    
    try {
      const formattedData: Record<string, string> = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)]));

      const authData = urlStrToAuthDataMap(`https://yourdomain.com?${new URLSearchParams(formattedData)}`);
      
      await validator.validate(authData);  //frontend validate
      

      const response=await axios.post<{token:string}>("http://localhost:5000/generate-token",{
        authData,   //send auth data to backend so it can validate 
      })

      const firebaseToken=response.data.token;
      const userCredentials= await signInWithCustomToken(auth,firebaseToken)
      console.log("The userCredentials are: ",userCredentials)
      closeModal();

    } catch (error) {
      console.error("Validation failed:", error);
      alert("Login validation failed!");
    }
  };

  return (
    <div className="justify-center items-center flex cursor-pointer">
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
