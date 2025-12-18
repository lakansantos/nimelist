import {socialItems} from "@constants/socialItems";

const Footer = () => {
  return (
    <footer className="min-h-[100px] h-fit w-full py-4 flex gap-3 bg-default_blue text-white flex-col justify-center items-center">
      {" "}
      <div className="text-lightWhite w-full flex flex-col justify-center items-center">
        {" "}
        <span className="flex items-center gap-2">
          {" "}
          Designed and Built by Lakan Santos{" "}
        </span>{" "}
        <p>&copy; 2025</p>{" "}
      </div>{" "}
      <div className="min-w-[150px] w-fit flex justify-center gap-3">
        {" "}
        {socialItems.map((item, key) => {
          const {icon, href, target} = item;
          return (
            <div
              key={key}
              className="text-chalk text-3xl hover:cursor-pointer hover:text-sky"
            >
              {" "}
              <a href={href} target={target}>
                {" "}
                {icon}{" "}
              </a>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </footer>
  );
};
export default Footer;
