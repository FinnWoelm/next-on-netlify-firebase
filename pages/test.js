import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const TestPage = (props) => (
  <>
    <h1>getServerSideProps test:</h1>
    <pre>props: {JSON.stringify(props, null, 2)}</pre>
  </>
);

export async function getServerSideProps(context) {
  // Get function context
  const functionContext = context?.req?.functionContext;

  // If we are currently in a Netlify function (deployed on netlify.app or
  // locally with netlify dev), do not wait for empty event loop.
  // See: https://stackoverflow.com/a/39215697/6451879
  // Skip during next dev.
  if (functionContext) {
    console.log("Setting callbackWaitsForEmptyEventLoop: false");
    functionContext.callbackWaitsForEmptyEventLoop = false;
  }

  // Configuration for firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBre20U7moSMgS5pCKSJsde2AIcssegRys",
    authDomain: "next-on-netlify-firebase.firebaseapp.com",
    databaseURL: "https://next-on-netlify-firebase.firebaseio.com",
    projectId: "next-on-netlify-firebase",
    storageBucket: "next-on-netlify-firebase.appspot.com",
    messagingSenderId: "150946230344",
    appId: "1:150946230344:web:c5d3e4fa7052b1891ce87d",
  };

  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  // Fetch all users
  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child("users");
  const usersQuery = await usersRef.once("value");
  const users = usersQuery.val();

  // Send props to page
  return {
    props: {
      users,
    },
  };
}

export default TestPage;
