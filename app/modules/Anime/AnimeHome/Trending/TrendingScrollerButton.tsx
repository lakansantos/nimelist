import React, {ReactNode} from "react";
import cx from "classnames";

type ScrollerButtonProps = {
  children: ReactNode;
  onClick: () => void;
  visible?: boolean;
  direction: "left" | "right";
};

const TrendingScrollerButton = ({
  children,
  direction,
  onClick,
  visible = true,
}: ScrollerButtonProps) => {
  const buttonClass = cx(
    "text-white bg-gray-800/80 px-5 py-2 absolute top-auto z-50 bottom-auto h-[200px] w-auto flex justify-start items-center opacity-0 hover:opacity-100 duration-700 max-md:hidden group-hover:opacity-100",
    {
      "left-100": direction === "left",
      "right-0": direction === "right",
      hidden: !visible,
    }
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default TrendingScrollerButton;
