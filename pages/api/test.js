import admin from "firebase-admin";

const test = async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "next-on-netlify-firebase",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Need to un-escape linebreaks from private key.
        // See: https://stackoverflow.com/a/50376092/6451879
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      databaseURL: "https://next-on-netlify-firebase.firebaseio.com",
    });
    console.log("initialized!");
  }

  // Fetch all users
  const dbRef = admin.database().ref();
  const usersRef = dbRef.child("users");
  const usersQuery = await usersRef.once("value");
  const users = usersQuery.val();

  return res.json({ users });
};

export default test;
