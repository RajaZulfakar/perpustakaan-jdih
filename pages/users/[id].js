import {
  MailIcon,
  LocationMarkerIcon,
  PhoneIcon,
  IdentificationIcon,
  LibraryIcon,
} from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import CryptoJS from "crypto-js";

function detailsUser() {
  const [user, setUser] = useState(null);
  const [userMoreData, setUserMoreData] = useState([]);
  const [username, setUsername] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(authUser);
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.data()) {
                setUserMoreData(doc.data());

                // FOR DOCS SEE: https://www.npmjs.com/package/crypto-js
                const hashed = `${user.email}#${doc.data().hashed}`;
                // Encrypt
                const ciphertext = CryptoJS.AES.encrypt(
                  JSON.stringify(hashed),
                  "perpustakaanjdih"
                )
                  .toString()
                  .replace("+", "xMl3Jk")
                  .replace("/", "Por21Ld")
                  .replace("=", "Ml32");

                const appUrl = window.location.href;
                const appSplit = appUrl.split("/");
                const appDomain = appSplit[0] + "//" + appSplit[2];
                const qrText =
                  appDomain + "/users/link/search?rmz=" + ciphertext;
                console.log(`${qrText}`);
                QRCode.toDataURL(`${qrText}`)
                  .then((url) => {
                    setQrImageUrl(url);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } else {
                setUserMoreData([]);
              }
            });
        }
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  {
    user ? console.log(user.photoURL) : "tidak ada";
  }

  const [isActive, setIsActive] = useState(true);
  const link = useRouter();
  const { id } = link.query;

  return (
    <div className="px-2 py-2 flex items-center justify-center bg-gray-100">
      {user ? (
        // <Qrcode />
        <div className="px-2 py-4 max-w-sm sm:flex sm:max-w-full rounded-lg bg-white shadow-lg text-gray-700">
          <div className="max-w-md">
            <img
              className="mx-auto w-36 h-36 rounded-full ring-1 ring-gray-300 shadow-md p-1"
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://randomuser.me/api/portraits/women/91.jpg"
              }
              alt={user.displayName}
            />
            <div className="text-center mt-4 mb-4">
              <h4 className="font-semibold text-xl text-cyan-400">
                {user.displayName}
              </h4>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <div className="mx-7 mt-4 text-sm text-gray-500">
                <div className="space-x-4 flex justify-center items-center">
                  <div className="">
                    <p className="font-semibold">Since</p>
                    <p className="mt-1 text-gray-400">2021-05-19</p>
                  </div>

                  <div className="border-r px-4 border-gray-300 border-l">
                    <p className="font-semibold">Register</p>
                    <p className="mt-1 text-gray-400">2021-05-19</p>
                  </div>

                  <div className="">
                    <p className="font-semibold">Expire</p>
                    <p className="mt-1 text-gray-400">2021-06-02</p>
                  </div>
                </div>
              </div>

              {isActive ? (
                <a
                  href="#"
                  className="bg-cyan-400 inline-block my-4 px-7 py-1 shadow-md text-white rounded-full"
                  onClick={() => setIsActive(false)}
                >
                  Active
                </a>
              ) : (
                <a
                  href="#"
                  className="bg-pink-400 inline-block my-4 px-7 py-1 shadow-md text-white rounded-full"
                  onClick={() => setIsActive(true)}
                >
                  InActive
                </a>
              )}

              <div className="px-4 text-center">
                <p className="text-center text-gray-500 text-sm">
                  {userMoreData.aboutMe}
                </p>
              </div>
            </div>
          </div>
          <div className="my-5 sm:my-0 sm:border-none px-3 text-sm text-gray-500 border-t border-gray-200">
            <div className="my-5 sm:my-0">
              <h4 className="text-cyan-400 text-lg">Contact</h4>
              <div className="flex space-x-2">
                <PhoneIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
                <p>{userMoreData.nik}</p>
              </div>
              <div className="flex space-x-2">
                <MailIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
                <p>{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <LocationMarkerIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
                <p>{userMoreData.address}</p>
              </div>
            </div>
            <div className="my-4">
              <h4 className="text-cyan-400 text-lg">Personal Info</h4>
              <div className="flex space-x-2">
                <IdentificationIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
                <p>{userMoreData.nik}</p>
              </div>
              <div className="flex space-x-2">
                <LibraryIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
                <p>{userMoreData.instansi}</p>
              </div>
            </div>
            {/* <QrcodeIcon /> */}
            <img
              src={qrImageUrl}
              alt="qrcode"
              className="mt-4 w-44 mx-auto shadow-xl"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default detailsUser;
