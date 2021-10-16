import { useGetItems } from "../hooks/api";
import { StyledSpinnerNext } from "baseui/spinner";
import { ListItem, ListItemLabel } from "baseui/list";
import { useState } from "react";
import { Pagination, SIZE } from "baseui/pagination";

const ItemsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [offset, setOffset] = useState<number>(0);

  const [{ data, loading }] = useGetItems({limit: pageSize, offset})

  if (loading) {
    return <StyledSpinnerNext></StyledSpinnerNext>
  }

  const numPages = Math.ceil((data?.totalCount ?? 0) / pageSize)

  const items = data?.items.map(
    item => (
      <ListItem
        artwork={
          () => <img src={`data:image/jpeg;base64,${item.iconBase64}`} />
        }
        key={item.itemId}
      >
        <ListItemLabel>
          {item.name}
        </ListItemLabel>
      </ListItem>
    )
  )

  return (
    <>
      <ul>
        {items}
      </ul>
      <Pagination
        numPages={numPages}
        size={SIZE.mini}
        currentPage={currentPage}
        onPageChange={({nextPage}) => {
          const newPage = Math.min(Math.max(nextPage, 1), numPages)
          setCurrentPage(newPage);
          setOffset(pageSize * (newPage - 1));
        }}
      />
    </>
  )
}

export default ItemsList;
