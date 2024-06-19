import Image from "next/image";
import globalLogicLogo from "@/assets/LandingPage/SponsorLandingPage/globalLogic.svg";
import uberLogo from "@/assets/LandingPage/SponsorLandingPage/uber.svg";
import leapFinanceLogo from "@/assets/LandingPage/SponsorLandingPage/leapFinance.svg";
import urbanPiperLogo from "@/assets/LandingPage/SponsorLandingPage/urbanPiper.svg";
import vyaparLogo from "@/assets/LandingPage/SponsorLandingPage/vyapar.svg";
import paytmLogo from "@/assets/LandingPage/SponsorLandingPage/paytm.svg";
import dream11Logo from "@/assets/LandingPage/SponsorLandingPage/dream11.svg";

const Sponsors = () => {
  const mode = "light";
  return (
    <div
      className="w-full  py-12 flex justify-evenly px-28 items-center flex-wrap mx-auto 2xl:gap-12 gap-6"
      style={{
        backgroundColor: "#2E1971",
      }}
    >
      <Image src={globalLogicLogo} className="h-8 w-auto" alt="GlobalLogic" />
      <Image src={uberLogo} className="h-8 w-auto" alt="Uber" />
      <Image src={leapFinanceLogo} className="h-8 w-auto" alt="LeapFinance" />
      <Image src={urbanPiperLogo} className="h-8 w-auto" alt="UrbanPiper" />
      <Image src={vyaparLogo} className="h-8 w-auto" alt="Vyapan" />
      <Image src={paytmLogo} className="h-8 w-auto" alt="Paytm" />
      <Image src={dream11Logo} className="h-8 w-auto" alt="Dream11" />
    </div>
  );
};
export default Sponsors;
