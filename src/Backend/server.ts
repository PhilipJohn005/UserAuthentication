import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync("./src/Backend/firebase-crypto-key.json", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
//collection of all endpoints->api
app.post("/generate-token", async (req: express.Request, res: express.Response): Promise<void> => {
  let { telegramUserId } = req.body;
  const { firstName, lastName } = req.body;

  console.log("Received Telegram ID:", telegramUserId); // Log the ID for debugging


  if (typeof telegramUserId === "number") {
    telegramUserId=String(telegramUserId);
  }

 
  if (!telegramUserId || typeof telegramUserId !== "string" || telegramUserId.length > 128) {
    console.error("Invalid Telegram ID:", telegramUserId);
    res.status(400).json({ error: "Invalid Telegram ID" });
    return;
  }

  try {
    let userRecord;

    try {
      userRecord = await admin.auth().getUser(telegramUserId);
      console.log("User already exists:", userRecord.uid);
    } catch (error: unknown) { 
      if ((error as admin.FirebaseError).code === "auth/user-not-found") {
        console.log("creating new user...");

        userRecord = await admin.auth().createUser({
          uid: telegramUserId,
          email: `${telegramUserId}@lazer.money`,
          displayName: `${firstName || ""} ${lastName || ""}`.trim(),
        });

        console.log("New user created:", userRecord.uid);
      } else {
        console.error("Firebase Auth Error:", error);
        res.status(500).json({ error: "Firebase Auth Error" });
        return;
      }
    }

    
    const token = await admin.auth().createCustomToken(userRecord.uid);
    console.log("Generated Token for:", userRecord.uid);

    res.json({ token });
  } catch (error) {
    console.error("Error creating custom token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
