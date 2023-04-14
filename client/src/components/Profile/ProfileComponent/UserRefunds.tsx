import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../../helper/formatPrice";

export default function UserRefunds() {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 12000000,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params: any) => {
        return params.value.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: formattedPrice(item.totalPrice),
        status: item.orderStatus,
      });
    });

  return (
    <div>
      <DataGrid rows={rows} columns={columns} autoHeight />
    </div>
  );
}
