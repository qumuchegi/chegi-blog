// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
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

interface IHomeProps {
  articles: Awaited<ReturnType<typeof fetchArticles>>;
}
export default function Home({ articles }: IHomeProps) {
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
          { img: ablumPic1, address: "深圳 塘朗山", date: "2021.3.14" },
          { img: ablumPic2, address: "西昌 泸山", date: "2022.10.06" },
          { img: ablumPic3, address: "深圳 银湖山", date: "2022.08.20" },
          { img: ablumPic4, address: "深圳 某球场", date: "2022.11.04" },
        ].map(({ img, address, date }, index) => {
          return (
            <div key={index} className={styles.home_ablumn_item}>
              <Image src={img} className={styles.home_ablumn_item_pic} alt="" />
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
