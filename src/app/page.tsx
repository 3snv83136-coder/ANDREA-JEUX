import { getGames } from "@/lib/db";
import { HomeTabs } from "@/components/sections/HomeTabs";

export default async function HomePage() {
  const games = await getGames();
  const playing = games.filter((g) => g.status === "playing").slice(0, 4);

  return <HomeTabs games={games} playing={playing} />;
}
