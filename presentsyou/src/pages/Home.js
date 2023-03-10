import React from "react";
import { ReactSession } from "react-client-session";

export default function Home() {
  const user = ReactSession.get("user");
  return (
    <div>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
