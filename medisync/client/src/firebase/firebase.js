// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTJXGNxRMIPb_CeqgzKd5ZJfVpfdNBcqE",
  authDomain: "medisync-db77a.firebaseapp.com",
  projectId: "medisync-db77a",
  storageBucket: "medisync-db77a.appspot.com",
  messagingSenderId: "335081665446",
  appId: "1:335081665446:web:e3f45cd824825e052cd567",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BGs6t6vdzUnEFWA32WLg6uAVSQTu6qMjpRw-2AxQ6kE7R41dr-uX1c0eDWhHmX7m9UfzkJbtwUrc9y_vZoBV4YE",
    });
    console.log(token);
  }
};
