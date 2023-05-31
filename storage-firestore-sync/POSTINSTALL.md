# See it in action

You can test out this extension right away!

Drop a JSON file into the ${param:PREFIX} path in ${EXTENSION_BUCKET}

# Using the extension

This extension is triggered by a file being written to the configured bucket in Cloud Storage (${EXTENSION_BUCKET}). If checks if the file path starts with the configured prefix (${PREFIX}), and if so it synchronizes the JSON contents of the file to the same path in Firestore.

Some notes:

1. Any filename extensions are stripped from the end of the path of the file on Cloud Storage. This then becomes the path to the document in Firestore.
2. You have to ensure that you have an odd number of folders above the actual file, to match the `collection/document/collection/document` structure of Firestore.
3. If the file contents cannot be parse as JSON, nothing is written to Firestore.
4. If there is an error, nothing is written to Firestore.

<!-- We recommend keeping the following section to explain how to monitor extensions with Firebase -->
# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
