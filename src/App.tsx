import { useEffect } from 'react';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';


function App() {

	// This star background was from 
	// https://tailwindcomponents.com/component/landing-page-with-twinkling-stars
	// I just had to modify the jquery function to React
	useEffect(() => {
		for (let i = 0; i < 100; i++) {
			const star = document.createElement('div');
			star.className = 'star m-0';
			star.style.animation = `twinkle ${Math.random() * 5 + 5}s linear ${Math.random() * 1 + 1
				}s infinite`;
			star.style.top = `${Math.random() * window.innerHeight}px`;
			star.style.left = `${Math.random() * window.innerWidth}px`;
			const homescreenElement = document.querySelector('.homescreen');
			if (homescreenElement) {
				homescreenElement.appendChild(star);
			}
		}
	}, []);

	return (
		<div className='flex justify-center items-center h-screen flex-col homescreen'>
			<div className="max-w-lg w-full mx-4 flex flex-col items-center">
				<Logo width={100} height={100} className='flex justify-center items-center mx-auto mb-4' />
				<h1 className="text-3xl font-normal leading-normal mb-6 text-white text-center">
					StarWars Character Search
				</h1>
				<SearchBar />
			</div>
		</div>
	);
}

export default App;
