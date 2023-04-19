import { ChangeEvent, FormEvent, useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import generateProductName from "../../../helper/generateRandomProductName";
import { IAppState, IAddProduct } from "../../../Interface";
import style from "../../../styles/style";
import categoriesData from "../../../constant/categories.json";
import calculateDiscountPrice from "../../../helper/calculateDiscountPrice";

const initilaState = {
  productName: generateProductName(),
  productDescription: "",
  productImages: [],
  productCategory: "",
  productTags: "",
  productPrice: 0,
  productDiscountPercentage: 0,
  productDiscountPrice: 0,
  productStock: 0,
};

export default function AddProduct() {
  const { seller } = useSelector((state: IAppState) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setFormData] = useState<IAddProduct>(initilaState);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "productDiscountPercentage") {
      if (/^[0-9]{0,2}$/.test(value) && parseInt(value) <= 90) {
        return setFormData((prev) => ({
          ...prev,
          productDiscountPercentage: Number(value),
          productDiscountPrice:
            name === "productDiscountPercentage"
              ? calculateDiscountPrice(prev.productPrice, Number(value))
              : prev.productDiscountPrice,
        }));
      } else if (value === "") {
        return setFormData((prev) => ({
          ...prev,
          productDiscountPercentage: 0,
          productDiscountPrice: 0,
        }));
      }

      return setFormData((prev) => ({
        ...prev,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log(form);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="w-full lg:w-1/2 bg-white shadow h-[87vh] rounded p-4 overflow-scroll">
      <h4 className="text-3xl font-Poppins text-center">Add Product</h4>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="productname">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productname"
            name="productName"
            onChange={handleChange}
            value={form.productName}
            placeholder="Enter your product name"
          />
        </div>

        <div>
          <label htmlFor="productdescription">
            Product Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productdescription"
            name="productDescription"
            onChange={handleChange}
            value={form.productDescription}
            placeholder="Enter your product Description"
          />
        </div>

        <div>
          <label htmlFor="productcategory">
            Product Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-9 rounded"
            name="productCategory"
            id="productcategory"
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Choose a Category
            </option>
            {categoriesData?.map((category, idx) => (
              <option value={category.title} key={idx}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="produttags">Product Tags</label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="producttags"
            name="productTags"
            onChange={handleChange}
            value={form.productTags}
            placeholder="Enter your product tags"
          />
        </div>

        <div>
          <label htmlFor="produtprice">
            Product Price <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productprice"
            name="productPrice"
            onChange={handleChange}
            value={form.productPrice}
            placeholder="Enter your product price"
          />
        </div>

        <div>
          <label htmlFor="produtdiscountpercentage">
            Product Discount (between 1-90 in percentage(%))
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="^(?:[0-9]|[1-8][0-9]|90)$"
            max={90}
            min={0}
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtdiscountpercentage"
            name="productDiscountPercentage"
            onChange={handleChange}
            value={form.productDiscountPercentage}
            placeholder="Enter your product discount percentage"
          />
        </div>

        <div>
          <label htmlFor="produtdiscountprice">Product Discount Price</label>
          <input
            type="number"
            disabled
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtdiscountpercentage"
            name="productDiscountPercentage"
            onChange={handleChange}
            value={form.productDiscountPrice}
          />
        </div>
      </form>
    </div>
  );
}
