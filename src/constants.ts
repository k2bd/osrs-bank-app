export const OSRS_ITEMS_API_URL =
  process.env.REACT_APP_OSRS_ITEMS_API_URL ?? "";

export const ITEM_ENDPOINT = `item`;
export const ITEMS_ENDPOINT = `items`;
export const TAG_ENDPOINT = `tag`;
export const TAGS_ENDPOINT = `tags`;
export const TAG_GROUP_ENDPOINT = `group`;
export const TAG_GROUPS_ENDPOINT = `groups`;
export const RELATED_ITEMS_ENDPOINT = `${ITEMS_ENDPOINT}/related/`;
export const ITEMS_BY_TAG_ENDPOINT = `${ITEMS_ENDPOINT}/tag/`;
export const TAGS_BY_ITEM_ENDPOINT = `${TAGS_ENDPOINT}/item/`;
