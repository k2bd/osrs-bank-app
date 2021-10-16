import useAxios from "axios-hooks"
import { ITEMS_ENDPOINT } from "../constants"

export const useGetItems = (
    params: {
        itemId?: number;
        nameLike?: string;
        includeMembers?: boolean;
        includeRelated?: boolean;
        limit?: number;
        offset?: number;
    }
) => useAxios<ItemsSearchResult>({
        url: ITEMS_ENDPOINT,
        params: {...params},
    })
