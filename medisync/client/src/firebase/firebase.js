import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBTJXGNxRMIPb_CeqgzKd5ZJfVpfdNBcqE",
  authDomain: "medisync-db77a.firebaseapp.com",
  projectId: "medisync-db77a",
  storageBucket: "medisync-db77a.appspot.com",
  messagingSenderId: "335081665446",
  appId: "1:335081665446:web:e3f45cd824825e052cd567",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BGs6t6vdzUnEFWA32WLg6uAVSQTu6qMjpRw-2AxQ6kE7R41dr-uX1c0eDWhHmX7m9UfzkJbtwUrc9y_vZoBV4YE",
    });
    console.log(token);
  }
};

export { app, auth, messaging, generateToken };
