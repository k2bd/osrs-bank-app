import useAxios from "axios-hooks";
import {
  ITEMS_ENDPOINT,
  TAGS_BY_ITEM_ENDPOINT,
  TAG_ENDPOINT,
  TAG_GROUPS_ENDPOINT,
} from "../constants";

export const useGetItems = (params: {
  itemId?: number;
  nameLike?: string;
  includeMembers?: boolean;
  includeRelated?: boolean;
  limit?: number;
  offset?: number;
}) =>
  useAxios<ItemsSearchResult>({
    url: ITEMS_ENDPOINT,
    params,
  });

export const useGetTagGroups = (params: { nameLike?: string }) =>
  useAxios<string[]>({
    url: TAG_GROUPS_ENDPOINT,
    params,
  });

export const useGetItemTags = (itemId: number) =>
  useAxios<OsrsTag[]>({
    url: TAGS_BY_ITEM_ENDPOINT + `${itemId}`,
  });

export const useCreateItemTag = () =>
  useAxios<OsrsTag>(
    {
      url: TAG_ENDPOINT,
      method: "POST",
    },
    { manual: true }
  );

export const useDeleteItemTag = () =>
  useAxios<OsrsTag>(
    {
      url: TAG_ENDPOINT,
      method: "DELETE",
    },
    { manual: true }
  );
