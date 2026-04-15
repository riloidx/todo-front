import { fetchToken } from "../services/api";

export default async function Home() {
  const res = await fetchToken();
  return (
    <div>
      <main>{res}</main>
    </div>
  );
}
