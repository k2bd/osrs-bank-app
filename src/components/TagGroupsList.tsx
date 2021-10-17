import { Pagination } from "baseui/pagination";
import { Skeleton } from "baseui/skeleton";
import { useEffect, useState } from "react";
import { Centered } from "../style";
import TagGroupListEntry from "./TagGroupListEntry";
import TagGroupSearch from "./TagGroupSearch";
import { StatelessAccordion } from "baseui/accordion";

interface Props {
  availableTagGroups: string[];
  loading: boolean;
  refetchTagGroups: () => Promise<void>;
}

const TagGroupsList = ({ availableTagGroups, loading }: Props) => {
  // Filters
  const [nameLike, setNameLike] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);

  // Reset to page 1 if we change filters
  useEffect(() => {
    setCurrentPage(1);
  }, [nameLike]);

  const filteredTagGroups = availableTagGroups.filter((group) =>
    group.toLowerCase().includes(nameLike.toLowerCase())
  );

  const pageTagGroups = filteredTagGroups.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
  );

  const [expanded, setExpanded] = useState<React.Key | undefined>(undefined);

  const numPages = Math.ceil(filteredTagGroups.length / pageSize);

  const pageTagGroupItems = loading
    ? [...Object.keys(Array(pageSize))].map((i) => (
        <Skeleton key={i} animation height="30px" />
      ))
    : pageTagGroups.map((groupName) => (
        <TagGroupListEntry
          key={groupName}
          groupName={groupName}
          expanded={expanded === groupName}
          setExpanded={setExpanded}
        />
      ));

  return (
    <Centered>
      <TagGroupSearch nameLike={nameLike} setNameLike={setNameLike} />
      <StatelessAccordion expanded={expanded ? [expanded] : []}>
        {pageTagGroupItems}
      </StatelessAccordion>
      <Pagination
        numPages={numPages}
        size="mini"
        currentPage={currentPage}
        onPageChange={({ nextPage }) => {
          const newPage = Math.min(Math.max(nextPage, 1), numPages);
          setCurrentPage(newPage);
        }}
      />
    </Centered>
  );
};

export default TagGroupsList;
