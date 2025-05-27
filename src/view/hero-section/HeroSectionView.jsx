export const HeroSectionView = ({ data }) => {
  console.log("🚀 ~ HeroSectionView ~ data:", data);
  return (
    <section
      className="flex justify-center bg-slate-500"
      style={{ padding: 40, textAlign: "center" }}
    >
      {data?.contents.map((item, index) => {
        return (
          <div
            className="flex flex-col gap-y-5 items-center justify-center"
            key={index}
            data-gjs-type={item.type}
            data-id={item.id}
            style={{ marginBottom: 16 }}
          >
            <p>{item.header}</p>
            <p>{item.sub}</p>

            <button className="bg-red-300">{item.button}</button>

            <div className="w-32 h-32 rounded-full bg-sky-300 border"></div>
          </div>
        );
      })}
    </section>
  );
};
