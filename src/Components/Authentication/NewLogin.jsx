import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Baseurl } from "../../Confige";
import { jwtDecode } from "jwt-decode";
function NewLogin() {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [formData, setFormData] = useState({ emailOrMobile: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      navigate("/"); // Redirect to chat routes if logged in
    }
  }, [navigate]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { emailOrMobile, otp } = formData;
    const loginData = isEmail(emailOrMobile)
      ? { emailAddress: emailOrMobile, OTP: otp }
      : { contactNumber: emailOrMobile, OTP: otp };

    try {
      const response = await fetch(Baseurl + "/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        // Store tokens and user info
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("userId", result.data.user._id);
        Cookies.set("accessToken", result.data.accessToken);
        Cookies.set("refreshToken", result.data.refreshToken);
        Cookies.set("userId", result.data.user._id);

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          setIsTokenExpired(true);
          localStorage.removeItem("accessToken");
          setToken(null);
        } else {
          setIsTokenExpired(false);
        }
      } catch (error) {
        setIsTokenExpired(true);
        localStorage.removeItem("accessToken");
        setToken(null);
        console.log(error);
      }
    } else {
      setIsTokenExpired(false); // Ensure expired state is false if no token
    }
  }, [token]);
  useEffect(() => {
    if (isTokenExpired) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="w-full h-full">
        <div className="px-5 py-24 sm:px-24 lg:px-0">
          <div className="grid items-center justify-center grid-cols-1 lg:grid-cols-12 auth-bg">
            <div className="mx-5 lg:mx-20 lg:col-start-5 lg:col-span-4">
              <div className="text-center">
                <Link to="/" className="block mb-10">
                  <img
                    src="https://complaincetownhall.dev-testing-team.tech/assets/logo-no-background-CLjwZW5M.png"
                    alt=""
                    className="block h-144 mx-auto dark:hidden"
                  />
                  <img
                    src="https://complaincetownhall.dev-testing-team.tech/assets/logo-no-background-CLjwZW5M.png"
                    alt=""
                    className="hidden h-144 mx-auto logo-light dark:block"
                  />
                </Link>

                <h4 className="mb-2 text-gray-800 text-21 dark:text-gray-50">
                  Sign in
                </h4>
                <p className="mb-6 text-gray-500 dark:text-gray-300">
                  Sign in to continue to CTH.
                </p>
              </div>
              <div className="bg-white card dark:bg-zinc-800 dark:border-transparent">
                <div className="p-5">
                  <div className="p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-5">
                        <label className="font-medium text-gray-700 dark:text-gray-200">
                          Mobile / Email
                        </label>
                        <div className="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent">
                          <span
                            className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
                            id="basic-addon3"
                          >
                            <i className="ri-user-2-line text-16"></i>
                          </span>
                          <input
                            type="text"
                            className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 "
                            placeholder="Enter email or Mobile"
                            aria-label="Enter Username"
                            aria-describedby="basic-addon3"
                            value={formData.emailOrMobile}
                            onChange={handleChange}
                            name="emailOrMobile"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        {/* <div className="float-right">
                          <Link
                            href="auth-recoverpw.html"
                            className="text-gray-500 text-13 "
                          >
                            Forgot password?
                          </Link>
                        </div> */}
                        <label className="font-medium text-gray-700 dark:text-gray-200">
                          OTP
                        </label>
                        <div className="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent otpclass">
                          <span
                            className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
                            id="basic-addon4"
                          >
                            <i className="ri-lock-2-line text-16"></i>
                          </span>
                          <input
                            type="password"
                            className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 "
                            placeholder="Enter OTP"
                            aria-label="Enter Password"
                            aria-describedby="basic-addon4"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex items-center mb-6">
                        <input
                          type="checkbox"
                          className="border-gray-100 rounded focus:ring-1 checked:ring-1 focus:ring-offset-0 focus:outline-0 checked:bg-[#B18D57]  "
                          id="memberCheck1"
                        />
                        <label
                          className="font-medium text-gray-700 ltr:ml-2 rtl:mr-2 dark:text-gray-200 ml-4"
                          htmlFor="remember-check"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="grid">
                        <button
                          className="py-2 text-white border-transparent btn bg-[#B18D57]  text-16"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Sign in"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-700 dark:text-gray-200">
                  © TOWNHALL. Crafted with{" "}
                  <i className="text-red-500 mdi mdi-heart"></i> by CTH
                </p>
                {error && (
                  <div className="mt-4 text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewLogin;
