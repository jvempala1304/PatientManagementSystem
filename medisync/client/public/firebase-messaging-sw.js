// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBTJXGNxRMIPb_CeqgzKd5ZJfVpfdNBcqE",
  authDomain: "medisync-db77a.firebaseapp.com",
  projectId: "medisync-db77a",
  storageBucket: "medisync-db77a.appspot.com",
  messagingSenderId: "335081665446",
  appId: "1:335081665446:web:e3f45cd824825e052cd567",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
