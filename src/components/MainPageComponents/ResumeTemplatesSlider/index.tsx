import Image from "next/image";
import { SampleNextArrow, SamplePrevArrow } from "@/components/ResumeComponents/ResumeSlider";
import Slider from "react-slick";
import BasicBalanced from "@/assets/templates/Basic-balanced.png";
import ClassicElegance from "@/assets/templates/Classic-Elegance.png";
import SmartArt from "@/assets/templates/Smart-art.png";
import TemplateBottomLogo from "@/assets/LandingPage/resumeCardBottomCurve.svg";

const ResumeTemplatesSlider = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 750,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          className: "center",
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 2,
          swipeToSlide: true,
          speed: 750,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 700,
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
  const data = [
    {
      id: 1,
      title: "BasicBalanced",
      image: BasicBalanced,
    },
    {
      id: 2,
      title: "ClassicElegance",
      image: ClassicElegance,
    },
    {
      id: 3,
      title: "SmartArt",
      image: SmartArt,
    },
    {
      id: 4,
      title: "SmartArt",
      image: SmartArt,
    },
  ];
  return (
    <div className="w-full mt-20">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.id}>
            <div
              className="relative  text-[#FFF] w-[90%] mx-auto h-280px sm:h-[380px] lg:h-[450px]  xl:h-[518px]  overflow-hidden rounded-3xl"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #541188 0%, rgba(42, 23, 105, 0.00) 31.25%, rgba(47, 24, 110, 0.06) 99.98%, #2A1769 99.99%)",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
            >
              <div className="flex flex-col justify-between items-center h-full mt-2 sm:mt-4 lg:mt-6 xl:mt-14">
                <h1 className="text-center mb-4 text-[#FFF] text-lg sm:text-xl lg:text-3xl xl:text-4xl font-semibold gap-y-7">
                  {item.title}
                </h1>
                <Image
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "70%",
                    margin: "auto",
                  }}
                  className="rounded-3xl hover:scale-y-105 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="w-full absolute bottom-[-1px]">
                <Image src={TemplateBottomLogo} alt="bottomLogo" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ResumeTemplatesSlider;
