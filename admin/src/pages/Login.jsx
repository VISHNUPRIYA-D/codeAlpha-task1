import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../context/adminContext";

const Login = () => {

    const {loginData,setLoginData,handleLoginChange,handleLoginSubmit, showPassword,setShowPassword,
                loading,setLoading,
                error,setError} = useContext(adminContext);
    const navigate = useNavigate();

    


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-8">

                <h1 className="text-xl sm:text-3xl font-bold text-center text-blue-950 mb-2">
                    Admin Login
                </h1>

                <p className="text-center text-gray-500 mb-4 sm:mb-8">
                    Login to manage your store
                </p>

                <form
                    onSubmit={async(e)=>{const success = await handleLoginSubmit(e);

    if(success){
        navigate("/home");
    }}}
                    className="space-y-3 sm:space-y-5"
                >

                    <div>

                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-900"
                            placeholder="admin@gmail.com"
                            required
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="w-full mt-2 border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-900"
                                placeholder="********"
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
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;