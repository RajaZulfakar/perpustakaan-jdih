import {
  MailIcon,
  LocationMarkerIcon,
  PhoneIcon,
  IdentificationIcon,
  LibraryIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

export default function User() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="px-2 py-2 flex items-center justify-center bg-gray-100">
      <div className="px-2 py-4 max-w-sm sm:flex sm:max-w-full rounded-lg bg-white shadow-lg text-gray-700">
        <div className="max-w-md">
          <img
            className="mx-auto w-36 h-36 rounded-full ring-1 ring-gray-300 shadow-md p-1"
            src="https://randomuser.me/api/portraits/men/95.jpg"
            alt="Paul Butler"
          />
          <div className="text-center mt-4 mb-4">
            <h4 className="font-semibold text-xl text-cyan-400">Paul Butler</h4>
            <p className="text-gray-400 text-sm">Birth Date: 2000-11-14</p>
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                consequuntur cumque nemo ab delectus nihil unde a ipsum
                voluptatem nobis.
              </p>
            </div>
          </div>
        </div>
        <div className="my-5 sm:my-0 sm:border-none px-3 text-sm text-gray-500 border-t border-gray-200">
          <div className="my-5 sm:my-0">
            <h4 className="text-cyan-400 text-lg">Contact</h4>
            <div className="flex space-x-2">
              <PhoneIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
              <p>+6281233855758</p>
            </div>
            <div className="flex space-x-2">
              <MailIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
              <p>paul.butler@example.com</p>
            </div>
            <div className="flex space-x-2">
              <LocationMarkerIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
              <p>
                Jl. Raya Tanjungpinang - Tanjung Uban KM. 54, Bandar Seri Bentan{" "}
                <span> - 60171</span>
              </p>
            </div>
          </div>
          <div className="my-4">
            <h4 className="text-cyan-400 text-lg">Personal Info</h4>
            <div className="flex space-x-2">
              <IdentificationIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
              <p>016797665443368363</p>
            </div>
            <div className="flex space-x-2">
              <LibraryIcon className="w-5 h-5 flex-shrink-0 text-gray-600" />
              <p>Bapelitbang Kabupaten Bintan</p>
            </div>
          </div>
          {/* <QrcodeIcon /> */}
          <img
            src="../images/qrsample.png"
            alt="qrcode"
            className="mt-4 w-44 mx-auto shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
