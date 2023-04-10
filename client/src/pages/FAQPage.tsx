import FaqComponent from "../components/FaqComponent/FaqComponent";
import faqData from "../constant/faqData.json";

export default function FAQ() {
  window.scrollTo(0, 0);
  return (
    <section>
      <FaqComponent questions={faqData} />
    </section>
  );
}
