import loadable from "@loadable/component";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import style from "../../../styles/style";
const AddAddress = loadable(() => import("./AddAddress"));

export default function UserAdrress() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, userError, message } = useAppSelector((state) => state.user);

  const { addresses } = user;

  console.log(message);

  const dispatch = useAppDispatch();

  function handleModalOpen() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch({ type: "ClearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "ClearMessage" });
    }
  }, [userError, message]);

  return (
    <div className="w-full px-5">
      {isModalOpen && <AddAddress handleModalOpen={handleModalOpen} />}
      <div className={`w-full ${style.flex_normal} justify-between`}>
        <h1 className="text-[#000000ba] pb-2 text-2xl">Saved Addresses</h1>

        <button
          className={`${style.button} text-white`}
          onClick={handleModalOpen}
        >
          <span className="mr-1">
            <MdOutlineAdd size={25} />
          </span>
          Add New
        </button>
      </div>

      <div className="space-y-10 mt-6 py-3">
        {addresses?.map((address) => (
          <div
            className={`w-full rounded ${style.flex_normal} justify-between bg-gray-50 shadow py-4 px-8`}
          >
            <div className={`${style.flex_normal}`}>
              <h4 className="font-semibold">{address.addressType}</h4>
            </div>
            <div className={`${style.flex_normal} gap-4`}>
              <h4>{`${address.address1} ${address.address2}`}</h4>
            </div>
            <div className={`${style.flex_normal} gap-4`}>
              <h4>{user?.primaryPhoneNumber}</h4>
            </div>
            <AiOutlineDelete className="cursor-pointer" size={25} />
          </div>
        ))}
      </div>
    </div>
  );
}
