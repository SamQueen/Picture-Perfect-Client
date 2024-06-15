import React from "react";
import Feed from "../../components/Feed";
import { getLoggedInUser } from "@/lib/action/user.action";

export default async function Home() {
  const user:User | undefined = await getLoggedInUser();

  if (!user) {
    return;
  }

  return (
    <div className="flex">
      <Feed user={user}/>
    </div>
  );
}
