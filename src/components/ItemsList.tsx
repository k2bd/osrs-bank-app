import { useGetItems, useGetTagGroups } from "../hooks/api";
import { useEffect, useState } from "react";
import { Pagination, SIZE } from "baseui/pagination";
import ItemListEntry from "./ItemListEntry";
import { useStyletron } from "styletron-react";
import ItemSearch from "./ItemSearch";
import { Skeleton } from "baseui/skeleton";
import { Centered } from "../style";
import { OnChangeParams, Value } from "baseui/select";

const ItemsList = () => {
  const [css] = useStyletron();

  // Filters
  const [nameLike, setNameLike] = useState("");
  const [includeMembers, setIncludeMembers] = useState(true);
  const [searchedTags, setSearchedTags] = useState<Value>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);

  // Reset to page 1 if we change filters
  useEffect(() => {
    setCurrentPage(1);
  }, [nameLike, includeMembers, searchedTags]);

  const [{ data, loading: getItemsLoading }] = useGetItems({
    nameLike,
    includeMembers,
    hasTags: searchedTags.map((tag) => tag.id?.toString()).join(","),
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  });
  const [
    { data: availableTagGroups, loading: availableTagGroupsLoading },
    refetchTagGroups,
  ] = useGetTagGroups({});

  // Reload tag groups on mount
  useEffect(() => {
    refetchTagGroups();
  }, []);

  const numPages = Math.ceil((data?.totalCount ?? 0) / pageSize);

  const items =
    getItemsLoading || !data
      ? [...Object.keys(Array(pageSize))].map((i) => (
          <Skeleton key={i} animation height="30px" />
        ))
      : data.items.map((item) => (
          <ItemListEntry
            key={item.itemId}
            item={item}
            availableTagGroups={availableTagGroups ?? []}
            loading={availableTagGroupsLoading}
            refetchTagGroups={async () => {
              refetchTagGroups();
            }}
          />
        )) ?? [];

  return (
    <>
      <Centered>
        <ItemSearch
          nameLike={nameLike}
          setNameLike={setNameLike}
          includeMembers={includeMembers}
          setIncludeMembers={setIncludeMembers}
          availableTags={(availableTagGroups ?? []).map(({ groupName }) => ({
            id: groupName,
            label: groupName, // TODO: make label pretty
          }))}
          searchedTags={searchedTags}
          setSearchedTags={(params: OnChangeParams) =>
            setSearchedTags(params.value)
          }
          tagSelectLoading={availableTagGroupsLoading}
        />
        <ul
          className={css({
            width: "60%",
          })}
        >
          {items}
        </ul>
        <Pagination
          numPages={numPages}
          size={SIZE.mini}
          currentPage={currentPage}
          onPageChange={({ nextPage }) => {
            const newPage = Math.min(Math.max(nextPage, 1), numPages);
            setCurrentPage(newPage);
          }}
        />
      </Centered>
    </>
  );
};

export default ItemsList;
