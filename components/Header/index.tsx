import React, { useEffect, useMemo, useState } from "react";
import {
  useArticlesByTabs,
  useSelectedArticle,
  useSelectedTab,
  useSetArticlsByTabs,
  useSetSelectedTab,
} from "../../contexts/RootContext";
import styles from "./style.module.css";
import icBilibili from "../../assets/img/ic_bilibili.jpeg";
import icGithub from "../../assets/img/ic_github.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { joinAnyToArr } from "../../utils/array";
import useSWR from "swr";
import getAllArticles from "../../network/getAllArticles";
import TabLoading from "./TabLoading";
import { getIsWideScreen } from "../../utils/device";
import icExpand from "../../assets/img/ic_expand.png";
import icAvatar from "../../assets/img/ic_avatar.png";
interface IHeaderProps {}
export default function Header(props: IHeaderProps) {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isExpandTabOnMobile, setIsExpandTabOnMobile] = useState(false);
  const setArticlsByTabs = useSetArticlsByTabs();
  const articlesByTabs = useArticlesByTabs();
  useEffect(() => {
    setIsWideScreen(window && getIsWideScreen(window));
  }, []);
  const { data, error } = useSWR(
    !articlesByTabs ? "api/getAllArticles" : "",
    getAllArticles,
    {}
  );
  const articles = data?.articles;
  useEffect(() => {
    articles && setArticlsByTabs?.(articles);
  }, [articles, setArticlsByTabs]);
  const router = useRouter();
  const selectedTab = useSelectedTab();
  const tabs = useMemo(() => {
    if (!articlesByTabs) {
      return [];
    }
    return Object.entries(articlesByTabs).map(([tab, articles]) => tab);
  }, [articlesByTabs]);
  const isArticleDetails = useMemo(() => {
    const { pathname, query } = router;
    return pathname.match("/article/details/") && query.id;
  }, [router]);
  const selectedArticle = useSelectedArticle();
  const isShrinkTab = useMemo(() => {
    if (isWideScreen) {
      return isArticleDetails;
    }
    return !isExpandTabOnMobile && isArticleDetails;
  }, [isArticleDetails, isExpandTabOnMobile, isWideScreen]);
  return (
    <div className={styles.header}>
      <div className={styles.row1}>
        <Link href="/">
          <div className={styles.title}>
            <Image src={icAvatar} className={styles.avatar} alt="" />
            <div>Chegi`s Space</div>
          </div>
        </Link>
        <div>
          <a
            href="https://space.bilibili.com/373142943"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={icBilibili}
              alt="bilibili"
              title="bilibili 主页"
              className={styles.communicate_icon}
            />
          </a>
          <a
            href="https://github.com/qumuchegi"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={icGithub}
              alt="gtihub"
              title="GitHub 主页"
              className={styles.communicate_icon}
            />
          </a>
        </div>
      </div>
      <div className={styles.row2}>
        <div
          className={`${styles.tab_container} ${
            isShrinkTab ? styles.shrink_tab : ""
          }`}
        >
          {!tabs.length ? (
            <TabLoading />
          ) : (
            joinAnyToArr(
              tabs.map((i, index) => (
                <Link
                  key={i}
                  href={"/article/list/" + i}
                  className={`${
                    selectedTab === i
                      ? styles.tab_item_selected
                      : styles.tab_item
                  }`}
                >
                  {i}
                </Link>
              )),
              <div className={styles.tab_divider} />
            )
          )}
        </div>
        {selectedArticle && isShrinkTab ? (
          <div className={`${styles.tab_container} ${styles.article_title}`}>
            <span>{selectedArticle?.title}</span>
          </div>
        ) : null}
        {!isWideScreen && selectedArticle && isArticleDetails ? (
          <div
            onClick={() => setIsExpandTabOnMobile((pre) => !pre)}
            className={styles.tab_container}
            style={{
              right: "10px",
              width: "20px",
              height: "20px",
              borderRadius: "20px",
              bottom: "-10px",
              justifyContent: "center",
            }}
          >
            <Image
              src={icExpand}
              style={{ transform: `rotate(${isShrinkTab ? 0 : `180deg`})` }}
              width={16}
              height={16}
              alt="展开"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
