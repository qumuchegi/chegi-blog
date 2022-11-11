import { TabsInfo } from "../type/notion";

export default async function getAllArticles(): Promise<{
  articles: TabsInfo;
}> {
  const res = await fetch("/api/clientFetchArticles");
  return res.json();
}
