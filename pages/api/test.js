import admin from "firebase-admin";

const test = async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp();
    console.log("initialized!");
  }

  return res.json({ result: "success" });
};

export default test;
