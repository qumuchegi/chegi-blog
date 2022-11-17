import Head from "next/head";
import Header from "../../../components/Header";
import {
  useSelectedTab,
  useSelectedTabArticles,
} from "../../../contexts/RootContext";
import { ArticleInfo, ArticleInfoWithCollection } from "../../../type/notion";
import styles from "./listStyle.module.css";
import Link from "next/link";
import { useState } from "react";

export default function ArticleList() {
  const [clickedArtcile, setClickedArtcile] = useState("");
  const tab = useSelectedTab();
  const articleList = useSelectedTabArticles();
  return (
    <div>
      <Head>
        <title>{`Chegi's Space Home - ${tab}`}</title>
        <meta name="description" content={tab ?? "Chegi's Space Home"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.list_comtainer}>
        <ul>
          {articleList.map((i) => {
            if ((i as ArticleInfoWithCollection).articles) {
              // 子分类
              return (
                <li key={i.collection} className={styles.list_item_collection}>
                  <div>{i.collection}</div>
                  <ul>
                    {(i as ArticleInfoWithCollection).articles.map((a) => (
                      <li
                        key={a.articleId}
                        className={`${styles.list_item} ${
                          clickedArtcile === a.articleId
                            ? styles.list_item_selected
                            : ""
                        }`}
                      >
                        <Link
                          prefetch
                          href={"/article/details/" + tab + "/" + a.articleId}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          onClick={() => setClickedArtcile(a.articleId)}
                        >
                          <div>{a.title}</div>
                          {a.cover && (
                            <img src={a.cover} alt="封面" width="90" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li
                key={(i as ArticleInfo).articleId}
                className={`${styles.list_item} ${
                  clickedArtcile === (i as ArticleInfo).articleId
                    ? styles.list_item_selected
                    : ""
                }`}
              >
                <Link
                  prefetch
                  href={
                    "/article/details/" +
                    tab +
                    "/" +
                    (i as ArticleInfo).articleId
                  }
                  onClick={() =>
                    setClickedArtcile((i as ArticleInfo).articleId)
                  }
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{(i as ArticleInfo).title}</div>
                  {(i as ArticleInfo).cover && (
                    <img src={(i as ArticleInfo).cover} alt="封面" width="90" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
