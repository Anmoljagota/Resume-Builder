import React from "react";

const ProfessionalPhoto = ({ data, components }: any) => {
  return (
    <div className="flex justify-center items-center mt-[30px]">
      <div className="rounded-full border-[15px] border-white">
        <div className="p-[5px]">
          <img
            className="rounded-full w-[180px] h-[180px] border-[10px] border-stone-500"
            src={data.photoUrl}
            alt={data.name}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPhoto;
