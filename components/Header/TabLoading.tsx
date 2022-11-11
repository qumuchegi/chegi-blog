import React, { createRef, useEffect, useRef } from "react";
import styles from "./TabLoadingStyle.module.css";

export default function TabLoading() {
  const dotsRef = useRef<(HTMLDivElement | null)[]>(new Array(3).fill(null));

  useEffect(() => {
    dotsRef.current.map((dot, index) => {
      dot?.style.setProperty("--delay", `${index * 0.1}s`);
    });
  }, []);
  return (
    <div className={styles.container}>
      <div ref={(ref) => (dotsRef.current[0] = ref)} />
      <div ref={(ref) => (dotsRef.current[1] = ref)} />
      <div ref={(ref) => (dotsRef.current[2] = ref)} />
    </div>
  );
}
