import loadable from "@loadable/component";
const Payment = loadable(() => import("./Components/Payment"));
const ShippingInfo = loadable(() => import("./Components/ShippingInfo"));
const Success = loadable(() => import("./Components/Success"));
const TotalBill = loadable(() => import("./Components/TotalBill"));

type IProps = {
  toggleActiveStep: (para: number) => void;
  activeStep: number;
};

export default function Checkout({ activeStep, toggleActiveStep }: IProps) {
  return (
    <div className="md:flex justify-between gap-8">
      <div className="flex-grow">
        {activeStep == 0 && (
          <ShippingInfo toggleActiveStep={toggleActiveStep} />
        )}
        {activeStep == 1 && <Payment toggleActiveStep={toggleActiveStep} />}
        {activeStep == 2 && <Success />}
      </div>
      <div className="w-1/3">
        <TotalBill />
      </div>
    </div>
  );
}
