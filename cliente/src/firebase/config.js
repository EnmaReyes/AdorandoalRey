import { v4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCXjvMGAPjjyYXUvF0u9uJdGU-6ejD6p9I",
  authDomain: "adorandoalrey-66271.firebaseapp.com",
  projectId: "adorandoalrey-66271",
  storageBucket: "adorandoalrey-66271.appspot.com",
  messagingSenderId: "949141037898",
  appId: "1:949141037898:web:36bdfe3199db52a64a97b3",
  measurementId: "G-XW70Q2DYTB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const UploadImg = async (file) => {
  const storageRef = ref(storage, `blogs_img/${v4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const UploadUserImg = async (file) => {
  const storageRef = ref(storage, `users_img/${v4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
