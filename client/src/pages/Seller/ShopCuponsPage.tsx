import axios, { AxiosError } from "axios";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShopCupons from "../../components/shop/Dashboard/ShopCupons";
import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";
import { IAppState } from "../../Interface";
import { getShopAllProducts } from "../../redux/actions/productActions";
import { server } from "../../server";

export default function ShopCuponsPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={8} />
          <div className="w-full overflow-x-scroll flex-grow rounded bg-white shadow h-[87vh] flex p-8">
            <ShopCupons />
          </div>
        </div>
      </section>
    </>
  );
}
