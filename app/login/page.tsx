"use client"

import { signIn } from "next-auth/react";

type Props = {};
const page = (props: Props) => {
  const handleSignIn = async () => {
    const res = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
    console.log(res);
  };
  return (
    <div>
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
};
export default page;
