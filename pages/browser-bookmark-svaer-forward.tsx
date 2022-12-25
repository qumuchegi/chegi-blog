import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import * as React from "react";

export default function Forward() {
  return <div>forward to browser bookmark saver...</div>;
}
export function getServerSideProps(
  ctx: GetServerSidePropsContext
): GetServerSidePropsResult<null> {
  const qs = Object.entries(ctx.query || {}).reduce((str, [k, v]) => {
    if (!str) {
      return k + "=" + v;
    }
    return str + "&" + k + "=" + v;
  }, "");
  console.log({ qs });
  return {
    redirect: {
      destination:
        "chrome-extension://demeddedkdgcdgnbbfcpkkoepffebanp/tabs/notionOauthCallbackpage.html?" +
        qs,
      permanent: false,
    },
  };
}
