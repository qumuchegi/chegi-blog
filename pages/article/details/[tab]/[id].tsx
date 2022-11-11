import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Header from "../../../../components/Header";
import NotionRender from "../../../../components/NotionRender";
import {
  useSelectedArticle,
  useSetSelectedArticle,
} from "../../../../contexts/RootContext";
import { getContentOfArticleForRender } from "../../../../utils/notion";
import styles from "./style.module.css";

export default function ArticleDetails(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const articleNotionBlocks = await getContentOfArticleForRender(
    (ctx.query?.id as string) ?? ""
  );
  return {
    props: {
      id: ctx.query?.id,
      articleNotionBlocks,
    },
  };
}
