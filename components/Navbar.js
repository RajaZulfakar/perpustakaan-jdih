import { LibraryIcon, MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { auth } from "../firebase";
import link from "next/link";

function Navbar() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="bg-white shadow-sm sticky z-50">
      <div className="px-5 py-5 container mx-auto  block md:flex justify-between items-center">
        {/* Left - Perpustakaan JDIH */}
        <div
          className={
            user ? "flex justify-between" : "flex justify-between w-full"
          }
        >
          <Link href="/">
            <a
              className="flex space-x-2 items-center"
              onClick={() => setIsShowMenu(!isShowMenu)}
            >
              <LibraryIcon className="w-7 h-7 p-1 ring-cyan-200 ring rounded-full bg-gradient-to-tr from-cyan-400 to-blue-100 shadow-lg text-white" />
              <h4 className="text-sm text-cyan-500">
                PERPUSTAKAAN
                <span className="text-gray-400 font-semibold">JDIH</span>
              </h4>
            </a>
          </Link>
          <div>
            {user ? (
              <button
                className="active:border-none focus:border-none hover:border-none"
                onClick={() => setIsShowMenu(!isShowMenu)}
              >
                <MenuIcon className="w-7 h-7 md:hidden text-gray-400" />
              </button>
            ) : (
              <div className="flex items-center space-x-3 text-sm">
                <Link href="/">
                  <a className="text-cyan-500 block md:flex hover:text-cyan-400 text-sm">
                    Home
                  </a>
                </Link>
                <Link href="/users/userRegister">
                  <a className="mr-4 text-gray-500 text-sm">Register</a>
                </Link>
                <Link href="/users/login">
                  <a
                    className="px-4 py-1 rounded-lg ring-pink-200 ring-4 shadow-sm text-xs bg-pink-400 text-gray-50"
                    onClick={() => {
                      setIsShowMenu(!isShowMenu);
                    }}
                  >
                    Login
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        {/* Right - User Menu */}
        {user ? (
          <div
            className={
              isShowMenu
                ? "md:block mt-4 md:mt-0"
                : "hidden md:flex mt-4 md:mt-0"
            }
          >
            <div className="text-sm flex md:flex-row md:items-center md:space-y-0 md:space-x-3 flex-col space-y-2 text-gray-500">
              <Link href="/">
                <a className="text-cyan-500 block md:flex hover:text-cyan-400">
                  Home
                </a>
              </Link>
              {/* <Link href="/books" className="block">
              <a
              className="hover:text-cyan-400"
              onClick={() => setIsShowMenu(!isShowMenu)}
              >
              My Books
              </a>
            </Link> */}
              {/* <Link href="/users/qrcode">
              <a onClick={() => setIsShowMenu(!isShowMenu)}>QR Code</a>
            </Link> */}
              <Link
                href={"/users/" + user.uid}
                className="block hover:text-cyan-400"
              >
                {/* <a className="flex space-x-2 items-center">
                  <img
                    className="w-7 h-7 mr-2 shadow-sm rounded-full cursor-pointer "
                    src="https://randomuser.me/api/portraits/men/95.jpg"
                    alt="username here"
                  />
                  <p className="md:hidden">Paul Butler</p>
                </a> */}
                <a
                  className="hover:text-cyan-400"
                  onClick={() => setIsShowMenu(!isShowMenu)}
                >
                  Profile
                </a>
              </Link>
              <Link href="/users/login" className="block">
                <a
                  className="hover:text-cyan-400"
                  onClick={() => auth.signOut()}
                >
                  Logout
                </a>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
