import "../styles/globals.css";
import type { AppProps } from "next/app";
import RootContextProvider from "../contexts/RootContext";
import { useEffect, useMemo, useState } from "react";
import { ArticleInfo, TabsInfo } from "../type/notion";
import "../assets/codeStyle/prism.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [articlesByTabs, setArticlesByTabs] = useState<TabsInfo | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleInfo | null>(
    null
  );
  const router = useRouter();
  useEffect(() => {
    const maybeTab = router.query?.tab;
    setSelectedTab((maybeTab as string) ?? null);
  }, [router.query?.tab]);
  return (
    <RootContextProvider
      value={useMemo(
        () => ({
          articlesByTabs,
          setArticlesByTabs,
          selectedTab,
          setSelectedTab,
          selectedArticle,
          setSelectedArticle,
        }),
        [articlesByTabs, selectedArticle, selectedTab]
      )}
    >
      <Component {...pageProps} />
    </RootContextProvider>
  );
}
