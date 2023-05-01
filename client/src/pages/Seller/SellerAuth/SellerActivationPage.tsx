import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../server";

export default function SellerActivationPage() {
  const { activation_token } = useParams();

  const [error, setError] = useState(false);

  useEffect(() => {
    const activationEmail = async () => {
      try {
        const res = await axios.post(`${server}/shops/activation`, {
          activation_token,
        });
      } catch (error) {
        setError(true);
      }
    };

    activationEmail();
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {error ? (
        <p>Your Token is expired!</p>
      ) : (
        <p>Your shop has been created successfully!</p>
      )}
    </div>
  );
}
