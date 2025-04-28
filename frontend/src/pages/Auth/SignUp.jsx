import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

function SignUp() {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Plase enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Plase enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Plase enter the password.");
      return;
    }

    setError("");

    // signup apı calls
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-[5px ] mb-6">
          Jion us today by entering your details below.
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
              placeholder={"Jhon"}
              type="text"
            />

            <Input
              label="Email"
              placeholder="jhon@example.com"
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <di0 className="col-span-2">
              <Input
                label="Password"
                placeholder="Min 8 characters"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </di0>
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
              Logın
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
