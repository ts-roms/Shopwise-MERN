import loadable from "@loadable/component";
const PasswordInput = loadable(() => import("../passwordInput/PasswordInput"));
import { useState, ChangeEvent, FormEvent } from "react";
import style from "../../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  isRemeber: false,
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${server}/users/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.status) {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload();
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="px-8 py-12 w-full max-w-md mx-auto bg-white shadow-lg">
      <h2 className="text-center text-2xl font-extrabold text-gray-900">
        Log in to your account
      </h2>
      <div className="mt-14">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="appearance-none block w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <PasswordInput
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className={`${style.flex_normal} justify-between`}>
            <div className={`${style.flex_normal}`}>
              <input
                type="checkbox"
                name="isRemeber"
                id="remeberme"
                checked={formData.isRemeber}
                onChange={handleChange}
                className="h-4 w-4 text-[#ff7d1a] focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remeberme"
                className="ml-2 block text-sm text-gray-900"
              >
                Remeber me
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/forgetpassword"
                className="font-medium text-[#ff7d1a] transition-all hover:text-orange-500 focus:text-orange-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            className="w-full group bg-[#ff7d1a] text-white py-2 rounded hover:bg-orange-500 focus:bg-ornage-500 transition-all"
            type="submit"
          >
            Login
          </button>
          <div className={`${style.flex_normal}`}>
            <h4>Not have any account?</h4>
            <Link
              to="/signup"
              className="font-medium text-[#ff7d1a] transition-all hover:text-orange-500 focus:text-orange-500 ml-2"
            >
              Signup
            </Link>
          </div>
          <div>
            looking for Home Page?
            <Link
              to="/"
              className="font-medium text-blue-500 transition-all hover:text-blue-500 focus:text-blue-500 ml-2"
            >
              click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
