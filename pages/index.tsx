// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { fetchArticles } from "../utils/notion";
import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ablumPic1 from "../assets/ablumPic/3_friends.png";
import ablumPic2 from "../assets/ablumPic/home_brothers.png";
import ablumPic3 from "../assets/ablumPic/my_bike.png";
import ablumPic4 from "../assets/ablumPic/shopee_football.jpg";
import icAddress from "../assets/img/ic_address.png";
import icDate from "../assets/img/ic_date.png";
import icFlip from "../assets/img/ic_flip.png";

const BACK_DESC_1 =
  "一个阳光明媚的中午, 和两个同事也是好朋友, 随公司的户外登山活动,爬深圳的塘朗山";
const BACK_DESC_2 = `四兄弟难得出来一起玩，风景很好，泸山下来，面对邛海，骑车很爽`;
const BACK_DESC_3 = `深圳银湖山一个人爬坡，爬了一个很陡接近40度的坡，体力和爆发力真的可以`;
const BACK_DESC_4 = `公司组织的足球活动，我在深圳的倒数第二场足球，和很多同事踢了那么多长比赛，熟知每个人的风格`;
interface IHomeProps {
  articles: Awaited<ReturnType<typeof fetchArticles>>;
}
export default function Home({ articles }: IHomeProps) {
  const [flipedAblumn, setFlipedAblumn] = useState<number | null>(null);
  const flipAblumItem = (index: number) => {
    console.log(index);
    setFlipedAblumn((pre) => {
      if (pre === index) {
        return null;
      } else {
        return index;
      }
    });
  };
  return (
    <div>
      <Head>
        <title>Chegi`s Space Home</title>
        <meta name="description" content="Chegi`s Space Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.home_ablum}>
        {[
          {
            img: ablumPic1,
            address: "深圳 塘朗山",
            date: "2021.3.14",
            backDesc: BACK_DESC_1,
          },
          {
            img: ablumPic2,
            address: "西昌 泸山",
            date: "2022.10.06",
            backDesc: BACK_DESC_2,
          },
          {
            img: ablumPic3,
            address: "深圳 银湖山",
            date: "2022.08.20",
            backDesc: BACK_DESC_3,
          },
          {
            img: ablumPic4,
            address: "深圳 某球场",
            date: "2022.11.04",
            backDesc: BACK_DESC_4,
          },
        ].map(({ img, address, date, backDesc }, index) => {
          return (
            <div key={index} className={`${styles.home_ablumn_item}`}>
              <Image
                src={img}
                className={`${styles.home_ablumn_item_pic} ${
                  flipedAblumn === index
                    ? styles.home_ablumn_item_fliped
                    : styles.home_ablumn_item_normal
                }`}
                alt=""
              />
              <div
                className={`${styles.home_ablumn_item_pic} ${
                  flipedAblumn !== index
                    ? styles.home_ablumn_item_fliped
                    : styles.home_ablumn_item_normal
                } ${styles.home_ablumn_item_back}`}
              >
                {backDesc}
              </div>
              <Image
                onClick={() => flipAblumItem(index)}
                src={icFlip}
                className={`${styles.home_ablum_item_flip}`}
                alt=""
              />
              <div
                className={styles.home_ablum_item_desc}
                style={
                  [
                    { right: 0, bottom: 0 },
                    { left: 0, bottom: 0 },
                    { right: 0, top: 0 },
                    { left: 0, top: 0 },
                  ][index]
                }
              >
                <div>
                  <Image src={icAddress} width={10} height={10} alt="" />
                  {address}
                </div>
                <div>
                  <Image src={icDate} width={10} height={10} alt="" />
                  {date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
