import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";
// import UserContext from "../Context/Context";

const UserLoginPage = () => {
  //   const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;

    try {
      const response = await fetch("http://39.61.51.195:8004/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        // setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");

        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
        }

        navigate("/profile");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Email and Password do not match.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container ">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 bg-white p-5 rounded-end shadow">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="position-absolute "
                style={{ cursor: "pointer", right: "10px" }} // Adjust 'right' for alignment
              >
                {showPassword ? (
                  <MdRemoveRedEye size={20} />
                ) : (
                  <IoEyeOff size={20} />
                )}
              </span>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm text-white"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
            <p>
              By signing up you agree to the
              <Link to="/terms"> Terms of Service </Link>and
              <Link to="/privacy"> Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
