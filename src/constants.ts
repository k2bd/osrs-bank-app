const OSRS_ITEMS_API_URL = process.env.REACT_APP_OSRS_ITEMS_API_URL ?? "";

export const ITEMS_ENDPOINT = `${OSRS_ITEMS_API_URL}/items`;
export const ITEM_ENDPOINT = `${OSRS_ITEMS_API_URL}/item`;
export const TAG_ENDPOINT = `${OSRS_ITEMS_API_URL}/tag`;
export const TAG_GROUPS_ENDPOINT = `${OSRS_ITEMS_API_URL}/tagGroups`;

export const RELATED_ROUTE = "/related";
export const TAGS_ROUTE = "/tags";
export const ITEMS_ROUTE = "/items";
