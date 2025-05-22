import notFound from "@/assets/not-found.svg";

const NotFoundPage = () => {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full  text-3xl md:text-5xl font-bold">
        <div className="flex flex-col justify-center items-center gap-y-10">
          <div>404 - Page Not Found</div>
          <div className="w-[250px] md:w-[400px]">
            <img src={notFound} alt="not-found" className="w-full " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
