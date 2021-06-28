export default function UserRegister() {
  return (
    <div className="mt-16 bg-gray-100 flex flex-col">
      <div className="relative sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg transform -skew-y-12 sm:skew-y-0 sm:-rotate-12 sm:rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h3 className="text-3xl text-gray-700 font-semibold">
                Register Now
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              <form className="py-5 text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
                <input
                  type="text"
                  placeholder="Username"
                  className="px-2 py-1 text-base rounded-lg block border-b border-cyan-200 bg-cyan-50 focus:outline-none focus:shadow-lg"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="px-2 py-1 text-base rounded-lg block border-b border-cyan-200 bg-cyan-50 focus:outline-none focus:shadow-lg"
                />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  className="px-2 py-1 text-base rounded-lg block border-b border-cyan-200 bg-cyan-50 focus:outline-none focus:shadow-lg"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="px-2 py-1 text-base w-96 rounded-lg block border-b border-cyan-200 bg-cyan-50 focus:outline-none focus:shadow-lg"
                />
                <button className="px-7 py-1 rounded-lg bg-cyan-400 text-white shadow-lg">
                  Submit
                </button>
              </form>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7"></div>
            </div>
          </div>
          <p className="text-gray-500 text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore,
            veritatis voluptas. Reprehenderit eos porro beatae natus repudiandae
            veritatis nemo iure.
          </p>
        </div>
      </div>
    </div>
  );
}
