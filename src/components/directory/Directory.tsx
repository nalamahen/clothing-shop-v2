import { categories } from "../../data";
import { Category } from "../../types";
import DirectoryItem from "../directory-item/DirectoryItem";
import { DirectoryContainer } from "./StyledDirctory";

interface DirectroryProps {
  categories: Category[];
}

export default function Directory({ categories }: DirectroryProps) {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
}
