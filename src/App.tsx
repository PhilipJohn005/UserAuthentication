import "./App.css";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import { auth } from "./Firebase/FirebaseConfig";
import { User } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cleanupFunction = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => cleanupFunction();
  }, []);

  if (loading) {
    return <div className="justify-center flex items-center min-h-screen ">Patience bro...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <LandingPage user={user} />
    </div>
  );
};

export default App;