import { fetchArticles } from "../../utils/notion";
import type { NextApiRequest, NextApiResponse } from "next";
import { TabsInfo } from "../../type/notion";

type Data = {
  articles: TabsInfo;
};

export default async function clientFetchArticles(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const articles = await fetchArticles();
  res.status(200).json({ articles });
}
