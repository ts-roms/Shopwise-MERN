import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { formattedPrice } from "../../../helper/formatPrice";
import { IAppState, ICoupon } from "../../../Interface";
import { deleteProduct } from "../../../redux/actions/productActions";
import { server } from "../../../server";
import Loader from "../../Loader/Loader";

type row = {
  id: string;
  name: string;
  discountpercentage: string;
  minamt: string;
};

export default function ShopCupons() {
  const dispatch = useDispatch();
  const { seller } = useSelector((state: IAppState) => state.seller);

  const [coupons, setCoupon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getCoupons() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${server}/shops/${seller._id}/coupons`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setCoupon(res.data.coupons);
        setIsLoading(false);
      }
    } catch (e: AxiosError | any) {
      if (e.response) {
        setError(e.response.data.message);
        console.log(e);
      } else {
        setError(e.message);
        console.log(e);
      }
    }
  }

  useEffect(() => {
    getCoupons();
  }, [dispatch, seller._id]);

  const columns = [
    {
      field: "id",
      headerName: "Coupon Id",
      minWidth: 150,
      flex: 0.7,
      maxWidth: 250,
    },
    {
      field: "name",
      headerName: "Coupon Name",
      minWidth: 180,
      flex: 1.4,
      maxWidth: 350,
    },
    {
      field: "discountpercentage",
      headerName: "Discount Percentage",
      minWidth: 80,
      flex: 0.6,
      maxWidth: 100,
    },
    {
      field: "minamt",
      headerName: "Minimum Amount",
      minWidth: 80,
      flex: 0.6,
      maxWidth: 120,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      maxWidth: 100,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <button className="hover:bg-gray-200 bg-transparent rounded py-1.5 px-4 transition-all">
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const row: row[] = [];

  coupons?.forEach((item: ICoupon) => {
    row.push({
      id: item._id,
      name: item.name,
      discountpercentage: item.value + "%",
      minamt: formattedPrice(item.minAmount),
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
        />
      )}
    </>
  );
}
