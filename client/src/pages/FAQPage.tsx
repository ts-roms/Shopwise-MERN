import FaqComponent from "../components/FaqComponent/FaqComponent";
import faqData from "../constant/faqData.json";

export default function FAQ() {
  return (
    <section>
      <FaqComponent questions={faqData} />
    </section>
  );
}
