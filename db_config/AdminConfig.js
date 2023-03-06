import admin from "firebase-admin";
import serviceAccount from "../nodefirebase-120d0-firebase-adminsdk-2y1q4-9ae0d580ef.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
