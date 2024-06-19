import VariantButton from "@/components/common/Button/VariantButton";

const FormFooter = () => {
  return (
    <div className="mt-10 h-28">
      <div className="bg-[#D8D8D8] w-full h-[1px]"></div>
      <div className="flex items-end justify-end px-[55px] h-20">
        <VariantButton label="Continue" type="submit" />
      </div>
    </div>
  );
};
export default FormFooter;
