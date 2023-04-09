import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { product_slug } = useParams();

  return (
    <div>
      <h1>{product_slug}</h1>
      ds
    </div>
  );
}
