import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import CharacterModal from './CharacterModal';
import { CharacterProps } from './CharacterModal';

interface SearchOption {
	value: string;
	label: string;
}


interface APIResponse {
	results: {
		url: string;
		name: string;
	}[];
}

const SearchBar: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCharacter, setSelectedCharacter] = useState<SearchOption | null>(null);

	const loadResults = async (inputValue: string): Promise<SearchOption[]> => {
		return fetch(`https://swapi.dev/api/people?search=${inputValue}`)
			.then((response) => response.json())
			.then((data: APIResponse) => {
				if (data.results && Array.isArray(data.results)) {
					const transformedOptions: SearchOption[] = data.results.map((result) => ({
						value: result.url,
						label: result.name,
					}));

					return transformedOptions;
				} else {
					return [];
				}
			})
			.catch((error) => {
				console.error(error);
				return [];
			});
	};

	const handleCharacterSelect = (selectedOption: SearchOption | null) => {
		setSelectedCharacter(selectedOption);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCharacter(null);
	};

	const characterProps: CharacterProps | null = selectedCharacter
		? (selectedCharacter as unknown as CharacterProps)
		: null;


	return (
		<>
			<div className="flex w-full">
				<AsyncSelect
					loadOptions={loadResults}
					defaultOptions={false}
					placeholder="Search..."
					className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black w-full"
					onChange={handleCharacterSelect}
					components={{ DropdownIndicator: null }}
				/>
			</div>
			{characterProps && (
				<CharacterModal
					character={characterProps}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
};

export default SearchBar;
