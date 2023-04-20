import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../../helper/formatPrice";
import { IAppState } from "../../../Interface";
import { getShopAllProducts } from "../../../redux/actions/productActions";
import Loader from "../../Loader/Loader";

export default function ShopAllProducts() {
  const dispatch = useDispatch();
  const { seller } = useSelector((state: IAppState) => state.seller);
  const { products, isProductsLoading } = useSelector(
    (state: IAppState) => state.products
  );

  useEffect(() => {
    dispatch(getShopAllProducts(seller._id));
  }, [dispatch, seller._id]);

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
      maxWidth: 250,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
      maxWidth: 350,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      flex: 0.6,
      maxWidth: 120,
    },
    {
      field: "discountpercentage",
      headerName: "Discount Percentage",
      minWidth: 80,
      flex: 0.6,
      maxWidth: 100,
    },
    {
      field: "discountprice",
      headerName: "Discount Price",
      minWidth: 80,
      flex: 0.6,
      maxWidth: 120,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.6,
      maxWidth: 120,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 100,
      flex: 0.6,
      maxWidth: 150,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      maxWidth: 100,
      renderCell: (params: GridCellParams) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <button className="hover:bg-gray-200 bg-transparent rounded py-1.5 px-4 transition-all">
                <AiOutlineEye size={20} />
              </button>
            </Link>
          </>
        );
      },
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

  const row = [];

  products?.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: formattedPrice(item.price),
      Stock: item.stock,
      sold: item.sold_out,
      discountpercentage: item.discount_percentage,
      discountprice: formattedPrice(item.discount_price),
    });
  });

  return (
    <>
      {isProductsLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-scroll">
          <DataGrid
            rows={row}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
          />
        </div>
      )}
    </>
  );
}
