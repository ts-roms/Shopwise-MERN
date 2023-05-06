import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../../../server";
import PasswordInput from "../../Auth/passwordInput/PasswordInput";

export default function UserPasswordChange() {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/users/password-change`,
        formData,
        { withCredentials: true }
      );

      toast.success(data.message);
      setFormData(initialState);
    } catch (error: AxiosError | any) {
      if (error.response) {
        toast.error(error.response);
      } else {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [formData.newPassword, formData.confirmNewPassword]);

  return (
    <div className="w-full px-5">
      <h1 className="text-[#000000ba] pb-2 text-2xl">Change Password</h1>

      <div className="mt-8">
        <p className="mx-auto w-full max-w-xl text-gray-700 mb-6 text-center">
          Please enter your old password as it required to change your password,
          then enter your new password and confirm the new password.
        </p>
        <form
          className="space-y-4 w-full max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <PasswordInput
            name="oldPassword"
            placeholder="Enter Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <PasswordInput
            name="newPassword"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {formError && (
            <span className="text-xs text-red-400 font-Poppins">
              New password is not matching with confirm new password
            </span>
          )}
          <PasswordInput
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
          {formError && (
            <span className="text-xs text-red-400 font-Poppins">
              New password is not matching with confirm new password
            </span>
          )}
          <div>
            <button
              disabled={formError}
              className={`bg-[#28a745] text-white rounded py-1.5 px-4 hover:shadow transition-all hover:bg-green-600 ${
                formError ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
