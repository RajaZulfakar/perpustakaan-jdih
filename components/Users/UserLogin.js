import { LogoutIcon } from "@heroicons/react/outline";
import { LoginIcon } from "@heroicons/react/solid";

export default function UserLogin() {
  return (
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            {/* <div>
          <!-- <img src="/img/logo.svg" class="h-7 sm:h-8" /> -->
        </div> */}
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-cyan-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                  <h4 class="text-3xl font-semibold text-gray-600">
                    Login
                    <span class="text-cyan-500 tracking-wider text-3xl font-light">
                      page
                    </span>
                  </h4>
                </div>
                <p>Let's do it, Let's Login into the app</p>
                <div>
                  <form action="#">
                    <div class="mt-7">
                      <input
                        type="text"
                        placeholder="Username"
                        class="w-full px-2 py-2 font-light bg-cyan-50 rounded-lg border-b border-cyan-400 focus:border-none focus:shadow-lg focus:bg-cyan-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        class="w-full px-2 py-2 mt-4 font-light bg-cyan-50 rounded-lg border-b border-cyan-400 focus:border-none focus:shadow-lg focus:bg-cyan-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                    <div class="mt-5">
                      {/* <a href="#" class="text-cyan-400 text-sm inline-block">
                        Daftar Sekarang
                      </a> */}
                      <button class="px-14 py-2 flex tracking-wider font-semibold bg-cyan-400 text-white shadow-md rounded-lg">
                        {/* <LoginIcon className="w-6 h-6 ml-1" /> */}
                        LOGIN
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="pt-6 text-base leading-6 text-gray-600 sm:text-lg sm:leading-7">
                <p>Belum punya account?</p>
                <p>
                  <a
                    href="https://tailwindcss.com/docs"
                    class="text-cyan-400 hover:text-cyan-700"
                  >
                    {" "}
                    Daftar sekarang &rarr;{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
