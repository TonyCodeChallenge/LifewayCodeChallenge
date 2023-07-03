import Modal from 'react-modal';
import { useState, useEffect } from 'react';

export interface CharacterProps {
	birth_year: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	created: Date;
	edited: Date;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
	value: URL;
}

interface CharacterModalProps {
	character: CharacterProps | null;
	onClose: () => void;
	isOpen: boolean;
}


// Helper method to get name for some fields
const fetchNameFromUrl = async (url: string): Promise<string> => {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => data.name)
		.catch((error) => {
			console.error('Error fetching data:', error);
			return '';
		});
};

const fetchTitleFromUrl = async (url: string): Promise<string> => {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => data.title)
		.catch((error) => {
			console.error('Error fetching data:', error);
			return '';
		});
};

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose, isOpen }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [characterDetails, setCharacterDetails] = useState<CharacterProps | null>(null);
	const [isFilmsLoading, setIsFilmsLoading] = useState(true);
	const [isStarShipsLoading, setIsStarShipsLoading] = useState(true);
	const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);

	useEffect(() => {
		if (isOpen && character) {
			setIsLoading(true);
			setIsFilmsLoading(true);
			setIsStarShipsLoading(true);
			fetch(character.value)
				.then((response) => response.json())
				.then((data) => {
					setCharacterDetails(data);
					setIsLoading(false);
				});
		}


	}, [isOpen, character])


	/*
		  TODO: This could be optimized

		There are several options for optimizing this logic
		 - This API call could be proxied behind an API that gathers all of the data
		 - This could use a Provider pattern and optimize this logic client side
	 */
	useEffect(() => {
		const fetchDetails = async () => {
			if (characterDetails) {
				const films = await Promise.all(characterDetails.films.map(fetchTitleFromUrl));
				const starships = await Promise.all(characterDetails.starships.map(fetchNameFromUrl));
				const species = await Promise.all(characterDetails.species.map(fetchNameFromUrl));
				setCharacterDetails({ ...characterDetails, films, starships, species });
			}
		};

		if (!characterDetails || !isFilmsLoading || !isStarShipsLoading || !isSpeciesLoading) {
			return;
		} else {
			fetchDetails();
			setIsFilmsLoading(false);
			setIsStarShipsLoading(false);
			setIsSpeciesLoading(false);
		}

	}, [isStarShipsLoading, isFilmsLoading, characterDetails, isSpeciesLoading])


	// Set root element for modal
	const rootElement = document.getElementById('root');
	if (!rootElement) {
		throw new Error('Root element not found');
	}

	Modal.setAppElement(rootElement);


	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 text-black w-10/12"
			overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
		>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{characterDetails ? (
						<>
							<h2 className="text-2xl font-semibold mb-4">{characterDetails.name}</h2>
							<div>
								<h3 className="text-lg font-semibold mb-2">About</h3>
								<p>Height: {characterDetails.height}</p>
								<p>Weight: {characterDetails.mass}</p>
								<p>Hair Color: {characterDetails.hair_color}</p>
								<p>Date of Birth: {characterDetails.birth_year}</p>
								{isSpeciesLoading ? (
									<div>Loading...</div>
								) : (

									<p>Species: {characterDetails.species}</p>
								)}
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Films:</h3>
								{isFilmsLoading ? (
									<div>Loading...</div>
								) : (
									<div>
										{
											characterDetails.films.map((film) => (
												<p key={film}>{film}</p>
											))
										}
									</div>
								)}
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Starships</h3>
								{isStarShipsLoading ? (
									<div>Loading...</div>
								) : (
									<div>
										{characterDetails.starships.map((starship) => (
											<p key={starship}>{starship}</p>
										))}
									</div>
								)}
							</div>
							<button
								className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
								onClick={onClose}
							>
								Close
							</button>
						</>
					) : (
						<div>No character details available</div>
					)}
				</>
			)}
		</Modal>
	);
};

export default CharacterModal;
