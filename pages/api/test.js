import admin from "firebase-admin";

const test = async (req, res) => {
  // Initialize firebase app
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

  // Fetch data
  const { docs } = await admin
    .firestore()
    .collection("testing")
    .where("name", "==", "Finn")
    .limit(1)
    .get();

  const [firstDoc] = docs;

  return res.json({ result: firstDoc?.data() });
};

export default test;
