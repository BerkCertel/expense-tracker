import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // eksik olan import

function Input({ value, onChange, placeholder, label, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="">{label}</label>
      <div className="input-box relative">
        <input
          className="w-full bg-transparent outline-none"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
