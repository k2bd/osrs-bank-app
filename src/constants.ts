const OSRS_ITEMS_API_URL = process.env.REACT_APP_OSRS_ITEMS_API_URL ?? "";

export const ITEMS_ENDPOINT = `${OSRS_ITEMS_API_URL}/items/`;
export const ITEM_ENDPOINT = `${OSRS_ITEMS_API_URL}/item/`;
export const TAG_ENDPOINT = `${OSRS_ITEMS_API_URL}/tag/`;
export const TAG_GROUPS_ENDPOINT = `${OSRS_ITEMS_API_URL}/tagGroups/`;
export const RELATED_ITEMS_ENDPOINT = `${OSRS_ITEMS_API_URL}/items/related/`;
export const TAGS_BY_ITEM_ENDPOINT = `${OSRS_ITEMS_API_URL}/tags/item/`;
export const ITEMS_BY_TAG_ENDPOINT = `${OSRS_ITEMS_API_URL}/items/tag/`;
