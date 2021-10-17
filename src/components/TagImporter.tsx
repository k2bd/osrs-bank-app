import { useCreateItemTags } from "../hooks/api";
import { Centered } from "../style";
import { Textarea } from "baseui/textarea";
import { useState } from "react";
import { Button } from "baseui/button";
import { Upload } from "baseui/icon";

const TagImporter = () => {
  const [{ loading: createItemTagsLoading }, createItemTags] =
    useCreateItemTags();

  const [value, setValue] = useState("");

  const importHandler = () => {
    const parsed = value.split(",").map((v) => v.trim());
    const groupName = parsed[0];
    const itemIds = parsed.slice(1).map((itemStr) => +itemStr);

    const tags: OsrsTag[] = itemIds.map((itemId) => ({ itemId, groupName }));

    createItemTags({ data: tags });
  };

  return (
    <Centered>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Paste a bank tag group from Runelite"
        clearOnEscape
      />
      <Button
        disabled={createItemTagsLoading}
        isLoading={createItemTagsLoading}
        startEnhancer={() => <Upload />}
        onClick={importHandler}
      >
        Import
      </Button>
    </Centered>
  );
};

export default TagImporter;
