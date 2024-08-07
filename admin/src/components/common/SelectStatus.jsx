import React from "react";

const SelectStatus = ({status,updateStatus}) => {

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <select
        value={status}
        onChange={updateStatus}
        className={`px-5 py-2 rounded-md transition-all duration-600 mt-4 outline-none ${
          status === "completed"
            ? "bg-[#e0f7e9] text-green-500"
            : status === "processing"
            ? "bg-[#fff5e6] text-orange-400"
            : "bg-[#fdecea]  text-red-600"
        }`}
      >
        <option value={"completed"} className="bg-[#e0f7e9] text-green-500">
          Completed
        </option>
        <option value={"cancelled"} className="bg-[#fdecea]  text-red-600">
          Cancelled
        </option>
        <option value={"processing"} className=" bg-[#fff5e6] text-orange-400">
          Processing
        </option>
      </select>
    </form>
  );
};

export default SelectStatus;
