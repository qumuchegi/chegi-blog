export default async function Page() {
  const result: string = await new Promise((res) => {
    setTimeout(() => res("yes, it is a server component"), 2000);
  });
  return <div>{result}</div>;
}
