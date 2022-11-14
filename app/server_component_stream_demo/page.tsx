import { Suspense } from "react";
import Com1 from "./async_component/Com1";
import Com2 from "./async_component/Com2";
import Com3 from "./async_component/Com3";

export default async function Page() {
  return (
    <>
      <h1>streaming SSR</h1>
      <Suspense fallback={<div>loading 1</div>}>
        {/*@ts-ignore*/}
        <Com1 />
      </Suspense>
      <Suspense fallback={<div>loading 2</div>}>
        {/*@ts-ignore*/}
        <Com2 />
      </Suspense>
      <Suspense fallback={<div>loading 3</div>}>
        {/*@ts-ignore*/}
        <Com3 />
      </Suspense>
    </>
  );
}
