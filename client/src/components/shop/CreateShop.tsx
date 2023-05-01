import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import PasswordInput from "../Auth/passwordInput/PasswordInput";
import style from "../../styles/style";
import { server } from "../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ICustomResponse } from "../../Interface";

const initialState = {
  file: null as File | null,
  fullname: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
  zipcode: "",
};

export default function CreateShop() {
  const [formData, setFormData] = useState(initialState);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = event.target;

    if (type === "file") {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;

      if (files?.[0]) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));

        // Create a preview of the uploaded image and display it in the UI
        const reader = new FileReader();
        reader.onload = () => {
          const imgPreview = document.getElementById(
            "img-preview"
          ) as HTMLImageElement;
          if (imgPreview) {
            imgPreview.src = reader.result as string;
          }
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { file, fullname, email, password, address, phoneNumber, zipcode } =
      formData;

    const newFrom = new FormData();

    newFrom.append("name", fullname);
    newFrom.append("email", email);
    newFrom.append("password", password);
    newFrom.append("address", address);
    newFrom.append("phoneNumber", phoneNumber);
    newFrom.append("zipcode", zipcode);
    if (file) {
      newFrom.append("file", file);
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post<ICustomResponse>(
        `${server}/shops/create-shop`,
        newFrom,
        config
      );
      toast.success(res.data.message);
      setFormData(initialState);
    } catch (error: AxiosError | any) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="px-8 py-12 w-full max-w-lg mx-auto bg-white shadow-lg">
      <h2 className="text-center text-2xl font-extrabold text-gray-900">
        Register as a new Seller
      </h2>
      <div className="mt-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className={`${style.flex_normal} justify-center flex-col`}>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="file"
              id="file"
              hidden
              required
            />
            <img
              id="img-preview"
              src="https://i.ibb.co/kK2JV13/Png-Item-1503945.png"
              className="h-40 w-40 rounded-full"
              alt="Profile Preview"
              loading="lazy"
            />
            <label
              htmlFor="file"
              className="text-blue-600 mt-2  cursor-pointer hover:text-blue-500 focus::text-blue-500"
            >
              Edit profile picture
            </label>
          </div>

          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="appearance-none block w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="appearance-none block w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="appearance-none block w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Zip Code
            </label>
            <input
              type="number"
              name="zipcode"
              required
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="appearance-none block w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Address
            </label>

            <textarea
              name="address"
              id="address"
              cols={30}
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="appearance-none block w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
            ></textarea>
          </div>

          <PasswordInput
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="w-full group bg-[#ff7d1a] text-white py-2 rounded hover:bg-orange-500 focus:bg-orange-500 transition-all"
            type="submit"
          >
            Submit
          </button>
          <div className={`${style.flex_normal}`}>
            <h4>Already have shop?</h4>
            <Link
              to="/login-shop"
              className="font-medium text-[#ff7d1a] transition-all hover:text-orange-500 focus:text-orange-500 ml-2"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
