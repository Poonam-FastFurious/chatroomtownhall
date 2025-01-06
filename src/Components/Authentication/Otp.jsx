import { useState } from "react";
import { Link } from "react-router-dom";

import { Baseurl } from "../../Confige";

function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input if available
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine OTP digits into a single string
    const otpCode = otp.join("");

    // Retrieve email from localStorage
    const emailAddress = localStorage.getItem("OtpEmail");

    try {
      const response = await fetch(Baseurl + "/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailAddress, OTP: otpCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Request failed");
      }

      // Parse the response JSON
      const data = await response.json();

      localStorage.setItem("userid", data.data.user._id);
      localStorage.setItem("user", JSON.stringify(data.data.user.name));
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // Store tokens in cookies using js-cookie library
      document.cookie = `accessToken=${data.data.accessToken}; path=/; `;
      document.cookie = `refreshToken=${data.data.refreshToken}; path=/; `;

      console.log("Login success:", data); // Handle success response here
      setSuccessMessage("Login successful!");
      setErrorMessage(""); // Clear any previous error message

      // Redirect to the dashboard or home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Change this route to match your dashboard route

      // Clear email from localStorage if needed
      localStorage.removeItem("OtpEmail");
    } catch (error) {
      console.error("OTP verification error:", error); // Handle error here
      setErrorMessage(` ${error.message || "Please try again."}`);
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 h-screen flex items-center justify-center gap-24">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md h-[40vh]">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 h-96 justify-center items-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Link
                to="/"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
              >
                <img
                  className="w-16 mr-2"
                  src={
                    "https://complaincetownhall.dev-testing-team.tech/assets/logo-no-background-CLjwZW5M.png"
                  }
                  alt="logo"
                />
              </Link>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Verify OTP
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="flex gap-2 w-full mx-auto ">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-10 md:w-12 h-10 flex items-center text-center text-black text-base border-2 border-gray-300 focus:border-AFPPrimary outline-none rounded"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#B18D57] hover:bg-[#B18D57] focus:ring-4 focus:outline-none focus:ring-[#B18D57] font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-24"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Login"}
                </button>
                {errorMessage && (
                  <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-sm text-green-500 mt-2">
                    {successMessage}
                  </p>
                )}
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline"
                    disabled={loading}
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Otp;
