import { useSuspenseQuery } from "@tanstack/react-query";
import { getUsers } from "~/server-functions/server-functions";

export function SideBar() {
  const { data } = useSuspenseQuery({
    queryKey: ["sidebar"],
    queryFn: () => getUsers(),
  });

  return (
    <nav>
      {data.map((user: any) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </nav>
  );
}
