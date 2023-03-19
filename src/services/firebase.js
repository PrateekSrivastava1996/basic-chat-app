import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYUXQPCVfGlHvED0RGpGxBrZm5l7AtxmE",
  authDomain: "chat-room-f75af.firebaseapp.com",
  projectId: "chat-room-f75af",
  storageBucket: "chat-room-f75af.appspot.com",
  messagingSenderId: "365934686861",
  appId: "1:365934686861:web:f680fd5754466b2e46a8c4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const sendMessage = async (roomId, user, text) => {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);
    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }
    return null;
  }
};

export const loginWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();

    const auth = getAuth();

    const { user } = await signInWithPopup(provider);
    console.log(user, "::::")
    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }
    return null;
  }
};

export const getMessages = (roomId, callback) => {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
};
