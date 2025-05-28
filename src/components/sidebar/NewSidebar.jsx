import BlockComponents from "./_components/BlockComponents";
import DesignSetting from "./_components/DesignSetting";

const NewSidebar = () => {
  return (
    <div className="h-[94vh] w-[80px] bg-gradient-to-b from-orange-50 to-orange-200 flex flex-col gap-y-5 items-center p-3">
      <BlockComponents />
      <DesignSetting />
    </div>
  );
};

export default NewSidebar;
