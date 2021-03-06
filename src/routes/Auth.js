import { authService, firebaseService } from "firebaseApp";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Account, setAccount] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const onClick = (e) => {
    const { id } = e.target;
    if (id === "logIn") {
      setAccount(true);
    } else if (id === "createAccount") {
      setAccount(false);
    }
  };

  const onClickGoogle = async () => {
    const provider = new firebaseService.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const onSubmit = async (e) => {
    //async, await 안 써도 되는데?
    e.preventDefault();
    try {
      //try 안 해준 채로 error 나면, 계속 무한 반복!
      if (Account) {
        await authService.signInWithEmailAndPassword(email, password);
      } else {
        await authService.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    //enter 치면 앞의 submit 인 login 만 실행되네
    <form onSubmit={onSubmit}>
      <div>
        <input
          id="email"
          type="email"
          placeholder="Input Email"
          value={email}
          onChange={onChange}
          required
        ></input>
        <input
          id="password"
          type="password"
          placeholder="Input Password"
          value={password}
          onChange={onChange}
          required
        ></input>
        <input
          id="logIn"
          type="submit"
          value="Log In"
          onClick={onClick}
        ></input>
        <input
          id="createAccount"
          type="submit"
          value="Create Account"
          onClick={onClick}
        ></input>
      </div>
      <div>
        <button
          id="google"
          onClick={onClickGoogle}
          type="button" //google button 눌렀을 때는 email 미입력 알람 안 뜬다
        >
          Continue with Google
        </button>
        <button disabled id="kakao" onClick>
          Continue with Kakao
        </button>
      </div>
    </form>
  );
};

export default Auth;
