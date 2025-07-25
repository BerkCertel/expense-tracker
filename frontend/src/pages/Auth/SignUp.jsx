import AuthLayout from "../../components/layouts/AuthLayout";
import { useContext, useState } from "react";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

function SignUp() {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    // signup api calls

    try {
      // upload image if present

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);

        if (imgUploadRes == "") {
          setError("Image upload failed. Please try again.");
          return;
        }
        if (imgUploadRes.error) {
          setError(imgUploadRes.error);
          return;
        }
        profileImageUrl = imgUploadRes.imageUrl ? imgUploadRes.imageUrl : "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); // Update user context with user data
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-[5px ] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => {
                setFullName(target.value);
              }}
              label={"Full Name"}
              placeholder={"John"}
              type="text"
            />

            <Input
              label="Email"
              placeholder="john@example.com"
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <div className="col-span-2">
              <Input
                label="Password"
                placeholder="Min 6 characters"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn-primary" type="submit">
            SIGN UP
          </button>
          <div className="text-[13px] text-slate-800 mt-3">
            Already have an account ?
            <Link
              className="ml-1 font-medium text-primary underline"
              to="/login"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
