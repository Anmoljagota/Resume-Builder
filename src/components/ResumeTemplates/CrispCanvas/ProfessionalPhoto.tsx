import React from "react";

const ProffesionalPhoto = ({ data, components }: any) => {
  return (
    <div className="flex justify-center items-center mt-[30px]">
      <div className="p-[5px]">
        <img
          className="rounded-full  h-[180px] w-[180px] border-[10px] border-stone-500"
          src={data.photoUrl}
          alt={data.name}
        />
      </div>
    </div>
  );
};

export default ProffesionalPhoto;
