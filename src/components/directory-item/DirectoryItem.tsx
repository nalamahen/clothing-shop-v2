import { Category } from "../../types";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./StyledDirectoryItem";

interface DirectoryItemProps {
  category: Category;
}

export default function DirectoryItem({ category }: DirectoryItemProps) {
  const { title, imageUrl } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <span>SHOP NOW</span>
      </Body>
    </DirectoryItemContainer>
  );
}
