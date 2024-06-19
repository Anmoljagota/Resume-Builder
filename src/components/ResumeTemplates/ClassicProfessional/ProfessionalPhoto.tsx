import React from "react";

const ProfessionalPhoto = ({ data, components }: any) => {
  return (
    <div className="flex justify-center items-center mt-[20px]">
      <div>
        <img
          className="rounded-full w-[200px] h-[200px] border-[10px] border-stone-500"
          src={data.photoUrl}
          alt={data.name}
        />
      </div>
    </div>
  );
};

export default ProfessionalPhoto;
