import { QrcodeIcon } from "@heroicons/react/outline";
import { useState, useEffect, createElement } from "react";
import QRcode from "qrcode";
import dynamic from "next/dynamic";
import CryptoJS from "crypto-js";

// QRCODE - cara import jika terdapat error Blob...
const QrReader = dynamic(import("react-qr-reader"), { ssr: false });
// LOGIN SYSTEM
import { auth } from "../../firebase";

const handleWebcamError = (error) => {
  console.log(error);
};

// MAIN FUNCTION
function login() {
  // Manual Login System
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.meesage));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        // user has login
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          // do not update user profile
        } else {
          displayName: username;
        }
      } else {
        // user has logout
        setUser(null);
      }
    });
    return () => {
      // Perform some clean up
      unsubscribe();
    };
  }, [user, username]);

  // QR Scan System
  const [scanResult, setScanResult] = useState("");
  const [isScan, setIsScan] = useState(false);

  // QR Login
  const handleWebcamScan = (qr) => {
    if (qr) {
      setScanResult(qr);
      console.log("Start your scan . . . ");

      const qrUrl = qr.split("rmz=");
      const qrData = qrUrl[1]
        .toString()
        .replace("xMl3Jk", "+")
        .replace("Por21Ld", "/")
        .replace("Ml32", "=");

      try {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(qrData, "perpustakaanjdih");

        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const loginData = decryptedData.split("#");
        const userId = loginData[0];
        const userPassword = loginData[1];

        auth
          .signInWithEmailAndPassword(userId, userPassword)
          .catch((error) => alert(error.message));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      {user ? (
        location.replace("/users/" + user.uid)
      ) : (
        <div className="mx-3 bg-white md:flex md:min-w-lg items-center shadow-lg rounded-lg">
          <div className="px-3 py-3 flex flex-col justify-center items-center ">
            <div className="w-full border-cyan-200 border-2 rounded-lg flex-1">
              {isScan ? (
                <QrReader
                  delay={1000}
                  onError={handleWebcamError}
                  onScan={handleWebcamScan}
                  // style={{ width: "90%" }}
                  className="md:w-96 h-auto"
                />
              ) : (
                <QrcodeIcon className="text-cyan-400 md:w-96 w-full " />
              )}
            </div>
            <button
              className="my-5 px-4 py-2 rounded-lg shadow-md text-white font-semibold tracking-wider uppercase bg-cyan-400 ring ring-cyan-200"
              onClick={() => {
                setIsScan(!isScan);
                setScanResult("");
              }}
            >
              Login qrcode
            </button>
          </div>

          {/* Manual Login */}
          <div className="m-4 p-4 space-y-5 flex flex-col">
            {!user ? (
              ""
            ) : (
              <div>
                <h3>Selamat Datang, {user.displayName}</h3>
                <button
                  className="bg-cyan-400 shadow px-4"
                  type="submit"
                  onClick={() => auth.signOut()}
                >
                  Logout
                </button>
              </div>
            )}
            <h3 className="text-lg font-semibold text-cyan-500 uppercase">
              Login Manual
            </h3>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
              <div className="flex items-center">
                <button
                  className="bg-cyan-400 mr-2 px-4 py-2 text-gray-50 font-semibold tracking-wide rounded-lg shadow-sm"
                  type="submit"
                  onClick={signIn}
                >
                  Login
                </button>
                <a
                  className="text-cyan-400 text-sm underline hover:text-cyan-300"
                  href="/users/userRegister"
                >
                  Daftar sebagai Anggota
                </a>
              </div>
            </form>
          </div>
          {/* Manual Login */}
        </div>
      )}
    </div>
  );
}

export default login;
