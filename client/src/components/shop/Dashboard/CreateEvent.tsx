import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import generateProductName from "../../../helper/generateRandomProductName";
import categoriesData from "../../../constant/categories.json";
import calculateDiscountPrice from "../../../helper/calculateDiscountPrice";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState(generateProductName);
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productCategory, setProductCategory] = useState("");
  const [productTags, setProductTags] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscountPercentage, setproductDiscountPercentage] = useState(0);
  const [productDiscountPrice, setProductDiscountPrice] = useState(0);
  const [productStock, setproductStock] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files);
      if (filesArray) {
        setProductImages((prev) => [...prev, ...filesArray]);
      }
    }
  }

  function handleStartDateChange(e: ChangeEvent<HTMLInputElement>) {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);

    const inputDateElement = document.getElementById(
      "eventenddate"
    ) as HTMLInputElement | null;
    if (inputDateElement) {
      inputDateElement.min = minEndDate.toISOString().slice(0, 10);
    }
  }

  function handleEndDateChange(e: ChangeEvent<HTMLInputElement>) {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  }

  const today = new Date().toISOString().slice(0, 10);

  const minendDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const form = new FormData();

    productImages.forEach((img) => {
      form.append("images", img);
    });

    form.append("name", productName.toString());
    form.append("description", productDescription.toString());
    form.append("category", productCategory.toString());
    form.append("tags", productTags.toString());
    form.append("price", productPrice.toString());
    form.append("discount_percentage", productDiscountPercentage.toString());
    form.append("discount_price", productDiscountPrice.toString());
    form.append("stock", productStock.toString());
    if (startDate !== null) form.append("startDate", startDate.toISOString());
    if (endDate !== null) form.append("endDate", endDate.toISOString());

    try {
      axios.defaults.withCredentials = true;
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const res = await axios.post(`${server}/shops/events`, form, config);

      if (res.status == 201) {
        toast.success("Event Added Successfully");
        navigate("/shop-events");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    setProductDiscountPrice(
      calculateDiscountPrice(productPrice, productDiscountPercentage)
    );
  }, [productPrice, productDiscountPercentage]);

  return (
    <div className="w-full lg:w-3/5 p-8">
      <h4 className="text-3xl font-Poppins text-center">Add Product</h4>
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div>
          <label className="text-sm md:text-base" htmlFor="productname">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productname"
            name="productName"
            required
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            placeholder="Enter your event product name"
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="productdescription">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productdescription"
            name="productDescription"
            required
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
            placeholder="Enter your event product Description"
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="productcategory">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-9 rounded bg-gray-50 text-sm md:text-base px-3 py-1.5"
            name="productCategory"
            id="productcategory"
            required
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option disabled selected>
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
          <label className="text-sm md:text-base" htmlFor="produttags">
            Event Tags
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="producttags"
            name="productTags"
            onChange={(e) => setProductTags(e.target.value)}
            value={productTags}
            placeholder="Enter your event product tags"
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="eventstartdate">
            Event Start Date
          </label>
          <input
            type="date"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="eventstartdate"
            name="startDate"
            min={today}
            onChange={handleStartDateChange}
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            placeholder="Enter your event product tags"
          />
        </div>
        <div>
          <label className="text-sm md:text-base" htmlFor="eventstartdate">
            Event End Date
          </label>
          <input
            type="date"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="eventenddate"
            name="endDate"
            min={minendDate}
            onChange={handleEndDateChange}
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            placeholder="Enter your event product tags"
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtprice">
            Price (in paisa) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productprice"
            name="productPrice"
            required
            onChange={(e) => setProductPrice(parseInt(e.target.value))}
            value={productPrice}
            placeholder="Enter your event product price"
            min={0}
          />
        </div>

        <div>
          <label
            className="text-sm md:text-base"
            htmlFor="produtdiscountpercentage"
          >
            Discount (between 1-90 in percentage(%))
          </label>
          <input
            type="number"
            max={90}
            min={0}
            maxLength={2}
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtdiscountpercentage"
            name="productDiscountPercentage"
            onChange={(e) =>
              setproductDiscountPercentage(parseInt(e.target.value))
            }
            value={productDiscountPercentage}
            placeholder="Enter your event product discount percentage"
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtdiscountprice">
            Discount Price (in paisa)
          </label>
          <input
            type="number"
            disabled
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtdiscountpercentage"
            name="productDiscountPercentage"
            value={productDiscountPrice}
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtstock">
            Stocks of Product <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtstock"
            name="productStock"
            required
            onChange={(e) => setproductStock(parseInt(e.target.value))}
            value={productStock}
          />
        </div>

        <div>
          <label className="text-sm md:text-base">
            Upload Images (max 5 images) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="productdimages"
            name="productImages"
            multiple
            required
            onChange={handleImageChange}
          />
          <div className="flex items-center mt-2 gap-1 overflow-x-scroll whitespace-nowrap">
            {productImages.length < 5 && (
              <label htmlFor="productdimages" className="cursor-pointer">
                <div className="h-24 w-24 rounded bg-gray-200 flex justify-center items-center">
                  <IoAddCircleOutline color="orange" size={30} />
                </div>
              </label>
            )}
            {productImages?.map((img, idx) => (
              <div className="inline-block relative" key={idx}>
                <img
                  src={URL.createObjectURL(img)}
                  loading="lazy"
                  className="h-24 w-24 rounded object-cover m-2"
                />
                <span
                  className="absolute cursor-pointer top-0 right-0 rounded-full bg-red-600 text-white h-6 w-6 flex items-center justify-center"
                  onClick={() => {
                    const newImages = [...productImages];
                    newImages.splice(idx, 1);
                    setProductImages(newImages);
                  }}
                >
                  <RxCross2 />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <input
            type="submit"
            value="Create Event"
            className="appearance-none cursor-pointer text-center block w-full h-9 border border-orange-500 text-orange-500 rounded transition-all hover:text-white hover:bg-orange-500"
          />
        </div>
      </form>
    </div>
  );
}
