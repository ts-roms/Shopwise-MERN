import loadable from "@loadable/component";
import { useState } from "react";
const Checkout = loadable(() => import("../../components/Checkout/Checkout"));
const CheckoutTabs = loadable(
  () => import("../../components/Checkout/CheckoutTabs")
);

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  function toggleActiveStep(index: number) {
    setActiveStep(index);
  }

  return (
    <section className="my-10">
      <div className="max-w-6xl py-10 mx-auto">
        <div className="w-full max-w-xl">
          <CheckoutTabs
            activeStep={activeStep}
            toggleActiveStep={toggleActiveStep}
          />
        </div>
        <div className="mt-8"></div>
        <Checkout activeStep={activeStep} toggleActiveStep={toggleActiveStep} />
      </div>
    </section>
  );
}
