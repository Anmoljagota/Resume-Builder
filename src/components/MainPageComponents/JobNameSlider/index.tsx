import { getJobDescriptions } from "@/apis/data";
import { SampleNextArrow, SamplePrevArrow } from "@/components/ResumeComponents/ResumeSlider";
import { JOBDescription } from "@/interfaces/data";
import React from "react";
import Slider from "react-slick";

const settings = {
  className: "center",
  infinite: true,
  centerPadding: "30px",
  slidesToShow: 5,
  swipeToSlide: true,
  autoPlay: true,
  autoplaySpeed: 750,
  cssEase: "linear",
  speed: 750,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        swipeToSlide: true,
        autoPlay: true,
        autoplaySpeed: 7500,
        cssEase: "linear",
        speed: 750,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      },
    },
    {
      breakpoint: 750,
      settings: {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        swipeToSlide: true,
        autoPlay: true,
        autoplaySpeed: 7500,
        cssEase: "linear",
        speed: 750,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      },
    },
    {
      breakpoint: 500,
      settings: {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        swipeToSlide: true,
        autoPlay: true,
        autoplaySpeed: 7500,
        cssEase: "linear",
        speed: 750,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      },
    },
    {
      breakpoint: 400,
      settings: {
        className: "center",
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 1,
        swipeToSlide: true,
        autoPlay: true,
        autoplaySpeed: 7500,
        cssEase: "linear",
        speed: 750,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      },
    },
  ],
};

const JobNameSlider = () => {
  const [jdData, setJdData] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState(false);

  const fetchJobDescriptions = async () => {
    try {
      const response = await getJobDescriptions();
      setJdData(response?.data?.jobsDescriptions);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchJobDescriptions();
  }, []);
  //   stroke-[5px] stroke-[#32134cea]
  return (
    <div
      className="text-[#fff]  py-6  mt-36"
      style={{
        backgroundColor: "rgba(14, 8, 51, 0.29)",
        border: "5px solid rgba(149, 34, 243, 0.42)",
      }}
    >
      <Slider {...settings}>
        {jdData?.map((item: JOBDescription) => (
          <div key={item.id}>
            <p className="break-words text-center">{item.jobTitle}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default JobNameSlider;
