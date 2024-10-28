import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export { app, auth };
