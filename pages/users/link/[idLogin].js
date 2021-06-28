import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../../firebase";
import CryptoJS from "crypto-js";

function idLogin() {
  const [user, setUser] = useState(null);
  const link = useRouter();
  const idLogin = link.query;

  // User signin
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser);
      if (user) {
        // link.replace("/users/" + user.uid);
        location.replace("/users/" + user.uid);
      }
    } else {
      setUser(null);
    }
  });
  // GET qrData
  console.log(idLogin);

  const qrData = JSON.stringify(idLogin.rmz);
  if (qrData) {
    const x = qrData
      .replace(`"`, "")
      .replace("xMl3Jk", "+")
      .replace("Por21Ld", "/")
      .replace("Ml32", "=");
    // DECRYPT link.query
    var bytes = CryptoJS.AES.decrypt(x, "perpustakaanjdih");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // LOGIN
    if (idLogin) {
      const loginData = decryptedData.split("#");
      const userId = loginData[0];
      const userPassword = loginData[1];
      auth
        .signInWithEmailAndPassword(userId, userPassword)
        .catch((error) => alert(error.message));
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-2/3 px-4 py-2 bg-white shadow-xl rounded-lg">
        <p className="text-gray-700">Loading "Username", please wait . . . </p>
      </div>
    </div>
  );
}

export default idLogin;
