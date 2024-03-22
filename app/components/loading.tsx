"use Client"
import "../globals.css";

export  const  LoadingComponent: React.FC = () => {
	return (
		<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
			<div className="loader">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
};