import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import * as React from "react";
import axios from "axios";
//@ts-ignore
import cookie from "cookie";

export default function Forward(props: any) {
  React.useEffect(() => {
    const t = setTimeout(() => {
      window.close();
    }, 4000);
    return () => {
      clearTimeout(t);
    };
  }, [props]);
  return (
    <div style={{ color: "#fff" }}>
      success to login in Notion! auto jump back to extension tab page...
    </div>
  );
}
export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  // const qs = Object.entries(ctx.query || {}).reduce((str, [k, v]) => {
  //   if (!str) {
  //     return k + "=" + v;
  //   }
  //   return str + "&" + k + "=" + v;
  // }, "");
  // console.log({ qs });
  let oauthInfo = {};
  try {
    const res = await axios({
      method: "post",
      url: "https://api.notion.com/v1/oauth/token",
      data: {
        grant_type: "authorization_code",
        code: ctx.query?.code,
        // redirect_uri: "https://www.chegi.fun",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.notion_auth_client_id_for_bookmark_ext}:${process.env.notion_auth_client_secret_for_bookmark_ext}`
        ).toString("base64")}`,
      },
    });
    // console.log({ data: JSON.stringify(res.data) });
    oauthInfo = {
      access_token: res.data.access_token,
      token_type: res.data.token_type,
      bot_id: res.data.bot_id,
      workspace_name: res.data.workspace_name,
      workspace_icon: res.data.workspace_icon,
      workspace_id: res.data.workspace_id,
      ownerUsername: res.data.owner?.user?.name,
      ownerUserId: res.data.owner?.user?.id,
      ownerUserAvatarUrl: res.data.owner?.user?.avatar_url,
      ownerUserEmail: res.data.owner?.user?.person?.email,
    };
  } catch (err) {
    console.error(err);
  }

  ctx.res.setHeader(
    "Set-Cookie",
    cookie.serialize("oauthInfo", JSON.stringify(oauthInfo), {
      httpOnly: false,
      hostOnly: false,
    })
  );
  return {
    props: {},
  };
}
