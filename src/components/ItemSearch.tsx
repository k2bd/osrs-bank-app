import { Input } from "baseui/input";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { FormControl } from "baseui/form-control";
import { StatefulPanel } from "baseui/accordion";

interface Props {
  nameLike?: string;
  setNameLike: (value: string) => void;
  includeMembers: boolean;
  setIncludeMembers: (value: boolean) => void;
}

const ItemSearch = ({
  nameLike,
  setNameLike,
  includeMembers,
  setIncludeMembers,
}: Props) => {
  const [quickNameLike, setQuickNameLike] = useState(nameLike ?? "");
  const debouncedNameLikeChange = useCallback(debounce(setNameLike, 300), []);

  return (
    <>
      <StatefulPanel title="Item filters">
        <FormControl label={() => "Item Name"}>
          <Input
            value={quickNameLike}
            onChange={(e) => {
              setQuickNameLike(e.currentTarget.value);
              debouncedNameLikeChange(e.currentTarget.value);
            }}
            placeholder="Complete or partial item name"
            clearOnEscape
          />
        </FormControl>
        <FormControl>
          <Checkbox
            checkmarkType={STYLE_TYPE.toggle_round}
            checked={includeMembers}
            onChange={() => setIncludeMembers(!includeMembers)}
            labelPlacement={LABEL_PLACEMENT.right}
          >
            Include Members
          </Checkbox>
        </FormControl>
      </StatefulPanel>
    </>
  );
};

export default ItemSearch;
