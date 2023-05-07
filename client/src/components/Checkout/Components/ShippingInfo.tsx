import style from "../../../styles/style";
import { Country, State } from "country-state-city";
import { useState } from "react";

export default function ShippingInfo() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="bg-white shadow rounded p-8">
      <h4 className="text-lg font-medium">Shipping Address</h4>
      <div className="mt-8">
        <form className="space-y-6">
          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="name">
                Full Name:
              </label>
              <input
                type="text"
                className={`${style.input} w-full`}
                placeholder="Enter full name"
                id="name"
                required
              />
            </div>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className={`${style.input} w-full`}
                id="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="primary-number">
                Primary Number:
              </label>
              <input
                type="number"
                className={`${style.input} w-full`}
                placeholder="Enter primary number"
                id="primary-number"
                required
              />
            </div>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="email">
                Alternate Number:
              </label>
              <input
                type="number"
                className={`${style.input} w-full`}
                id="email"
                placeholder="Enter alternate number"
                required
              />
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="zipCode">
                Zip Code:
              </label>
              <input
                type="number"
                className={`${style.input} w-full`}
                placeholder="Enter zip code"
                id="zipCode"
                required
              />
            </div>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="selectedCountry">
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
              <label className="mb-1 hidden md:block" htmlFor="selectedState">
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
              <label className="mb-1 hidden md:block" htmlFor="address1">
                Address 1:
              </label>
              <input
                type="text"
                className={`${style.input} w-full`}
                id="address1"
                placeholder="House No., Building Name (Required)*"
                required
              />
            </div>
          </div>

          <div className={`${style.flex_normal} gap-8 flex-wrap`}>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="address2">
                Address 2:
              </label>
              <input
                type="text"
                className={`${style.input} w-full`}
                id="address2"
                placeholder="Road Name, Area, Colony (Required)*"
                required
              />
            </div>
            <div className="w-2/5">
              <label className="mb-1 hidden md:block" htmlFor="address3">
                Address 3:
              </label>
              <input
                type="text"
                className={`${style.input} w-full`}
                id="address3"
                placeholder="Nearby Famous Shop/Mall/Landmark"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="button"
              value="Pay Now"
              className="bg-[#28a745] text-white rounded py-1.5 px-4 hover:shadow transition-all hover:bg-green-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
