import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // handleLogin login form submit

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Plase enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Plase enter the password.");
      return;
    }

    setError("");

    //login apı calls
  };

  return (
    <AuthLayout>
      <div className="lg:w-[%70] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            placeholder="jhon@example.com"
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            label="Password"
            placeholder="Min 8 characters"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn-primary" type="submit">
            LOGİN
          </button>
          <div className="text-[13px] text-slate-800 mt-3">
            Don't have an account ?
            <Link
              className="ml-1 font-medium text-primary underline"
              to="/signup"
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
