import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import formateDate from "../../helper/formatDate";
import { IAppState } from "../../Interface";
import { host } from "../../server";
import style from "../../styles/style";

interface IProps {
  isOwner: boolean;
}

export default function ShopInfo({ isOwner }: IProps) {
  const { seller } = useSelector((state: IAppState) => state.seller);

  const { name, avatar, address, phoneNumber, createdAt } = seller;

  function logoutHandler(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  return (
    <div className="p-5">
      <div
        className={`${style.flex_normal} justify-center flex-col space-y-3 border-b py-3`}
      >
        <img
          className="object-cover h-36 w-36 rounded-full"
          src={`${host}/${avatar}`}
          alt="seller profile picture"
        />
        <h4 className="text-xl">{name}</h4>
        <p className="text-[#000000a6] text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          sed totam? Ex consectetur quasi, accusamus illum illo fugiat deleniti
        </p>
      </div>
      <div className="space-y-3 py-3">
        <div>
          <h4 className="font-semibold">Address</h4>
          <p className="text-[#000000a6] text-sm">{address}</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact Number</h4>
          <p className="text-[#000000a6] text-sm">{phoneNumber}</p>
        </div>
        <div>
          <h4 className="font-semibold">Total Products</h4>
          <p className="text-[#000000a6] text-sm">10</p>
        </div>
        <div>
          <h4 className="font-semibold">Seller Ratings</h4>
          <p className="text-[#000000a6] text-sm">4/5</p>
        </div>
        <div>
          <h4 className="font-semibold">Joined On</h4>
          <p className="text-[#000000a6] text-sm">{formateDate(createdAt)}</p>
        </div>

        {isOwner && (
          <div className="flex gap-4 pt-5">
            <button className={`${style.button} text-white`}>Edit Shop</button>
            <button
              onClick={logoutHandler}
              className={`${style.button} text-white`}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
