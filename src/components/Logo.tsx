interface LogoProps {
	width?: number;
	height?: number;
	className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100, className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={width}
			height={height}
			viewBox="0 0 50 50"
			className={className}>
			<path fill="#FFFFFF" d="M 21.5 8 C 14.057 8 8 14.057 8 21.5 C 8 28.943 14.057 35 21.5 35 C 24.789065 35 27.805703 33.816017 30.150391 31.853516 C 30.435292 32.138417 39.711913 41.416007 39.943359 41.648438 C 40.413359 42.118437 41.176484 42.118437 41.646484 41.648438 C 42.116484 41.178438 42.116484 40.415312 41.646484 39.945312 C 41.415038 39.712882 32.138417 30.435292 31.853516 30.150391 C 33.816017 27.805703 35 24.789065 35 21.5 C 35 14.057 28.943 8 21.5 8 z M 21.5 9 C 28.392 9 34 14.608 34 21.5 C 34 28.392 28.392 34 21.5 34 C 14.608 34 9 28.392 9 21.5 C 9 14.608 14.608 9 21.5 9 z"></path>
		</svg>);
};

export default Logo;

