import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/*
How to use:

1. Have a searchBar component of some kind, that setsSearchTerm
2. Wrap the entire page in SearchContextProvider, including all state.
    - SearchBar component should obv. be in the page.
3. Pass the data to setSearchData, an array of objects.    
*/


const defaultState = {
	searchTerm: "",
	setSearchTerm: (term: string) => {},
	searchData: [],
	setSearchData: ([]) => {},
	searchResults: [],
};

export const SearchContext = createContext(defaultState);

export const useSearch = () => useContext(SearchContext);

export const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [searchData, setSearchData] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const filteredResults = searchData.filter((item) =>
			Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
		);
		setSearchResults(filteredResults);
	}, [searchTerm, searchData]);

	const value = { searchTerm, setSearchTerm, searchData, setSearchData, searchResults };

    //@ts-ignore
	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};