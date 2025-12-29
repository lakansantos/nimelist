import {redirect} from "next/navigation";
import Details from "@modules/Details/Details";

type PageProps = {
  params: {
    id: string;
  };
};

const page = ({params}: PageProps) => {
  const {id} = params;

  // check if id is NOT a number
  const isNotNumber = Number.isNaN(Number(id));

  if (isNotNumber) {
    redirect("/");
  }

  return <Details id={Number(id)} />;
};

export default page;
