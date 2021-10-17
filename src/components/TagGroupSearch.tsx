import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

interface Props {
  nameLike?: string;
  setNameLike: (value: string) => void;
}

const TagGroupSearch = ({ nameLike, setNameLike }: Props) => {
  const [quickNameLike, setQuickNameLike] = useState(nameLike ?? "");
  const debouncedNameLikeChange = useCallback(debounce(setNameLike, 300), []);

  return (
    <FormControl label="Filter Tags">
      <Input
        value={quickNameLike}
        onChange={(e) => {
          setQuickNameLike(e.currentTarget.value);
          debouncedNameLikeChange(e.currentTarget.value);
        }}
        placeholder="Complete or partial tag name"
        clearOnEscape
      />
    </FormControl>
  );
};

export default TagGroupSearch;
