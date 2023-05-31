const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

exports.onStorageFirestoreSync = functions.storage
  .object()
  .onFinalize((object) => {
  console.log("Storage Firestore sync started");

  const STORAGE_PREFIX = process.env.PREFIX;
  const STORAGE_BUCKET = process.env.EXTENSION_BUCKET;
  console.log(`Looking for files under ${STORAGE_PREFIX} in ${STORAGE_BUCKET}`);

  const bucket = admin.storage().bucket(STORAGE_BUCKET);
  const filePath = object.name;
  const basePath = filePath.substring(0, filePath.indexOf('.')); // path minus extensions

  console.log(`filePath: ${filePath}, basePath=${basePath}`);
  
  if (!filePath.startsWith(STORAGE_PREFIX) || filePath == STORAGE_PREFIX) return false;

  console.log(`Ooh... it looks like that's a file that I should sync to Firestore`);

  const documentPath = basePath; // TODO: make this configurable between some options (dropdown)
  return new Promise((resolve, reject) => {
    bucket.file(filePath).download(function (err, data) {
      if (!err) {
        var object = JSON.parse(data)
        console.log(object);
        object.lastUpdated = new Date(); // TODO: admin.firestore.FieldValue.serverTimestamp(); once this bug is fixed: https://github.com/firebase/firebase-admin-node/discussions/1959#discussioncomment-3985176

        return admin.firestore().doc(basePath).set(object);
      }
      else {
        reject(err);
      }
    });
  })

  // TODO: if text, write the contents as a (configured) field to Firestore
  // TODO: if neither JSON nor text, raise an error for now - possibly also in Firestore? Or should be sync metadata to Firestore?
  
  return true;
});
