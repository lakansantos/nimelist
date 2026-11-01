import cx from "classnames";
import {socialItems} from "@constants/socialItems";

/** Site credits and social links, shared by both modes. */
const Credits = ({className}: {className?: string}) => (
  <div
    className={cx(
      "flex flex-wrap items-center gap-x-5 gap-y-3 text-sm",
      className
    )}
  >
    <span>Anime data from Kitsu</span>
    <span>Designed and built by Lakan Santos</span>
    <span className="flex gap-1">
      {socialItems.map(({href, icon, target}) => (
        <a
          key={href}
          href={href}
          target={target}
          rel={target ? "noopener noreferrer" : undefined}
          aria-label={href
            .replace(/^mailto:/, "")
            .replace(/^https:\/\/(www\.)?/, "")}
          className="grid h-11 w-11 place-items-center text-xl hover:text-amber"
        >
          {icon}
        </a>
      ))}
    </span>
  </div>
);

export default Credits;
