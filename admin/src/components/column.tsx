import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Orders } from "../types/orders";
import moment from "moment";
import ExpandableText from "./ExpandableText";
import { displayNumbers } from "../utils/usableFuncs";

function abbreviateText(text: any) {
  if (text.length <= 10) {
    return text; // If text is 10 characters or less, return it as is
  }
  return text.slice(0, 5) + "..." + text.slice(-5);
}

export const getStatusStyles = (status) => {
  switch (status) {
    case "completed":
      return { color: "green", backgroundColor: "#e0f7e9" };
    case "processing":
      return { color: "orange", backgroundColor: "#fff5e6" };
    case "cancelled":
      return { color: "red", backgroundColor: "#fdecea" };
    default:
      return { color: "black", backgroundColor: "#ffffff" }; // default styles if status doesn't match
  }
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal">
        <span className="text-[#686868]">#</span>
        {abbreviateText(row?.original?._id)}
      </h2>
    ),
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal">{row?.original?.name}</h2>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal">{row?.original?.phone}</h2>
    ),
  },
  {
    accessorKey: "productDetails",
    header: "Products Name",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal flex gap-2">
        {row?.original?.productDetails?.slice(0, 2).map((product, idx) => (
          <ExpandableText key={idx} maxChars={15}>
            {product.name}
          </ExpandableText>
        ))}
        {row?.original?.productDetails?.length > 2 && (
          <span className="font-bold">
            ...+{row?.original?.productDetails?.length - 2}
          </span>
        )}
      </h2>
    ),
  },
  {
    accessorKey: "productDetails",
    header: "Quantity",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal flex gap-2">
        {row?.original?.productDetails?.slice(0, 2).map((product, idx) => (
          <p key={idx}>{product.quantity}</p>
        ))}
        {row?.original?.productDetails?.length > 2 && (
          <span className="font-bold">
            ...+{row?.original?.productDetails?.length - 2}
          </span>
        )}
      </h2>
    ),
  },
  {
    accessorKey: "productDetails",
    header: "Price",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal flex gap-2">
        {row?.original?.productDetails?.slice(0, 2).map((product, idx) => (
          <p>{displayNumbers(product.price)} Frw</p>
        ))}
        {row?.original?.productDetails?.length > 2 && (
          <span className="font-bold">
            ...+{row?.original?.productDetails?.length - 2}
          </span>
        )}
      </h2>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
    cell: ({ row }) => (
      <h2 className="text-sm font-normal flex gap-1">
        {moment(row.original.updatedAt).format("DD/MM/YYYY")}
      </h2>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <h2
        className="text-sm font-normal px-3 py-2 rounded-md flex items-center justify-center"
        style={getStatusStyles(row.original.status)}
      >
        {row?.original?.status}
      </h2>
    ),
  },
];
