# Synchronize Storage to Firestore

**Author**: puf (**[github.com/puf](https://github.com/puf)**)

**Description**: Synchronized JSON files from a folder in Cloud Storage to documents in a collection in Firestore.

---

## 🧩 Install this experimental extension

> ⚠️ **Experimental**: This extension is available for testing as an _experimental_ release. It has not been as thoroughly tested as the officially released extensions, and future updates might introduce breaking changes. If you use this extension, please [report bugs and make feature requests](https://github.com/puf/extensions/issues/new/choose) in its GitHub repository.

### Console

[![Install this extension in your Firebase project](../install-extension.png?raw=true "Install this extension in your Firebase project")](https://console.firebase.google.com/project/_/extensions/install?ref=puf/storage-firestore-sync)

### Firebase CLI

```bash
firebase ext:install puf/storage-firestore-sync--project=<your-project-id>
```

> Learn more about installing extensions in the Firebase Extensions documentation: [console](https://firebase.google.com/docs/extensions/install-extensions?platform=console), [CLI](https://firebase.google.com/docs/extensions/install-extensions?platform=cli)

---

**Details**: This extension will automatically sync JSON files from the specified folder in Cloud Storage to a documents in the corresponding collection in Firestore. For example, if I write a file `/Users/myUserData.json` to storage, its contents will be synchronized to a document called `myUserData` in the `Users` collection.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->

- Cloud Functions
- Cloud Firestore
- Cloud Storage

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

**Configuration Parameters:**

- Storage bucket: The storage bucket to monitor. Defaults to the default storage bucket of the project.

- Prefix path: The folder in the configured Cloud Storage bucket from which to synchronize the JSON files, starting with no `/` and ending in a `/`. This can be a nested folder, as long as you adhere to the Firestore nesting requirements of `/collection/document/collection/document/...`.

- Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

**Cloud Functions:**

- **onStorageFirestoreSync:** Processes when a file has been completely written, checks if it's in the configured path, and if so: synchronized its JSON contents to Firestore.

**Access Required**:

This extension will operate with the following project IAM roles:

- firebaseauth.admin (Reason: Allows the extension to set custom claims on Firebase Auth users.)

- datastore.user (Reason: Allows the extension to write sync information back to Firestore.)
