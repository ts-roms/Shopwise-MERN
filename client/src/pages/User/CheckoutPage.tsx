import loadable from "@loadable/component";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { toggleCart } from "../../redux/actions/cartActions";
const Checkout = loadable(() => import("../../components/Checkout/Checkout"));
const CheckoutTabs = loadable(
  () => import("../../components/Checkout/CheckoutTabs")
);

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  function toggleActiveStep(index: number) {
    setActiveStep(index);
  }

  useEffect(() => {
    // dispatch(toggleCart());
  }, []);

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
