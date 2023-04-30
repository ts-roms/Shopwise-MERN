import loadable from "@loadable/component";
import faqData from "../constant/faqData.json";
const FaqComponent = loadable(
  () => import("../components/FaqComponent/FaqComponent")
);

export default function FAQ() {
  window.scrollTo(0, 0);
  return (
    <section>
      <FaqComponent questions={faqData} />
    </section>
  );
}
