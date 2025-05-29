import { Input } from "@/components/ui/input";
import { BlocksProvider } from "@grapesjs/react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CustomBlockManager from "./CustomBlockProvider";

const BlockComponents = () => {
  const [searchBlock, setSearchBlock] = useState("");

  return (
    <>
      <div className="sticky top-0 z-10  border-b  p-3 flex justify-between items-center ">
        <Input
          value={searchBlock || ""}
          onChange={(e) => setSearchBlock(e.target.value)}
          className="rounded-full  pr-10 border-muted-foreground focus:!border-0"
          placeholder="Search..."
        />

        <div className="absolute top-[23px] right-6 z-10 ">
          <HiMagnifyingGlass className="text-slate-400" />
        </div>
      </div>

      <div className="h-[86vh] overflow-y-auto bg-[#FEEBDB]">
        <BlocksProvider>
          {(props) => (
            <CustomBlockManager {...props} searchBlock={searchBlock} />
          )}
        </BlocksProvider>
      </div>
    </>
  );
};

export default BlockComponents;
