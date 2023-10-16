"use client";

import { signIn, signOut } from "next-auth/react";

type Props = {};
const page = (props: Props) => {
  const handleSignIn = async () => {
    const res = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
    // console.log(res);
  };

  const handleSignOut =async () => {
    const res = await signOut({
      redirect:false,
      callbackUrl:"/"
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Login</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};
export default page;
