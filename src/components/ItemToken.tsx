import { Tag } from "baseui/tag";

interface Props {
  item: OsrsItem;
  disabled: boolean;
  selected: boolean;
  onClick?: () => Promise<void> | void;
}

const ItemToken = ({ item, disabled, selected, onClick }: Props) => {
  return (
    <Tag
      startEnhancer={() => (
        <img src={`data:image/jpeg;base64,${item.iconBase64}`} />
      )}
      disabled={disabled}
      kind={selected ? "positive" : "primary"}
      closeable={false}
      onClick={onClick}
    >
      {item.name}
    </Tag>
  );
};

export default ItemToken;
