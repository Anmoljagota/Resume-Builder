"use client";
import VariantButton from "@/components/common/Button/VariantButton";
import Paper from "@/components/common/Paper";
import React from "react";
import ModalComponent from "@/components/common/ModalComponent";
import SliderComponent from "@/components/common/SliderComponent";
import SmartArt from "@/assets/templates/Smart-art.png";
import Image from "next/image";

export function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`cursor-pointer${className}`} onClick={onClick} />;
}

export function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={`cursor-pointer${className}`} onClick={onClick} style={style} />;
}

const SwipeToSlide = ({
  onSelectTemplate,
  displayTemplate = false,
  onCloseTemplateModal,
}: {
  onSelectTemplate: (value: string) => void;
  displayTemplate: boolean;
  onCloseTemplateModal: () => void;
}) => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    swipeToSlide: true,
    speed: 750,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          className: "center",
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 1,
          swipeToSlide: true,
          speed: 750,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  const templates = [
    { name: "ProfessionalEdge", img: "abc" },
    { name: "SimplyMinimal", img: "abc" },
    { name: "TwoColumnMinimal", img: "abc" },
    { name: "ClassicProfessional", img: "abc" },
    { name: "CrispCanvas", img: "abc" },
    { name: "ModernMilestone", img: "abc" },
    { name: "ClassicElegance", img: "abc" },
    { name: "SmartStart", img: "abc" },
  ];
  return (
    <ModalComponent
      children={
        <div className="w-full overflow-visible px-2">
          <SliderComponent gap={3}>
            {templates.map((template: { name: string; img: string }) => (
              <div
                key={template.name}
                className="h-full w-auto flex-none hover:relative hover:top-0 hover:scale-105 transtion-scale duration-300 ease-in"
              >
                <div className="w-full flex items-center justify-center">
                  <button
                    className=" bg-[#2E1971] relative  top-[20px] py-1 px-5 rounded-full flex justify-center items-center border-2 border-[#2E1971]"
                    style={{ zIndex: 8 }}
                  >
                    <p className="text-[#FFF] text-xs  md:text-base sm:text-sm font-medium ">{template.name}</p>
                  </button>
                </div>
                <div className="relative flex justify-center items-center" style={{ zIndex: 7 }}>
                  <Paper className=" h-[300px] w-[150px] xl:w-[330px] xl:h-[450px] group lg:w-[280px] lg:h-[400px] md:w-[230px] md:h-[340px]  sm:w-[180px]  sm:h-[300px] border-2">
                    <Image src={SmartArt} alt="SmartArt" className="h-full" />
                    <div className="transition-opacity opacity-0 ease-in-out duration-[300ms] group-hover:opacity-100 absolute bottom-[40%] w-full flex flex-col justify-end items-center mt-2 ">
                      <VariantButton
                        label="Select"
                        className="rounded-full px-5 py-2 font-normal"
                        size="xl"
                        onClick={() => onSelectTemplate(template.name)}
                      />
                    </div>
                  </Paper>
                </div>
              </div>
            ))}
          </SliderComponent>
        </div>
      }
      setShowModal={onCloseTemplateModal}
      showModal={displayTemplate}
      width="90%"
      backgroundColor="none"
      header={<p className="invisible">Choose Template</p>}
    />
  );
};
export default SwipeToSlide;
