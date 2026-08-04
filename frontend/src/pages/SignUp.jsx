import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    signupData,
    setSignupData,
    handleSignupSubmit,
    showPassword,
    setShowPassword,
    loading,
    error,
  } = useContext(userContext);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-8">

        <h1 className="text-xl sm:text-3xl font-bold text-center text-blue-950 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-4 sm:mb-8">
          Sign up to start your journey
        </p>


        <form
          onSubmit={async (e) => {
            const success = await handleSignupSubmit(e);

            if (success) {
              navigate("/home");
            }
          }}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="font-medium">
              Name
            </label>

            <input
              type="email"
              name="email"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  name: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter your email"
              required
            />
          </div>


          {/* Email */}
          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter your email"
              required
            />
          </div>


          {/* Password */}
          <div>

            <label className="font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    password: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Create password"
                required
              />


              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-6 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>


          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-950 hover:bg-blue-800 text-white py-3 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>


          <p className="text-center text-sm text-gray-600">

            Already have an account?{" "}

            <span
              onClick={() => navigate("/login")}
              className="text-blue-950 font-semibold cursor-pointer"
            >
              Login
            </span>

          </p>


        </form>

      </div>

    </div>
  );
};

export default Signup;