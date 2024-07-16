import Directory from "../../components/directory/Directory";
import { categories } from "../../data";

export default function Home() {
  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
}
