// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { fetchAblumn, fetchArticles } from "../utils/notion";
import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";
import Carousel, { ScrollMode } from "nuka-carousel";
import styles from "../styles/Home.module.css";
import icAddress from "../assets/img/ic_address.png";
import icDate from "../assets/img/ic_date.png";
import icFlip from "../assets/img/ic_flip.png";
import icExpand from "../assets/img/expand.png";
import { groupArr } from "../utils/array";
import ImageViewer from "react-simple-image-viewer";

interface IHomeProps {
  pics: {
    name: string;
    address: string;
    desc: string;
    picUrl: string;
    time: string;
  }[];
}

export default function Home({ pics }: IHomeProps) {
  const [flipedAblumn, setFlipedAblumn] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const flipAblumItem = (index: number) => {
    setFlipedAblumn((pre) => {
      if (pre === index) {
        return null;
      } else {
        return index;
      }
    });
  };
  const openImageViewer = (index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div>
      <Head>
        <title>Chegi`s Space Home</title>
        <meta name="description" content="Chegi`s Space Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <Carousel scrollMode={ScrollMode.remainder}>
          {groupArr(pics, 4).map((_4pics, index) => (
            <div key={index} className={styles.home_ablum}>
              {_4pics.map(({ picUrl, address, time, desc }, index) => {
                return (
                  <div key={index} className={`${styles.home_ablumn_item}`}>
                    <div
                      className={`${styles.home_ablumn_item_pic_container} ${
                        flipedAblumn === index
                          ? styles.home_ablumn_item_fliped
                          : styles.home_ablumn_item_normal
                      }`}
                      onClick={() => flipAblumItem(index)}
                    >
                      <img
                        src={picUrl}
                        className={styles.home_ablumn_item_pic}
                        alt=""
                      />
                      <div
                        className={styles.home_ablum_item_desc}
                        style={{
                          left: 0,
                          bottom: 0,
                          width: "100%",
                          borderRadius: "0 0 10px 10px",
                        }}
                      >
                        <div>
                          <Image
                            src={icAddress}
                            width={10}
                            height={10}
                            alt=""
                          />
                          {address}
                        </div>
                        <div>
                          <Image src={icDate} width={10} height={10} alt="" />
                          {time}
                        </div>
                      </div>
                      <div>
                        <Image
                          src={icExpand}
                          width={20}
                          alt=""
                          height={20}
                          onClick={() => openImageViewer(index)}
                        />
                      </div>
                    </div>
                    <div
                      className={`${styles.home_ablumn_item_pic} ${
                        flipedAblumn !== index
                          ? styles.home_ablumn_item_fliped
                          : styles.home_ablumn_item_normal
                      } ${styles.home_ablumn_item_back}`}
                      onClick={() => flipAblumItem(index)}
                    >
                      {desc}
                    </div>
                    <Image
                      src={icFlip}
                      className={`${styles.home_ablum_item_flip}`}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </Carousel>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={pics.map((i) => i.picUrl)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
}

export async function getStaticProps() {
  // 获取相册
  const pics = await fetchAblumn();
  return {
    props: {
      pics,
    },
  };
}
