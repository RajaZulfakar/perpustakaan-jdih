import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import QRcode from "qrcode";
import USERDATA from "../public/userData.json";

// cara import jika terdapat error Blob...
const QrReader = dynamic(import("react-qr-reader"), { ssr: false });

export default function Qrcode() {
  // const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [isScan, setIsScan] = useState(false);
  const [SearchTerm, setSearchTerm] = useState("");

  const generateQrcode = async () => {
    try {
      const qrImage = await QRcode.toDataURL(text);
      setImageURL(qrImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWebcamError = (error) => {
    console.log(error);
  };

  const handleWebcamScan = (qr) => {
    if (qr) {
      setScanResult(qr);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-start">
      <div className="flex flex-col justify-center">
        <div className="md:mr-5 w-screen flex flex-col justify-center">
          {isScan ? (
            <QrReader
              delay={300}
              onError={handleWebcamError}
              onScan={handleWebcamScan}
              // style={{ width: "90%" }}
              className="w-60 h-60 mt-4"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-60 w-60 mt-4 bg-yellow-100 text-yellow-500 animate-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          )}
          <button
            type="button"
            className="p-4 mt-4 rounded-lg shadow-md text-white bg-yellow-500"
            onClick={() => {
              setIsScan(!isScan);
              setScanResult("");
            }}
          >
            {!isScan ? "Click Here to Scan" : "Stop Scan"}
          </button>
        </div>

        <div className="w-96 mt-8 p-4 text-left leading-7 text-gray-500 bg-blue-100 md:bg-white">
          <h2 className="uppercase font-semibold text-lg text-left">
            Hasil Scan
          </h2>
          <h1 className="mt-4 text-lg text-pink-500 ">
            {/* {!isScan ? "" : `User Id: ${scanResult}`} */}
          </h1>
          <input
            id="searchItem"
            type="text"
            placeholder="Search User"
            value={scanResult}
            // onChange={(e) => {
            //   setSearchTerm(e.target.value);
            // }}
          />
          <button
            className="px-8 py-2 rounded-md shadow-sm bg-yellow-500 text-white"
            onClick={(e) => {
              const x = document.getElementById("searchItem");
              setSearchTerm(x.value);
              console.log(x.value);
            }}
          >
            Cari
          </button>
          {USERDATA.filter((value) => {
            if (SearchTerm == "") {
              return "";
            } else if (
              value.first_name
                .toLocaleLowerCase()
                .includes(SearchTerm.toLocaleLowerCase())
            ) {
              return value;
            }
          }).map((val, key) => {
            return (
              <div key="key">
                <img
                  className="my-5 bg-gray-300 rounded-full border-2 border-gray-700"
                  src={val.avatar}
                  alt={val.first_name}
                />
                <p>
                  {val.first_name} , {val.last_name}
                </p>
                <p>{val.gender}</p>
                <p>{val.email}</p>

                <p className="font-semibold px-5">Daftar Buku pinjaman: </p>
                <div className="mt-4 -space-x-4 space-y-2 w-full flex flex-wrap items-center">
                  <img
                    className="w-20 h-20 rounded-full object-cover border-gray-300 border-4"
                    src="images/books/Bodo-amat.jpg"
                    alt="Judul Bukunya"
                  />
                  <img
                    className="w-20 h-20 rounded-full object-cover border-gray-300 border-4"
                    src="images/books/Harta-Perceraian.jpg"
                    alt="Judul Bukunya"
                  />
                  <img
                    className="w-20 h-20 rounded-full object-cover border-gray-300 border-4"
                    src="images/books/Kontrak.jpg"
                    alt="Judul Bukunya"
                  />
                  <img
                    className="w-20 h-20 rounded-full object-cover border-gray-300 border-4"
                    src="images/books/Pengantar-hukum.jpg"
                    alt="Judul Bukunya"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Generate qrcode */}
      <div className="flex flex-col">
        <input
          type="text"
          className="pl-2 py-2 m-5 rounded-xl border border-pink-300 focus:outline-none focus:shadow-lg"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="p-4 rounded-lg shadow-sm bg-pink-500 text-white"
          onClick={() => generateQrcode()}
        >
          Generate QRCode
        </button>
        <img
          src={imageURL}
          className="w-64 h-64 mt-4 fill-current text-pink-500 bg-pink-500"
          alt="QRcode"
        />
      </div>
      {/* {users.map((user) => (
        <figure className="w-full md:w-1/3 md:mr-4 md:p-4 mt-6 flex md:flex-col md:justify-center items-center rounded-xl bg-gray-100 shadow-lg">
          <img
            src={user.picture.large}
            className="md:rounded-full rounded-xl"
            alt=""
          />
          <div className="ml-4 md:ml-0 md:mt-4 font-semibold md:text-center ">
            <p className="text-xl text-yellow-500">{`${user.name.last}, ${user.name.first}`}</p>
            <p className="font-small font-light text-sm text-gray-400">
              {`${user.location.city}, ${user.location.country}`}
            </p>
            <p className="mt-3 font-light text-xs text-gray-400">
              {user.email}
            </p>
          </div>
        </figure>
      ))} */}
    </div>
  );
}
