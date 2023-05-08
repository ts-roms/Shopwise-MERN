import style from "../../../styles/style";
import { Country, State } from "country-state-city";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../../hooks";

type IProps = {
  toggleActiveStep: (para: number) => void;
};

export default function ShippingInfo({ toggleActiveStep }: IProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [selectedAddress, setSelectedAddress] = useState<null | string>(null);

  const { user } = useAppSelector((state) => state.user);
  const { addresses } = user;

  function handleAddressChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedAddress(
      e.target.value === selectedAddress ? null : e.target.value
    );
  }

  return (
    <div className="bg-white shadow rounded p-8">
      <h4 className="text-lg font-semibold text-gray-800">Shipping Address</h4>
      <div className="mt-8">
        <form className="space-y-6">
          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label className="mb-1 text-sm hidden md:block" htmlFor="name">
                Full Name:
              </label>
              <input
                type="text"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                placeholder="Enter full name"
                id="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="w-2/5">
              <label className="mb-1 text-sm hidden md:block" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                id="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label
                className="mb-1 text-sm hidden md:block"
                htmlFor="primary-number"
              >
                Primary Number:
              </label>
              <input
                type="number"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                placeholder="Enter primary number"
                id="primary-number"
                required
                value={primaryNumber}
                onChange={(e) => setPrimaryNumber(e.target.value)}
              />
            </div>
            <div className="w-2/5">
              <label className="mb-1 text-sm hidden md:block" htmlFor="email">
                Alternate Number:
              </label>
              <input
                type="number"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                id="email"
                placeholder="Enter alternate number"
                required
                value={alternateNumber}
                onChange={(e) => setAlternateNumber(e.target.value)}
              />
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label className="mb-1 text-sm hidden md:block" htmlFor="zipCode">
                Zip Code:
              </label>
              <input
                type="number"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                placeholder="Enter zip code"
                id="zipCode"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="w-2/5">
              <label
                className="mb-1 text-sm hidden md:block"
                htmlFor="selectedCountry"
              >
                Select Country:
              </label>
              <select
                id="selectedCountry"
                className="bg-gray-50 text-sm md:text-base px-3 py-1.5 border rounded"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option selected disabled value="">
                  Choose Country
                </option>
                {Country.getAllCountries()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label
                className="mb-1 text-sm hidden md:block"
                htmlFor="selectedState"
              >
                Select State:
              </label>
              <select
                id="selectedState"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-gray-50 text-sm md:text-base px-3 py-1.5 border rounded"
              >
                <option selected disabled value="">
                  Choose State
                </option>
                {State.getStatesOfCountry(selectedCountry)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-2/5">
              <label
                className="mb-1 text-sm hidden md:block"
                htmlFor="address1"
              >
                Address 1:
              </label>
              <input
                type="text"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                id="address1"
                placeholder="House No., Building Name (Required)*"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label
                className="mb-1 text-sm hidden md:block"
                htmlFor="address2"
              >
                Address 2:
              </label>
              <input
                type="text"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                id="address2"
                placeholder="Road Name, Area, Colony (Required)*"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
            <div className="w-2/5">
              <label
                className="mb-1 text-sm hidden md:block"
                htmlFor="address3"
              >
                Address 3:
              </label>
              <input
                type="text"
                className={`${style.input} w-full text-sm py-1.5 px-2`}
                id="address3"
                placeholder="Nearby Famous Shop/Mall/Landmark"
                required
                value={address3}
                onChange={(e) => setAddress3(e.target.value)}
              />
            </div>
          </div>

          {user && user.addresses?.length > 0 && (
            <div>
              <label htmlFor="savedAddresses" className="mb-2 block text-sm">
                Select From Saved Addresses:
              </label>
              <div className={`${style.flex_normal} gap-12`}>
                {addresses?.map((address) => (
                  <div>
                    <input
                      type="checkbox"
                      name="address"
                      id={address._id}
                      value={address._id}
                      checked={address._id == selectedAddress}
                      onChange={handleAddressChange}
                    />
                    <label className="ml-2 text-sm" htmlFor={address._id}>
                      {address.addressType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <button
              onClick={() => toggleActiveStep(1)}
              value="Pay Now"
              className="bg-[#28a745] text-white rounded py-1.5 px-4 hover:shadow transition-all hover:bg-green-600"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
