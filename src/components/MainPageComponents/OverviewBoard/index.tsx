import Image from "next/image";
import AchievementImage from "@/assets/project-image/Achievements.svg";
const OverviewBoard = () => {
  return (
    <div className="w-full flex items-center justify-center h-[300px] lg:h-[450px] xl:h-[517px] bg-gradient-to-br from-[#527AFF] to-[#1230A3] rounded-3xl lg:p-10 p-3 mt-3 lg:mt-0">
      <Image
        src={AchievementImage}
        alt="Achievement"
        className="rounded-b-[25px] hover:scale-105 transition-all duration-700 ease-in-out"
        style={{
          width: "90%",
          height: "90%",
        }}
      />
    </div>
  );
};
export default OverviewBoard;
