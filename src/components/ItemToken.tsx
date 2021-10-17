import { Tag } from "baseui/tag";

interface Props {
  item: OsrsItem;
}

const ItemToken = ({ item }: Props) => {
  return (
    <Tag
      startEnhancer={() => (
        <img src={`data:image/jpeg;base64,${item.iconBase64}`} />
      )}
      closeable={false}
    >
      {item.name}
    </Tag>
  );
};

export default ItemToken;
