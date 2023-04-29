import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex justify-center flex-col items-center">
                  
      <h1 className="text-3xl font-Poppins font-semibold">
        Oops! You seem to be lost.
      </h1>
                  <p className="mt-4 text-sm">Here are some helpful links:</p>
      <div className="flex gap-4 mt-4 items-center">
                    
        <Link className="text-xl" to="/">
          Home
        </Link>
                    
        <Link className="text-xl" to="/dashboard">
          Dashboard
        </Link>
      </div>
              
    </div>
  );
}
