import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import Head from "next/head";
import { useEffect } from "react";
import Header from "../../../../components/Header";
import NotionRender from "../../../../components/NotionRender";
import {
  useSelectedArticle,
  useSetSelectedArticle,
} from "../../../../contexts/RootContext";
import {
  ArticleInfo,
  ArticleInfoWithCollection,
} from "../../../../type/notion";
import {
  fetchArticles,
  getContentOfArticleForRender,
} from "../../../../utils/notion";
import styles from "./style.module.css";

export default function ArticleDetails(
  props: InferGetServerSidePropsType<typeof getStaticProps>
) {
  const { id, articleNotionBlocks } = props;
  const setSelectedArticle = useSetSelectedArticle();
  const selectedArticle = useSelectedArticle();
  useEffect(() => {
    setSelectedArticle(id as string);
  }, [id, setSelectedArticle]);
  return (
    <div>
      <Head>
        <title>{`${selectedArticle?.title}`}</title>
        <meta name="description" content="Chegi`s Space Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        {!!articleNotionBlocks && (
          <NotionRender
            //@ts-ignore
            notionBlock={articleNotionBlocks}
            className={styles.content}
          />
        )}
      </div>
    </div>
  );
}

type QueryObj = {
  tab: string;
  id: string;
};
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const tabArticles = await fetchArticles();
  let paths: {
    params: QueryObj;
  }[] = [];
  Object.entries(tabArticles).forEach(([tab, articles]) => {
    articles.forEach((i) => {
      if ((i as ArticleInfoWithCollection).articles) {
        (i as ArticleInfoWithCollection).articles.forEach((a) => {
          paths.push({
            params: {
              tab,
              id: a.articleId,
            },
          });
        });
      } else {
        paths.push({
          params: {
            tab,
            id: (i as ArticleInfo).articleId,
          },
        });
      }
    });
  });
  return {
    paths,
    fallback: true,
    // fallback:
    // 1. 如果 fallback 为 false，则 getStaticPaths 未返回的任何路径都将导致 404 页面。
    // 2. 您可以静态生成一小部分页面并使用 fallback: true 来处理其余部分。当有人请求尚未生成的页面时，用户将看到带有加载指示器或骨架组件的页面。
    // 3. 如果 fallback: 'blocking'，则 getStaticPaths 未返回的新路径将等待生成 HTML，与 SSR 相同（因此阻塞），然后缓存以供将来请求使用，因此每个路径只发生一次。
  };
};

export const getStaticProps: GetStaticProps<any, QueryObj> = async (
  context
) => {
  const params = context.params;
  const { tab, id } = params ?? { tab: "", id: "" };
  const articleNotionBlocks = await getContentOfArticleForRender(id ?? "");
  return {
    props: {
      id: id,
      articleNotionBlocks,
    },
  };
};
