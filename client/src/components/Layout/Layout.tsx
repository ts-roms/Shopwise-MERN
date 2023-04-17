import { IComponentProp } from "../../Interface";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children }: IComponentProp): JSX.Element {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
}
