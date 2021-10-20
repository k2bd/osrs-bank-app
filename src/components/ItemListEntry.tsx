import { ListItem, ListItemLabel } from "baseui/list";
import {
  useCreateItemTags,
  useDeleteItemTags,
  useGetItemTags,
} from "../hooks/api";
import { OnChangeParams, OptionsT, Select } from "baseui/select";
import { useEffect, useState } from "react";

interface Props {
  item: OsrsItem;
  availableTagGroups: OsrsTagGroup[];
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

  const [selectedTagGroups, setSelectedTagGroups] = useState<OsrsTag[]>([]);

  const [{ loading: createItemTagsLoading }, createItemTags] =
    useCreateItemTags();
  const [{ loading: deleteItemTagsLoading }, deleteItemTags] =
    useDeleteItemTags();

  // Set the initial values when we get a result from the server
  useEffect(() => {
    if (!existingTagsLoading && existingTags)
      setSelectedTagGroups(existingTags);
  }, [existingTags, existingTagsLoading]);

  const tagOptions: OptionsT = (availableTagGroups ?? []).map(
    ({ groupName }) => ({
      id: groupName,
      label: groupName, // TODO: make label pretty
    })
  );

  const tagChangeHandler = async (params: OnChangeParams) => {
    const existingGroupNames = existingTags?.map((tag) => tag.groupName) ?? [];
    const newValueGroupNames = params.value
      .map((x) => x.id?.toString())
      .filter((item): item is string => !!item)
      .map((csvItem) =>
        csvItem
          .split(",")
          .map((item) => item.trim())
          .filter((item) => !!item)
      )
      .flat()
      .map((val) => val.toLowerCase());

    const newTags = newValueGroupNames.filter(
      (groupName) => groupName && !existingGroupNames?.includes(groupName)
    );
    const deletedTags = existingGroupNames?.filter(
      (tag) => !newValueGroupNames.includes(tag)
    );

    await createItemTags({
      data: newTags.map((groupName) => ({
        itemId: item.itemId,
        groupName: groupName,
      })),
    });

    await deleteItemTags({
      data: deletedTags.map((groupName) => ({
        itemId: item.itemId,
        groupName: groupName,
      })),
    });

    await refetchItemTags();
    await refetchTagGroups();
  };

  const selectLoading =
    loading ||
    existingTagsLoading ||
    createItemTagsLoading ||
    deleteItemTagsLoading;

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
