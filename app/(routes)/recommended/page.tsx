"use client";

import {useRouter} from "next/navigation";

const Page = () => {
  const router = useRouter();

  // should be redirect to homepage since it does not contain anything
  router.push("/");
  return <div>Going back...</div>;
};

export default Page;
