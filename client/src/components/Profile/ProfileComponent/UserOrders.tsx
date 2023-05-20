import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { formattedPrice } from "../../../helper/formatPrice";
import { IOrder } from "../../../Interface";
import Loader from "../../Loader/Loader";

export default function UserOrders() {
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const loadUserOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${server}/users/${user._id}/orders`, {
        withCredentials: true,
      });

      setUserOrders(data.orders);

      setIsLoading(false);
    } catch (e: AxiosError | any) {
      setIsLoading(false);
      const error = e.response ? e.response : e.message;
      toast.error(error);
    }
  };

  useEffect(() => {
    loadUserOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,
      cellClassName: (params: any) => {
        return params.value.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <button className="hover:bg-gray-200 bg-transparent rounded py-1.5 px-4 transition-all">
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows: {
    id: string;
    itemsQty: number;
    total: string;
    status: string;
  }[] = [];

  userOrders &&
    userOrders.forEach((item) => {
      rows.push({
        id: item?._id,
        itemsQty: item?.cart?.length,
        total: formattedPrice(item.totalPrice),
        status: item.orderStatus,
      });
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataGrid rows={rows} columns={columns} autoHeight />
    </div>
  );
}
