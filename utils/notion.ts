import {
  ArticleInfo,
  ArticleInfoWithCollection,
  TabsInfo,
} from "../type/notion";
import { Client as NotionClinet } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notionAuthToken = process.env.myNotionAuthToken;
const collectionId = process.env.myBlogsCollectionId as string;
const ablumnCollectionId = process.env.myAblumnCollectionId as string;
const notionAPI = new NotionClinet({
  auth: notionAuthToken,
});
const notionAPI2 = new NotionAPI();

// 获取全部的文章列表
export async function fetchArticles() {
  const res = await notionAPI.databases.query({
    database_id: parsePageId(collectionId),
  });
  const formated = _formatCMSData(res.results);
  return formated;
}

// 获取相册
export async function fetchAblumn() {
  const res = await notionAPI.databases.query({
    database_id: parsePageId(ablumnCollectionId),
  });
  const collectionData = res.results;
  // console.log({ collectionData: JSON.stringify(collectionData) });
  return collectionData.map((row) => {
    const { properties } = row as any;
    const address = properties.address.rich_text?.[0]?.plain_text;
    const name = properties.Name.title?.[0]?.plain_text;
    const desc = properties.description.rich_text?.[0]?.plain_text ?? "";
    const picUrl = properties.pic.url;
    const time = properties.time.date.start;
    return {
      name,
      address,
      desc,
      picUrl,
      time,
    };
  });
}

// 获取当个文章的 notion 格式的内容
export async function getContentOfArticleForRender(articleId: string) {
  const notionRecordMap = await notionAPI2.getPage(articleId.replace(/-/g, ""));
  return notionRecordMap;
}

function parsePageId(rawPageId: string) {
  if (/[^-]{8}-[^-]{4}-[^-]{4}-[^-]{4}-[^-]{12}/.test(rawPageId)) {
    return rawPageId;
  }
  return [
    rawPageId.slice(0, 8),
    rawPageId.slice(8, 12),
    rawPageId.slice(12, 16),
    rawPageId.slice(16, 20),
    rawPageId.slice(20, 32),
  ].join("-");
}

function _formatCMSData(cmsData: Array<any>) {
  let result: TabsInfo = {};
  cmsData.forEach((item) => {
    const { id, url, created_time, last_edited_time, properties, cover } = item;
    const { tab, pageTitle, tag, progress, collection, CustomCreate } =
      properties;

    const tabName = tab.select?.name;
    if (!tabName || progress?.select?.name === "doing") {
      return;
    }
    const articleTitle = pageTitle.title?.[0]?.plain_text;
    const collectionName = collection?.select?.name || "";
    const newItem: ArticleInfo = {
      articleUrl: url,
      articleId: id,
      createdTime: created_time,
      lastEditedTime: last_edited_time,
      title: articleTitle,
      tag,
      collection: collectionName,
      cover: cover?.file?.url ?? null,
    };
    if (!result[tabName]) {
      result[tabName] = [];
    }
    if (collectionName) {
      const existCollectionIdx = result[tabName].findIndex(
        (item) => item.collection === collectionName
      );
      if (existCollectionIdx === -1) {
        result[tabName].push({
          collection: collectionName,
          articles: [newItem],
        });
      } else {
        result[tabName][existCollectionIdx] = {
          collection: collectionName,
          articles: [
            ...((
              result[tabName][existCollectionIdx] as ArticleInfoWithCollection
            ).articles ?? []),
            newItem,
          ],
        };
      }
    } else {
      result[tabName] = [...(result[tabName] || []), newItem];
    }
  });
  return result;
}
