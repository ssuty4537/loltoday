import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlNsiLb6WEcXm9_al2lL1cDWrecVxmLds",
  authDomain: "loltoday-95f5b.firebaseapp.com",
  projectId: "loltoday-95f5b",
  storageBucket: "loltoday-95f5b.appspot.com",
  messagingSenderId: "957606725975",
  appId: "1:957606725975:web:3a06353e61ae1063551612",
  //process.env 해주니까 계속 apiKey 못찾겠다고 오류가 뜨네? 일단 env 사용 안 한 채 진행
};

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth(); //왜 auth 뒤에 () 붙이면 error 나지? 오 되네?
export const firebaseService = firebase;
export const dbService = firebase.firestore();
