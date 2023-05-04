import { AiOutlineCamera } from "react-icons/ai";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "../../../Interface";
import { host, server } from "../../../server";
import style from "../../../styles/style";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { loadUser, updateUserInfo } from "../../../redux/actions/userActions";
import axios, { AxiosError } from "axios";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.user);
  const {
    name,
    email,
    avatar,
    role,
    _id,
    primaryPhoneNumber,
    secondaryPhoneNumber,
  } = user;
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<null | File>(null);
  const dispatch = useAppDispatch();

  const initialsate: IUser = {
    name: name,
    avatar: avatar,
    email: email,
    role: role,
    _id: _id,
    primaryPhoneNumber: primaryPhoneNumber,
    secondaryPhoneNumber: secondaryPhoneNumber,
  };

  const [formData, setFormData] = useState<IUser>(initialsate);

  function handleUpdate() {
    setIsDisabled((prev) => !prev);
    window.scrollTo(0, 176);
    toast.info("Now you can make change.");
  }

  async function handleProfilePictureChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfilePic(file);

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      try {
        const { data } = await axios.put(`${server}/users/avatar`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        dispatch(loadUser());
      } catch (e: AxiosError | any) {
        if (e.response) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.message);
        }
      }
    }
  }

  function handleCancel() {
    setIsDisabled((prev) => !prev);
    setFormData(initialsate);
    toast.info("No changes made.");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    dispatch(updateUserInfo({ ...formData, password }));
  }

  return (
    <div className={`${style.flex_normal} flex-col w-full space-y-10`}>
      <div className="relative w-fit">
        <img
          className="h-36 w-36 rounded-full object-cover"
          src={`${host}/${avatar}`}
          alt="User Avatar"
        />
        <button className="w-8 h-8 rounded-full flex justify-center items-center absolute bottom-1 right-1 cursor-pointer bg-gray-200">
          <label htmlFor="avatar">
            <AiOutlineCamera cursor="pointer" />
          </label>
        </button>
        <input
          type="file"
          accept="image/*"
          name="avatar"
          id="avatar"
          onChange={(e) => handleProfilePictureChange(e)}
          className="hidden"
        />
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-7 md:space-y-9">
          <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
            <div className="w-full md:w-1/2">
              <label className="block mb-2" htmlFor="name">
                Full Name :
              </label>
              <input
                className={`${style.input} w-full`}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-2" htmlFor="email">
                Email :
              </label>
              <input
                className={`${style.input} w-full`}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
            <div className="w-full md:w-1/2">
              <label className="block mb-2" htmlFor="phone">
                Phone number (Primary) :
              </label>
              <input
                className={`${style.input} w-full`}
                type="number"
                name="primaryPhoneNumber"
                id="phone"
                minLength={10}
                maxLength={10}
                value={formData.primaryPhoneNumber}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-2" htmlFor="alternateNumber">
                Alternate Number (Secondary) :
              </label>
              <input
                className={`${style.input} w-full`}
                type="number"
                id="alternateNumber"
                name="secondaryPhoneNumber"
                minLength={10}
                maxLength={10}
                value={formData.secondaryPhoneNumber}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
          </div>
          <hr />
          <div className="w-full">
            <label className="block mb-2" htmlFor="password">
              Enter Password to update Details:
            </label>
            <input
              className={`${style.input} w-1/2`}
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              max={6}
              min={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDisabled}
              required
            />
          </div>
          <div className={`${style.flex_normal} gap-6`}>
            {isDisabled && (
              <button
                className={`${style.button} text-blue-500 bg-transparent border border-blue-500 transition-all hover:bg-blue-500 hover:text-white focus:text-white focus:bg-blue-500`}
                type="button"
                onClick={handleUpdate}
              >
                Update Details
              </button>
            )}
            {!isDisabled && (
              <button
                className={`${style.button} text-red-500 bg-transparent border border-red-500 transition-all hover:bg-red-500 hover:text-white focus:text-white focus:bg-red-500`}
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
            )}
            {!isDisabled && (
              <button
                className={`${style.button} bg-green-500 text-white transition-all hover:bg-green-600 focus:bg-green-600`}
                type="submit"
              >
                Save Details
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
