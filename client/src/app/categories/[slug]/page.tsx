import { SearchBar } from "@/components/custom/search-bar";

interface ParamsProps {
  slug: string;
}

export default function CategoryRoute({ params }: { params: ParamsProps }) {
  console.log(params);
  return (
    <div>
      <div>
        <h1>{params.slug}</h1>
        <p>Category description</p>
      </div>
      <SearchBar />
    </div>
  );
}
