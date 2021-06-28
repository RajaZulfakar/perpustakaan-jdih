import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import { fb } from "firebase";

function userRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nik, setNik] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [instansi, setInstansi] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [address, setAddress] = useState("");
  const [hashed, setHashed] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has login fill user data
        setUser(authUser);
        if (authUser.displayName) {
          // do not update user profile
        } else {
          displayName: username;
          // imageUrl: imageUrl;
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

  const registeUser = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      // IMAGE UPLOAD
      console.log(image);
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((donwloadURL) => {
            console.log(donwloadURL);
            authUser.user.updateProfile({
              photoURL: donwloadURL,
            });
          });
        }
      );
      return (authUser.user.updateProfile({
        displayName: username,
      }),
      db
        .collection("users")
        .doc(authUser.user.uid)
        .set({
          nik: nik,
          birthdate: birthdate,
          address: address,
          instansi: instansi,
          aboutMe: aboutMe,
          hashed: password,
        })
        .then(() => {
          // router.push("/users/" + authUser.user.uid);
          location.replace("/users/" + authUser.user.uid);
        })).catch((error) => alert(error.message));
    });
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage
      .ref(`images/${profileImage.name}`)
      .put(profileImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storage
          .ref("profileImage")
          .child(images)
          .getDownloadURL()
          .then((url) => {
            // This is where we put the data to the db
            db.collection("users").add({
              timestamp: fb.firestore().FieldValue.serverTimeStamp(),
              photoURL: url,
            });
          });
        setProgress(0);
        setImageUrl(null);
      }
    );
  };

  return (
    <div className="px-2 flex flex-col justify-center items-center">
      <div className=" px-4 py-4 flex flex-col  bg-gray-50 shadow-md rounded-md">
        <h1 className="text-xl font-semibold text-gray-700">Register Now</h1>

        <p className="text-sm text-gray-400">
          Daftarkan diri sebagai anggota Perpustakaan JDIH Kanwil Prov. Kepri
        </p>
        <form className="mt-7 flex flex-col space-y-5">
          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            type="text"
            placeholder="Display Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            type="password"
            placeholder="Pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            type="text"
            placeholder="NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
          />

          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            placeholder="Tanggal Lahir"
            onFocus={(e) => {
              e.currentTarget.type = "date";
            }}
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            type="text"
            placeholder="Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            type="text"
            placeholder="Instansi"
            value={instansi}
            onChange={(e) => setInstansi(e.target.value)}
          />
          <textarea
            className="px-2 py-1 rounded-md shadow-sm text-gray-400"
            placeholder="About Me"
            name=""
            id=""
            cols="30"
            rows="5"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          ></textarea>
          <div className="px-2 py-1">
            <label htmlFor="profileImage" className="text-gray-500 block">
              Profile Image
            </label>
            <input
              className="rounded-md shadow-sm text-gray-400 bg-blue-100"
              type="file"
              accept="image/*"
              // value={imageUrl}
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-4 px-4 py-2 bg-cyan-400 rounded-md shadow-md inline-block text-white uppercase font-semibold tracking-wide"
            type="submit"
            onClick={registeUser}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    // <div className="px-4 py-2 space-y-2 flex flex-col max-w-lg mx-auto bg-gradient-to-tr from-cyan-400 to-blue-400 rounded-lg shadow-sm">
    //   <h1 className="text-2xl text-gray-50 font-semibold">Register</h1>
    //   <form className="flex flex-col space-y-5">
    //     <input
    //       type="text"
    //       placeholder="Display Name"
    //       className="px-4 py-2 rounded-lg border-none text-gray-600"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="email"
    //       placeholder="email"
    //       className="px-4 py-2 rounded-lg border-none text-gray-600"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       className="px-4 py-2 rounded-lg border-none text-gray-600"
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //       required
    //     />
    //     <div>
    //       <div>
    //         <button
    //           type="submit"
    //           className="bg-pink-400 text-gray-50 py-2 px-4 rounded-lg shadow-sm mt-9"
    //           onClick={registeUser}
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}
export default userRegister;
