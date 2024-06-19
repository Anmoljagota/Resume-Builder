const SinglElement = ({ leftChild, rightChild }: { leftChild: React.ReactNode; rightChild: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-[#fff] text-[#1D0C50] text-[9px] font-medium rounded-md max-h-10">
      {leftChild}
      {rightChild}
    </div>
  );
};
export default SinglElement;
