import { ListItem, ListItemLabel } from "baseui/list";
import {
  useCreateItemTag,
  useDeleteItemTag,
  useGetItemTags,
} from "../hooks/api";
import { OnChangeParams, Select } from "baseui/select";
import { useEffect, useState } from "react";

interface Props {
  item: OsrsItem;
  availableTagGroups: string[];
  loading: boolean;
  refetchTagGroups: () => Promise<void>;
}

const ItemListEntry = ({
  item,
  availableTagGroups,
  loading,
  refetchTagGroups,
}: Props) => {
  const [
    { data: existingTags, loading: existingTagsLoading },
    refetchItemTags,
  ] = useGetItemTags(item.itemId);

  if (existingTags) {
    console.log(item.name);
    console.log(existingTags);
  }

  const [selectedTagGroups, setSelectedTagGroups] = useState<OsrsTag[]>([]);

  const [{ loading: createItemTagLoading }, createItemTag] = useCreateItemTag();
  const [{ loading: deleteItemTagLoading }, deleteItemTag] = useDeleteItemTag();

  // Set the initial values when we get a result from the server
  useEffect(() => {
    if (!existingTagsLoading && existingTags)
      setSelectedTagGroups(existingTags);
  }, [existingTags, existingTagsLoading]);

  const tagOptions = (availableTagGroups ?? []).map((groupName) => ({
    id: groupName,
    label: groupName,
  }));

  const tagChangeHandler = async (params: OnChangeParams) => {
    const existingGroupNames = existingTags?.map((tag) => tag.groupName) ?? [];
    const newValueGroupNames = params.value
      .map((x) => x.id?.toString())
      .filter((item): item is string => !!item);
    const newTags = newValueGroupNames.filter(
      (groupName) => groupName && !existingGroupNames?.includes(groupName)
    );
    const deletedTags = existingGroupNames?.filter(
      (tag) => !newValueGroupNames.includes(tag)
    );

    await Promise.all(
      newTags.map(async (groupName) =>
        createItemTag({ data: { itemId: item.itemId, groupName: groupName } })
      )
    );

    await Promise.all(
      deletedTags.map(async (groupName) =>
        deleteItemTag({ data: { itemId: item.itemId, groupName: groupName } })
      )
    );

    await refetchItemTags();
    await refetchTagGroups();
  };

  const selectLoading =
    loading ||
    existingTagsLoading ||
    createItemTagLoading ||
    deleteItemTagLoading;

  const tagSelect = (
    <Select
      creatable
      multi
      disabled={selectLoading}
      isLoading={selectLoading}
      size="mini"
      options={tagOptions}
      value={selectedTagGroups.map((tag) => ({
        id: tag.groupName,
        label: tag.groupName,
      }))}
      placeholder="Select tags"
      onChange={tagChangeHandler}
    />
  );

  return (
    <ListItem
      artwork={() => <img src={`data:image/jpeg;base64,${item.iconBase64}`} />}
      key={item.itemId}
    >
      <ListItemLabel description={tagSelect}>{item.name}</ListItemLabel>
    </ListItem>
  );
};

export default ItemListEntry;
