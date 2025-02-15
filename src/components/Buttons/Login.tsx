import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase/FirebaseConfig";
import SigninWithGoogle from "./SigninWithGoogle";
import TelegramButton from "./TelegramButton";

interface LoginProps {
  onSuccess: () => void;
  switchToSignup: () => void; 
  telegramLogin: (user: { first_name: string; username?: string }) => void;
}

const Login = ({ onSuccess, switchToSignup, telegramLogin}: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential=await signInWithEmailAndPassword(auth, email, password);

      const token=userCredential.user.getIdToken()
      console.log("This is the token: ",token);
      console.log("User Logged in Successfully!!");
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New user?{" "}
          <button
            onClick={switchToSignup} 
            className="text-blue-500 hover:underline"
          >
            Signup
          </button>
        </p>
        <SigninWithGoogle closeModal={onSuccess}/>
        <TelegramButton onSuccess={telegramLogin}/>

      </div>
    </div>
  );
};

export default Login;