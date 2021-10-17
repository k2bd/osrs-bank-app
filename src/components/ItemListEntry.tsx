import { ListItem, ListItemLabel } from "baseui/list";
import { Tag } from "baseui/tag";
import { useGetTagGroups } from "../hooks/api";
import { Select } from "baseui/select";

interface Props {
  item: OsrsItem;
}

const ItemListEntry = ({ item }: Props) => {
  const [{ data }] = useGetTagGroups({});

  const tagSelect = (
    <Select
      creatable
      multi
      options={[]}
      value={[]}
      placeholder="Select tags"
      onChange={(params) => setValue(params.value)}
    />
  );

  return (
    <ListItem
      artwork={() => <img src={`data:image/jpeg;base64,${item.iconBase64}`} />}
      key={item.itemId}
    >
      <ListItemLabel description={<Tag />}>{item.name}</ListItemLabel>
    </ListItem>
  );
};

export default ItemListEntry;
