import {
  useDeleteTagGroup,
  useGetItem,
  useGetItemsByTag,
  useGetTagGroup,
  usePutTagGroup,
} from "../hooks/api";
import ItemToken from "./ItemToken";
import { MdContentCopy } from "react-icons/md";
import { Button } from "baseui/button";
import useClipboard from "react-use-clipboard";
import { Check, Delete, Spinner } from "baseui/icon";
import { Panel } from "baseui/accordion";
import { FlexRow } from "../style";
import { ListItem, ListItemLabel } from "baseui/list";
import { useState } from "react";
import { Input } from "baseui/input";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";

interface Props {
  groupName: string;
  expanded: boolean;
  setExpanded: (groupName?: string) => void;
  refetchTagGroups: () => Promise<void>;
}

const TagGroupListEntry = ({
  groupName,
  expanded,
  setExpanded,
  refetchTagGroups,
}: Props) => {
  const [{ data: group }, refetchGroup] = useGetTagGroup(groupName);

  const [{ data: mainItems }] = useGetItemsByTag(groupName, {});
  const [{ data: allItems }] = useGetItemsByTag(groupName, {
    includeRelated: true,
  });

  const [{ loading: putTagGroupLoading }, putTagGroup] = usePutTagGroup();
  const [, deleteTagGroup] = useDeleteTagGroup();

  const [{ data: iconItem }] = useGetItem(group?.itemIconId ?? -1);

  const [newDescription, setNewDescription] = useState<string | undefined>(
    group?.description
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  if (!group) {
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
        group.itemIconId !== undefined && iconItem ? (
          <img src={`data:image/jpeg;base64,${iconItem.iconBase64}`} />
        ) : (
          <></>
        )
      }
    >
      <ListItemLabel description={group.description}>{groupName}</ListItemLabel>
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

  const handleDelete = async () => {
    await deleteTagGroup({ data: group });
    await refetchTagGroups();
  };

  const deleteModal = (
    <Modal
      onClose={() => setDeleteModalOpen(false)}
      closeable
      isOpen={deleteModalOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Delete tag group?</ModalHeader>
      <ModalBody>
        This will delete the tag group and remove the tag from all items.
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="tertiary" onClick={() => setDeleteModalOpen(false)}>
          Cancel
        </ModalButton>
        <ModalButton
          kind="primary"
          onClick={async () => {
            setDeleteModalOpen(false);
            await handleDelete();
          }}
        >
          Delete
        </ModalButton>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      <FlexRow>
        <Panel
          key={groupName}
          title={title}
          expanded={expanded}
          onClick={() => setExpanded(expanded ? undefined : groupName)}
        >
          {editDescription}
          {itemTokens}
          <FlexRow>
            <Button
              onClick={() => setDeleteModalOpen(true)}
              startEnhancer={() => <Delete />}
              kind="secondary"
              size="mini"
            >
              Delete Group
            </Button>
          </FlexRow>
        </Panel>
        {copyButton}
      </FlexRow>
      {deleteModal}
    </>
  );
};

export default TagGroupListEntry;
