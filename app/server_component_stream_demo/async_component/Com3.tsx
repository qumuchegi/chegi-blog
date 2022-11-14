export default async function Com1() {
  const result: string = await new Promise((res) => {
    setTimeout(() => res("server component 3"), 3000);
  });
  return (
    <>
      <div>{result}</div>
    </>
  );
}
