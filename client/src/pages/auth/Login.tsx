import { FormEvent, useState, useContext, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function Login() {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = authContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-[20%] px-5 py-8 bg-white max-w-[500px] w-[90%] border shadow-xl rounded">
        {/* Title */}
        <h1 className="pb-4 text-3xl text-center font-bold text-orange-600 block">
          Zone Clocker
        </h1>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="email"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="password"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full uppercase text-center py-3 px-2 mb-4 bg-orange-600 text-white text-sm font-normal rounded"
          >
            Login
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex items-end justify-end">
            <Link to="/create-account">
              <p className="text-blue-900 underline cursor-pointer">Create an account</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
