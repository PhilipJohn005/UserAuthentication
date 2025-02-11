import React, { useState } from "react";
import { User, signOut } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";
import Modal from "./Modal";
import Login from "./Login";
import Signup from "./Signup";

interface LandingProp {
  user: User | null;
}

const LandingPage = ({ user }: LandingProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);   //isModalOpen=true;
  const [modalContent, setModalContent] = useState<"login" | "signup">("login");  //modalContent=login

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const openModal = (content: "login" | "signup") => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {   //called from onClose(closeModal)
    setIsModalOpen(false);
  };

  const switchToLogin = () => {
    setModalContent("login");
  };

  const switchToSignup = () => {
    setModalContent("signup");
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>

      {user && (
        <p className="text-xl">Hello, {user.displayName || user.email}!</p>
      )}

      <button
        onClick={user ? handleLogout : () => openModal("login")}
        className={`mt-4 px-4 py-2 rounded-full ${
          user
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {user ? "Logout" : "Connect"}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === "login" ? (
          <Login onSuccess={closeModal} switchToSignup={switchToSignup} />   //Login component when we click the prop is called in login whose action is reflected here
        ) : (
          <Signup onSuccess={closeModal} switchToLogin={switchToLogin} />
        )}
      </Modal>

    </div>
  );
};

export default LandingPage;