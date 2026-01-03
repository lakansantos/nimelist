import dayjs from "dayjs";

const extractYear = (date: string) => {
  return date.split("-")[0];
};

const dateFormat = (date: string, format = "MMM DD, YYYY") => {
  return dayjs(date).format(format);
};

export {extractYear, dateFormat};
