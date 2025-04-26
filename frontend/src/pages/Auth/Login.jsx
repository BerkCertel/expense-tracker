import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // handleLogin login form submit

  const handleLogin = async (e) => {
    console.log(e);
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
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
