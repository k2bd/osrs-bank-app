import { useGetItems, useGetTagGroups } from "../hooks/api";
import { useState } from "react";
import { Pagination, SIZE } from "baseui/pagination";
import ItemListEntry from "./ItemListEntry";

const ItemsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);
  const [offset, setOffset] = useState<number>(0);

  useGetTagGroups({}); // For caching purposes

  const [{ data }] = useGetItems({ limit: pageSize, offset });

  const numPages = Math.ceil((data?.totalCount ?? 0) / pageSize);

  const items = data?.items.map((item) => <ItemListEntry item={item} />) ?? [];

  return (
    <>
      <ul>{items}</ul>
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
    </>
  );
};

export default ItemsList;
