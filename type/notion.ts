export type ArticleInfo = {
  collection: string;
  articleUrl: string;
  articleId: string;
  createdTime: string;
  lastEditedTime: string;
  title: string;
  tag: {
    id: string;
    name: string;
    color: string;
  }[];
  content?: string;
  cover: string;
};

export type ArticleInfoWithCollection = {
  collection: string;
  articles: ArticleInfo[];
};

export type TabsInfo = {
  [tabName: string]: (ArticleInfo | ArticleInfoWithCollection)[];
};
