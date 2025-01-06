import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Baseurl } from "../../Confige";

function LoginwithOtp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format

    try {
      const response = await fetch(Baseurl + "/api/v1/user/sendsms", {
        // Updated API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailAddress: formData.email }), // Adjusted field name here
      });

      if (!response.ok) {
        const data = await response.json();
        // Handle specific error messages from the server
        if (data.message) {
          throw new Error(data.message);
        }
        throw new Error("Request failed");
      }

      localStorage.setItem("OtpEmail", formData.email);
      setSuccessMessage("OTP sent to your email!");
      setErrorMessage(""); // Clear any previous error message
      navigate("/otp");
      setFormData({ email: "" });
    } catch (error) {
      console.error("Send OTP error:", error);
      setErrorMessage(error.message || "An error occurred while sending OTP.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 h-screen flex items-center justify-center gap-24">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md h-[40vh]">
          <div className="p-6 space-y-4 sm:p-8">
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
              Sign in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Email
                </label>
                <input
                  value={formData.email}
                  type="text"
                  name="emailOrMobile"
                  id="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#B18D57] focus:border-[#B18D57] block w-full p-2.5"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => {
                    setFormData({ email: e.target.value }); // Update email value in formData
                  }}
                  onInput={(e) => {
                    // Allow only letters, numbers, @, and .
                    e.target.value = e.target.value.replace(
                      /[^a-zA-Z0-9@.]/g,
                      ""
                    );
                  }}
                  inputMode="numeric"
                />
              </div>
              {/* Increased the margin-top of the button to create more gap */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-[#B18D57] hover:bg-[#B18D57] focus:ring-4 focus:outline-none focus:ring-[#B18D57] font-medium rounded-lg text-sm px-5 py-2.5 text-center  mt-24"
              >
                {loading ? "Logging in..." : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#B18D57] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
            {errorMessage && (
              <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-sm text-green-500 mt-2">{successMessage}</p>
            )}{" "}
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginwithOtp;
