import { useGetItems, useGetTagGroups } from "../hooks/api";
import { useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);
  const [offset, setOffset] = useState<number>(0);

  const [
    { data: availableTagGroups, loading: availableTagGroupsLoading },
    refetchTagGroups,
  ] = useGetTagGroups({});

  const [{ data, loading }] = useGetItems({ limit: pageSize, offset });

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
        <ItemSearch />
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
            setOffset(pageSize * (newPage - 1));
          }}
        />
      </Centered>
    </>
  );
};

export default ItemsList;
