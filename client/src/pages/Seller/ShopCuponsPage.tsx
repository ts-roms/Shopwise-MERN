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
  const [isOpen, setIsOpen] = useState(false);
  const [cuponcode, setCuponcode] = useState("");
  const [discountpercentage, setDiscountpercentage] = useState(0);
  const [miniamount, setMiniAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { seller } = useSelector((state: IAppState) => state.seller);
  const { products } = useSelector((state: IAppState) => state.products);

  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/shops/${seller._id}/coupons`,
        {
          name: cuponcode,
          value: discountpercentage,
          minAmount: miniamount,
          selectedProduct: selectedProduct,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setIsOpen(!isOpen);
        setCuponcode("");
        setDiscountpercentage(0);
        setMiniAmount(0);
        setSelectedProduct(null);
        toast.success(res.data.message);
      }
    } catch (e: AxiosError | any) {
      console.log(e);
      if (e.response) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getShopAllProducts(seller._id));
  }, [dispatch, seller._id]);

  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={8} />
          <div className="w-full flex-grow rounded bg-white shadow h-[87vh] flex flex-col p-8 space-y-8">
            <button
              className="bg-green-500 text-white px-3 py-1.5 self-end mr-8 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              Add Cuopon Code
            </button>
            <div className="flex overflow-x-scroll">
              <ShopCupons />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-25 flex justify-center h-screen items-center">
            <div className="bg-white rounded w-full shadow py-4 px-8 lg:w-2/5 relative">
              <div className="flex justify-end">
                <RxCross1
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer"
                  size={25}
                />
              </div>
              <div className="py-4">
                <h4 className="font-Poppins text-3xl text-center">
                  Create Cuopon Code
                </h4>
                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="space-y-6 mt-8"
                  aria-required={true}
                >
                  <div>
                    <label className="text-sm md:text-base" htmlFor="cuponcode">
                      Cuopon Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      id="cuponcode"
                      name="cuponcode"
                      value={cuponcode}
                      onChange={(e) => setCuponcode(e.target.value)}
                      required
                      placeholder="Enter your cupon code name"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm md:text-base"
                      htmlFor="discountpercentage"
                    >
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      id="discountpercentage"
                      name="discountpercentage"
                      required
                      min={0}
                      max={90}
                      value={discountpercentage}
                      onChange={(e) =>
                        setDiscountpercentage(parseInt(e.target.value))
                      }
                      maxLength={2}
                      placeholder="Enter discount percentage"
                    />
                  </div>

                  <div>
                    <label
                      className="text-sm md:text-base"
                      htmlFor="miniamount"
                    >
                      Minimum Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      id="miniamount"
                      name="miniamount"
                      min={0}
                      value={miniamount}
                      onChange={(e) => setMiniAmount(parseInt(e.target.value))}
                      required
                      placeholder="Enter your product name"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm md:text-base"
                      htmlFor="productcategory"
                    >
                      Product Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-9 rounded bg-gray-50 text-sm md:text-base px-3 py-1.5"
                      name="productCategory"
                      id="productcategory"
                      value={selectedProduct ? selectedProduct : ""}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      required
                    >
                      <option disabled selected>
                        Choose a Product
                      </option>
                      {products?.map((product, idx) => (
                        <option value={product._id} key={idx}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Add Cuopon Code"
                      className="bg-orange-500 py-1 px-3 text-white rounded-md shadow-sm cursor-pointer "
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
