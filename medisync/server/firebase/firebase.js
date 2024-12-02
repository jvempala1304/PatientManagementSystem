const admin = require("firebase-admin");
const serviceAccount = require("./medisync-db77a-4a7a7cdefa47.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
