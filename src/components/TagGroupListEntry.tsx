import {
  useGetItem,
  useGetItemsByTag,
  useGetTagGroup,
  usePutTagGroup,
} from "../hooks/api";
import ItemToken from "./ItemToken";
import { MdContentCopy } from "react-icons/md";
import { Button } from "baseui/button";
import useClipboard from "react-use-clipboard";
import { Check, Spinner } from "baseui/icon";
import { Panel } from "baseui/accordion";
import { FlexRow } from "../style";
import { ListItem, ListItemLabel } from "baseui/list";
import { Textarea } from "baseui/textarea";
import { useState } from "react";
import { Input } from "baseui/input";

interface Props {
  groupName: string;
  expanded: boolean;
  setExpanded: (groupName?: string) => void;
}

const TagGroupListEntry = ({ groupName, expanded, setExpanded }: Props) => {
  const [{ data: group, loading: groupLoading }, refetchGroup] =
    useGetTagGroup(groupName);

  const [{ data: mainItems }] = useGetItemsByTag(groupName, {});
  const [{ data: allItems }] = useGetItemsByTag(groupName, {
    includeRelated: true,
  });

  const [{ loading: putTagGroupLoading }, putTagGroup] = usePutTagGroup();

  const [{ data: iconItem }] = useGetItem(group?.itemIconId ?? 0);

  const [newDescription, setNewDescription] = useState<string | undefined>(
    group?.description
  );

  const exportItems = group?.itemIconId
    ? allItems?.sort((x, y) =>
        x.itemId == group.itemIconId ? -1 : y.itemId == group.itemIconId ? 1 : 0
      )
    : allItems;
  const copyText =
    `${groupName},` +
    exportItems?.map((item) => item.itemId.toString()).join(",");
  const [isCopied, setCopied] = useClipboard(copyText, {
    successDuration: 500,
  });

  if (!group || groupLoading) {
    return <Spinner />;
  }

  const itemTokens = (mainItems ?? []).map((item) => (
    <ItemToken
      item={item}
      disabled={putTagGroupLoading}
      selected={item.itemId === group?.itemIconId}
      onClick={async () => {
        const newTagGroup: OsrsTagGroup = {
          groupName,
          description: group?.description,
          itemIconId: item.itemId,
        };
        await putTagGroup({ data: newTagGroup });
        await refetchGroup();
      }}
    />
  ));

  const copyButton = (
    <Button kind="secondary" onClick={setCopied}>
      {isCopied ? <Check /> : <MdContentCopy />}
    </Button>
  );

  const title = (
    <ListItem
      artwork={() =>
        group.itemIconId && iconItem ? (
          <img src={`data:image/jpeg;base64,${iconItem.iconBase64}`} />
        ) : (
          <></>
        )
      }
    >
      <ListItemLabel description={expanded ? "" : group.description}>
        {groupName}
      </ListItemLabel>
    </ListItem>
  );

  const editDescription = (
    <FlexRow>
      <Input
        size="compact"
        value={newDescription || group.description}
        onChange={(e) => setNewDescription(e.currentTarget.value)}
      />
      <Button
        size="compact"
        kind="secondary"
        isLoading={putTagGroupLoading && group.description !== newDescription}
        disabled={putTagGroupLoading || group.description === newDescription}
        onClick={async () => {
          const newTagGroup: OsrsTagGroup = {
            groupName,
            description: newDescription,
            itemIconId: group.itemIconId,
          };
          await putTagGroup({ data: newTagGroup });
          await refetchGroup();
        }}
      >
        Update description
      </Button>
    </FlexRow>
  );

  return (
    <FlexRow>
      <Panel
        key={groupName}
        title={title}
        expanded={expanded}
        onClick={() => setExpanded(expanded ? undefined : groupName)}
      >
        {editDescription}
        {itemTokens}
      </Panel>
      {copyButton}
    </FlexRow>
  );
};

export default TagGroupListEntry;
