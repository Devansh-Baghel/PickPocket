import { getSaves } from "@/utils/server-functions";
import { useSuspenseQuery } from "@tanstack/react-query";

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
