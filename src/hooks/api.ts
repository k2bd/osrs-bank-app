import useAxios from "axios-hooks";
import {
  ITEMS_BY_TAG_ENDPOINT,
  ITEMS_ENDPOINT,
  ITEM_ENDPOINT,
  OSRS_ITEMS_API_URL,
  TAGS_BY_ITEM_ENDPOINT,
  TAGS_ENDPOINT,
  TAG_GROUPS_ENDPOINT,
  TAG_GROUP_ENDPOINT,
} from "../constants";

export const useGetItem = (itemId: number) =>
  useAxios<OsrsItem>({
    url: ITEM_ENDPOINT + `${itemId}`,
    baseURL: OSRS_ITEMS_API_URL,
  });

export const useGetItems = (params: {
  itemId?: number;
  nameLike?: string;
  includeMembers?: boolean;
  includeRelated?: boolean;
  hasTags?: string;
  limit?: number;
  offset?: number;
}) =>
  useAxios<ItemsSearchResult>({
    url: ITEMS_ENDPOINT,
    baseURL: OSRS_ITEMS_API_URL,
    params,
  });

export const usePutTagGroup = () =>
  useAxios<OsrsTagGroup>(
    {
      url: TAG_GROUP_ENDPOINT,
      baseURL: OSRS_ITEMS_API_URL,
      method: "PUT",
      params: {},
    },
    { manual: true, autoCancel: false }
  );

export const useGetTagGroup = (groupName: string) =>
  useAxios<OsrsTagGroup>({
    url: TAG_GROUP_ENDPOINT + `/${groupName}`,
    baseURL: OSRS_ITEMS_API_URL,
  });

export const useGetTagGroups = (params: {
  nameLike?: string;
  hasItems?: string;
}) =>
  useAxios<OsrsTagGroup[]>({
    url: TAG_GROUPS_ENDPOINT,
    baseURL: OSRS_ITEMS_API_URL,
    params,
  });

export const useGetItemTags = (itemId: number) =>
  useAxios<OsrsTag[]>({
    url: TAGS_BY_ITEM_ENDPOINT + `${itemId}`,
    baseURL: OSRS_ITEMS_API_URL,
  });

export const useGetItemsByTag = (
  tagName: string,
  params: { includeRelated?: boolean }
) =>
  useAxios<OsrsItem[]>({
    url: ITEMS_BY_TAG_ENDPOINT + `${tagName}`,
    baseURL: OSRS_ITEMS_API_URL,
    params,
  });

export const useCreateItemTags = () =>
  useAxios<OsrsTag[]>(
    {
      url: TAGS_ENDPOINT,
      baseURL: OSRS_ITEMS_API_URL,
      method: "POST",
      params: {},
    },
    { manual: true, autoCancel: false }
  );

export const useDeleteItemTags = () =>
  useAxios<OsrsTag[]>(
    {
      url: TAGS_ENDPOINT,
      baseURL: OSRS_ITEMS_API_URL,
      method: "DELETE",
      params: {},
    },
    { manual: true, autoCancel: false }
  );
