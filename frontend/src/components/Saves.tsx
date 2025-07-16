import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getSaves } from "~/server-functions/server-functions";

export default function Saves() {
  const { data } = useSuspenseQuery({
    queryKey: ["saves"],
    queryFn: getSaves,
  });

  return (
    <div>
      {data.map((save: any) => (
        <p key={save.id}>{save.id}</p>
      ))}
    </div>
  );
}
