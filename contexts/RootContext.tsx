import React, { createContext, useContext } from "react";
import {
  ArticleInfo,
  ArticleInfoWithCollection,
  TabsInfo,
} from "../type/notion";

interface IRootContext {
  articlesByTabs: TabsInfo | null;
  setArticlesByTabs: (articlesByTabs: TabsInfo) => void;
  selectedTab: string | null;
  setSelectedTab: (selectedTab: string) => void;
  selectedArticle: ArticleInfo | null;
  setSelectedArticle: (selectedArticle: ArticleInfo) => void;
}
const defaultContext = {
  articlesByTabs: null,
  setArticlesByTabs: () => {},
  selectedTab: null,
  setSelectedTab: () => {},
  selectedArticle: null,
  setSelectedArticle: () => {},
};
const RootContext = createContext<IRootContext | null>(null);
const RootContextProvider = RootContext.Provider;
export default RootContextProvider;
export const useRootContext = () => useContext(RootContext);
export const useSetArticlsByTabs = () =>
  useContext(RootContext)?.setArticlesByTabs;
export const useArticlesByTabs = () => useContext(RootContext)?.articlesByTabs;
export const useSelectedTab = () => useContext(RootContext)?.selectedTab;
export const useSetSelectedTab = () => useContext(RootContext)?.setSelectedTab;
export const useSelectedTabArticles = () => {
  const value = useContext(RootContext);
  if (!value) {
    return [];
  }
  if (!value.articlesByTabs) {
    return [];
  }
  if (!value.selectedTab) {
    return [];
  }
  const selectedTab = value.selectedTab;
  return value.articlesByTabs[selectedTab];
};
export const useSelectedArticle = () =>
  useContext(RootContext)?.selectedArticle;
export const useSetSelectedArticle = () => {
  const { setSelectedArticle, articlesByTabs } =
    useContext(RootContext) ?? defaultContext;
  if (!articlesByTabs) {
    return () => {};
  }
  return (articleId: string) => {
    const flattedArticles = Object.values(articlesByTabs)
      //@ts-ignore
      .reduce((pre, tabArticles) => {
        let arr: ArticleInfo[] = [];
        tabArticles.forEach((i) => {
          if ((i as ArticleInfoWithCollection).articles) {
            arr.push(...(i as ArticleInfoWithCollection).articles);
          } else {
            arr.push(i as ArticleInfo);
          }
        });
        return [...pre, ...arr];
      }, []);
    const maybeArticle = flattedArticles.find(
      (i) => (i as ArticleInfo).articleId === articleId
    );
    if (!maybeArticle) {
      return;
    }
    //@ts-ignore
    setSelectedArticle(maybeArticle);
  };
};
