import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function CreateAccount() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/create-account", {
        name: name,
        email: email,
        password: password,
        company_email: companyEmail,
        company_name: companyName,
      });
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as AxiosError;
        console.log(axiosError.response);
      }
    }
  };

  return (
    <div className="sm:relative flex items-center justify-center w-full min-h-screen">
      <div className="sm:absolute top-[5%] px-5 sm:py-8 py-4 m-4 bg-white max-w-[500px] w-[90%] border shadow-xl rounded">
        {/* Title */}
        <h1 className="pb-4 text-3xl text-center font-bold text-orange-600 block">
          Zone Clocker
        </h1>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="company_name"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Company Name
            </label>
            <input
              required
              type="text"
              id="company_name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="company_email"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Company Email
            </label>
            <input
              required
              type="email"
              id="company_email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="email"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Your Email
            </label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="name"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              Your Name
            </label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 py-3 px-2 border rounded-md text-xs w-[100%] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full uppercase text-center py-3 px-2 mb-4 bg-orange-600 text-white text-sm font-normal rounded"
          >
            CREATE ACCOUNT
          </button>

          <div className="flex items-end justify-end">
            <Link to="/login">
              <p className="text-blue-900 underline cursor-pointer">Login instead</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
