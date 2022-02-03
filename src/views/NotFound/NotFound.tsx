import * as React from 'react';

const NotFound: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="shadow-2xl p-10 bg-white rounded-lg w-1/2">
				<p className="text-5xl text-center">
					Parece que você está perdido. Está pagina não existe!
				</p>
			</div>
		</div>
	);
};

export default NotFound;
