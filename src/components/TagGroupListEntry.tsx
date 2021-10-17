import { ListItem, ListItemLabel } from "baseui/list";
import { useGetItemsByTag } from "../hooks/api";
import ItemToken from "./ItemToken";
import { MdContentCopy } from "react-icons/md";
import { Button } from "baseui/button";
import useClipboard from "react-use-clipboard";
import { Check } from "baseui/icon";
import { Panel } from "baseui/accordion";
import { FlexRow } from "../style";

interface Props {
  groupName: string;
  expanded: boolean;
  setExpanded: (groupName?: string) => void;
}

const TagGroupListEntry = ({ groupName, expanded, setExpanded }: Props) => {
  const [{ data, loading }] = useGetItemsByTag(groupName);

  const itemTokens = (data ?? []).map((item) => <ItemToken item={item} />);

  const copyText =
    `${groupName},` + data?.map((item) => item.itemId.toString()).join(",");

  const [isCopied, setCopied] = useClipboard(copyText, {
    successDuration: 500,
  });

  const copyButton = (
    <Button kind="secondary" onClick={setCopied}>
      {isCopied ? <Check /> : <MdContentCopy />}
    </Button>
  );

  return (
    <FlexRow>
      <Panel
        key={groupName}
        title={groupName}
        expanded={expanded}
        onClick={() => setExpanded(expanded ? undefined : groupName)}
      >
        {itemTokens}
      </Panel>
      {copyButton}
    </FlexRow>
  );
};

export default TagGroupListEntry;
