import { getData } from "@/actions/connectionAction";
import Connections from "@/components/connections";

export default async function Home() {
  const data = await getData();
  return <Connections connections={data} />;
}