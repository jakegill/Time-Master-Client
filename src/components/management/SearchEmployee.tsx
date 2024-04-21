import { IconSearch } from "@tabler/icons-react";
import { useSearch } from "@/components/SearchContext";

export default function SearchEmployee() {
	const { setSearchTerm } = useSearch();

	const handleSearchChange = (event: any) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className="max-w-96 flex w-full  pl-2 gap-2 pr-4 py-2 border-[1px] border-neutral-light rounded-md shadow-sm bg-neutral-white ">
			<IconSearch size={20} color={"hsl(211, 10%, 53%)"} />
			<input
				className="w-full text-sm truncate bg-neutral-white focus:outline-none"
				id="search-input"
				type="text"
				placeholder="Search by name, id, or email..."
				onChange={handleSearchChange}
			/>
		</div>
	);
}