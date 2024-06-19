import React from "react";

const ProfessionalPhoto = ({ data, components }: any) => {
 
  return (
    <div className="flex justify-center items-center mt-[8px]">
      <div>
        <img
          className="w-[150px] h-[150px]"
          src={data.photoUrl}
          alt={data.name}
          style={{position:'relative'}}
/>
      </div>
<hr style={{position:"absolute",border:"1px solid #b49773",width:"170px",margin:"150px 0px 0px 0px"}}/>
    </div>
  );
};

export default ProfessionalPhoto;