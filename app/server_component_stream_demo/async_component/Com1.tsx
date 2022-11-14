export default async function Com1() {
  const result: string = await new Promise((res) => {
    setTimeout(() => res("server component 1"), 1000);
  });
  return (
    <>
      <div>{result}</div>
    </>
  );
}
