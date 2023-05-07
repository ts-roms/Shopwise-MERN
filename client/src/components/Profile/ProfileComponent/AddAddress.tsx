import { RxCross1 } from "react-icons/rx";
import { FormEvent, useState } from "react";
import { Country, State } from "country-state-city";
import style from "../../../styles/style";
import {
  HiOutlineOfficeBuilding,
  HiOutlineGlobeAlt,
  HiOutlineHome,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { updateUserAddress } from "../../../redux/actions/userActions";

type Props = {
  handleModalOpen: () => void;
};

export default function AddAddress({ handleModalOpen }: Props) {
  const addressType = [
    {
      name: "Home",

      icon: <HiOutlineHome className="mr-1" />,
    },
    {
      name: "Office",
      icon: <HiOutlineOfficeBuilding className="mr-1" />,
    },
    {
      name: "Others",
      icon: <HiOutlineGlobeAlt className="mr-1" />,
    },
  ];

  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [selectedAddressType, setSelectedAddressType] = useState("");

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();

    if (
      selectedAddressType === "" ||
      selectedCountry === "" ||
      selectedState == ""
    ) {
      toast.error("Please fill all the required fields");
    } else {
      const obj = {
        country: selectedCountry,
        state: selectedState,
        address1,
        address2,
        address3,
        zipcode,
        addressType: selectedAddressType,
      };
      dispatch(updateUserAddress(obj));

      handleModalOpen();
      setSelectedCountry("");
      setAddress1("");
      setAddress2("");
      setAddress3("");
      setSelectedState("");
      setZipcode("");
      setSelectedAddressType("");
    }
  }

  return (
    <div
      className="fixed w-full h-screen bg-black top-0 left-0 flex items-center justify-center z-[9999]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-full max-w-[600px] overflow-y-scroll bg-white shadow px-8 py-12 rounded">
        <div className="flex justify-between">
          <h2 className="text-2xl font-Poppins">Add New Address</h2>
          <button onClick={handleModalOpen}>
            <RxCross1 size={30} />
          </button>
        </div>
        <div className="mt-7">
          <form aria-required onSubmit={handleSubmit} className="space-y-6">
            <div
              className="w-full flex flex-wrap gap-4 justify-between items-center"
              onSubmit={handleSubmit}
            >
              <div className="w-2/5">
                <label htmlFor="country" className="block pb-1">
                  Choose your Country:
                </label>
                <select
                  className="bg-gray-50 text-sm md:text-base px-3 py-1.5 border rounded"
                  value={selectedCountry}
                  required
                  id="country"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option disabled selected value="">
                    Select your country
                  </option>
                  {Country.getAllCountries()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((country) => (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-2/5">
                <label className="block pb-1" htmlFor="zipcode">
                  Zip Code:
                </label>
                <input
                  type="number"
                  value={zipcode}
                  id="zipcode"
                  required
                  onChange={(e) => setZipcode(e.target.value)}
                  className={`${style.input}`}
                  placeholder="Zip Code (Required)*"
                />
              </div>
            </div>

            <div className="w-full flex gap-4 flex-wrap justify-between items-center">
              <div className="w-2/5">
                <label htmlFor="state" className="block pb-1 ">
                  Choose your State:
                </label>
                <select
                  className="bg-gray-50 text-sm md:text-base px-3 py-1.5 border rounded"
                  value={selectedState}
                  required
                  id="state"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option selected disabled value="">
                    Select your State
                  </option>
                  {State.getStatesOfCountry(selectedCountry)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-2/5">
                <label className="block pb-1">Select Address Type:</label>
                <div className={`${style.flex_normal} gap-2`}>
                  {addressType?.map((addressType) => (
                    <button
                      type="button"
                      key={addressType.name}
                      onClick={() => setSelectedAddressType(addressType.name)}
                      className={`${
                        selectedAddressType == addressType.name
                          ? "bg-orange-500 text-white"
                          : ""
                      } flex items-center py-1 px-2 text-xs rounded border`}
                    >
                      {addressType.icon}
                      {addressType.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full">
              <label className="block pb-1" htmlFor="address1">
                Address 1:
              </label>
              <input
                type="text"
                value={address1}
                id="address1"
                required
                onChange={(e) => setAddress1(e.target.value)}
                className={`${style.input} w-full`}
                placeholder="House No., Building Name (Required)*"
              />
            </div>

            <div className="w-full">
              <label className="block pb-1" htmlFor="address2">
                Address 2:
              </label>
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                id="address2"
                className={`${style.input} w-full`}
                placeholder="Road Name, Area, Colony (Required)*"
              />
            </div>

            <div className="w-full">
              <label className="hidden md:block pb-1" htmlFor="address3">
                Address 2:
              </label>
              <input
                type="text"
                id="address3"
                value={address3}
                onChange={(e) => setAddress3(e.target.value)}
                className={`${style.input} w-full`}
                placeholder="Nearby Famous Shop/Mall/Landmark"
              />
            </div>

            <div>
              <input
                type="submit"
                value="Submit"
                className="cursor-pointer px-4 py-1 bg-green-700 text-white shadow-sm rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
