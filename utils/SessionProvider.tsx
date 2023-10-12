"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};
const SessionProviders = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
export default SessionProviders;
