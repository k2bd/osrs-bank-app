interface OsrsItem {
  itemId: number;
  name: string;
  members: boolean;
  iconBase64: string;
}

interface ItemsSearchResult {
  totalCount: number;
  lastResultId: number;
  items: OsrsItem[];
}
