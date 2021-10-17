import { useGetItems, useGetTagGroups } from "../hooks/api";
import { useEffect, useState } from "react";
import { Pagination, SIZE } from "baseui/pagination";
import ItemListEntry from "./ItemListEntry";
import { styled, useStyletron } from "styletron-react";
import ItemSearch from "./ItemSearch";
import { Skeleton } from "baseui/skeleton";

const Centered = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const ItemsList = () => {
  const [css] = useStyletron();

  // Filters
  const [nameLike, setNameLike] = useState("");
  const [includeMembers, setIncludeMembers] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);

  // Reset to page 1 if we change filters
  useEffect(() => {
    setCurrentPage(1);
  }, [nameLike, includeMembers]);

  const [
    { data: availableTagGroups, loading: availableTagGroupsLoading },
    refetchTagGroups,
  ] = useGetTagGroups({});

  const [{ data, loading }] = useGetItems({
    nameLike,
    includeMembers,
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  });

  const numPages = Math.ceil((data?.totalCount ?? 0) / pageSize);

  const items =
    loading || !data
      ? [...Array(pageSize)].map(() => <Skeleton animation height="30px" />)
      : data.items.map((item) => (
          <ItemListEntry
            item={item}
            availableTagGroups={availableTagGroups ?? []}
            loading={availableTagGroupsLoading}
            refetchTagGroups={async () => {
              await refetchTagGroups();
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
