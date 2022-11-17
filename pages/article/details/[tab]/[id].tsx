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

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const articleNotionBlocks = await getContentOfArticleForRender(
//     (ctx.query?.id as string) ?? ""
//   );
//   return {
//     props: {
//       id: ctx.query?.id,
//       articleNotionBlocks,
//     },
//   };
// }

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
    fallback: false,
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
