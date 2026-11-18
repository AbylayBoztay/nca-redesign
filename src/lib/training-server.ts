import "server-only";
import { cacheLife } from "next/cache";
import { upcomingSessions } from "@/data/training";

/** Upcoming sessions, recomputed at most once a day so past ones drop off. */
export async function getUpcoming() {
  "use cache";
  cacheLife("days");
  return upcomingSessions();
}
