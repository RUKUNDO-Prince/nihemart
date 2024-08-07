"use client";
import React, { useState } from "react";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  limit: number;
  additionalTitles?: JSX.Element;
}

const DataTable = <TData, TValue>({
  data,
  columns,
  page,
  limit,
}: DataTableProps<TData, TValue>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: limit,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const navigate = useNavigate();

  return (
    <div className="bg-white pb-3 mb-5 px-3 rounded-2xl border border-gray-90 mt-5 ">
      <div className="rounded-lg overflow-hidden w-full">
        <Table className="!border-none border-separate rowspacing2 min-w-[1300px]">
          <TableHeader className="bg-inherit !border-none">
            {table.getHeaderGroups().map((headerGroup, idx) => (
              <TableRow key={idx} className="!border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="!pt-3 !px-[13.5px] !rounded-2xl bg-gray-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  data-state={row.getIsSelected() && "selected"}
                  className={`!border-none hover:bg-gray-200 cursor-pointer`}
                  onClick={() => {
                    const { _id } = row.original as any;
                    navigate(`/orders/${_id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell, idx) => (
                    <TableCell
                      key={idx}
                      className={`${
                        cell.column.id === "_id"
                          ? "!rounded-l-[16px]"
                          : cell.column.id === "status"
                          ? "!rounded-r-[16px]"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[250px] pl-6 py-4 pr-4 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center w-full mt-[17px] mb-[12px]">
        <div className="flex items-center gap-3">
          <button
            className="p-[10px] bg-gray-100 !font-fredoka border border-[#272625] rounded-md"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FiChevronsLeft className="text-[#7f7f7f]" />
          </button>
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
            (page, idx) => (
              <button
                className={`rounded-xl !font-fredoka border leading-[16.8px] border-[#292828] px-[15px] py-3 ${
                  table.getState().pagination.pageIndex === idx
                    ? "bg-gray-100 text-black"
                    : "bg-gray-80 text-[#686868]"
                }`}
                onClick={() => table.setPageIndex(idx)}
              >
                {page}
              </button>
            )
          )}
          <button
            className="p-[10px] bg-gray-100 !font-fredoka border border-[#272625] rounded-md"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FiChevronsRight className="text-[#7f7f7f]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
