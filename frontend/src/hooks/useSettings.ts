import { useQuery } from "@tanstack/react-query";

import {
	getSettings,
	SettingsResponse,
	tableSortToAPI,
	tableFiltersToAPI,
} from "src/api/npm";

const fetchSettings = (offset = 0, limit = 10, sortBy?: any, filters?: any) => {
	return getSettings(
		offset,
		limit,
		tableSortToAPI(sortBy),
		tableFiltersToAPI(filters),
	);
};

const useSettings = (
	offset = 0,
	limit = 10,
	sortBy?: any,
	filters?: any,
	options = {},
) => {
	return useQuery<SettingsResponse, Error>({
		queryKey: ["settings", { offset, limit, sortBy, filters }],
		queryFn: () => fetchSettings(offset, limit, sortBy, filters),
		staleTime: 15 * 1000, // 15 seconds
		...options,
	});
};

export { fetchSettings, useSettings };
