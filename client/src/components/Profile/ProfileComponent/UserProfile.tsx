import { AiOutlineCamera } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { IUser } from "../../../Interface";
import { host } from "../../../server";
import style from "../../../styles/style";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.user);
  const { name, email, avatar, role, _id } = user;
  const [isDisabled, setIsDisabled] = useState(true);

  const initialsate: IUser = {
    name: name,
    avatar: avatar,
    email: email,
    role: role,
    _id: _id,
  };

  const [formData, setFormData] = useState<IUser>(initialsate);

  function handleUpdate() {
    setIsDisabled((prev) => !prev);
    window.scrollTo(0, 176);
    toast.info("Now you can make change.");
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

  function handleSubmit() {}

  return (
    <div className={`${style.flex_normal} flex-col w-full space-y-10`}>
      <div className="relative w-fit">
        <img
          className="h-36 w-36 rounded-full object-cover"
          src={`${host}/${avatar}`}
          alt=""
        />
        <div className="w-8 h-8 rounded-full flex justify-center items-center absolute bottom-1 right-1 cursor-pointer bg-gray-200">
          <AiOutlineCamera />
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <form
          action=""
          onSubmit={handleSubmit}
          className="space-y-7 md:space-y-9"
        >
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
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
            <div className="w-full md:w-1/2">
              <label className="block mb-2" htmlFor="phone">
                Phone number :
              </label>
              <input
                className={`${style.input} w-full`}
                type="number"
                name="phone"
                id="phone"
                max={10}
                // value={formData.email}
                // onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-2" htmlFor="zipcode">
                Zipcode :
              </label>
              <input
                className={`${style.input} w-full`}
                type="number"
                id="zipcode"
                name="zipcode"
                max={6}
                min={4}
                // value={formData.name}
                // onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-2" htmlFor="address">
              Address :
            </label>
            <textarea
              className={`${style.input} w-full`}
              name="address"
              id="address"
              cols={30}
              rows={8}
              disabled={isDisabled}
            ></textarea>
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
