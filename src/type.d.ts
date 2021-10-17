interface OsrsItem {
  itemId: number;
  name: string;
  members: boolean;
  iconBase64: string;
}

interface ItemsSearchResult {
  totalCount: number;
  items: OsrsItem[];
}

interface OsrsTag {
  itemId: number;
  groupName: string;
}
