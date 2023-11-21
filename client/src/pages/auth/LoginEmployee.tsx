import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginEmployee() {
  const [formData, setFormData] = useState<{ id_number: number | "" }>({
    id_number: "",
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { login } = authContext;

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id_number === "") {
      setErrorMessage("Please enter your ID");
    } else {
      setErrorMessage(null);
    }

    try {
      await login(formData);
      navigate("/employee/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-[20%] px-5 py-8 bg-white max-w-[500px] w-[90%] border shadow-xl rounded">
        {/* Title */}
        <h1 className="pb-4 text-3xl text-center font-bold text-orange-600 block">
          Zone Clocker Employee
        </h1>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="mb-4 flex flex-col items-start">
            <label
              htmlFor="id_number"
              className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
            >
              ID Employee
            </label>
            <input
              type="text"
              id="id_number"
              name="id_number"
              value={formData.id_number}
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
        </form>
      </div>
    </div>
  );
}
