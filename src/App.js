import React from 'react';
import CarPreview from './components/CarPreview';
import carPicture from './images/van2.jpg';

function App() {
	return (
		<CarPreview
			carName='Car Name'
			carDescription='Awesome car caption'
			carPicture={carPicture}
			carParts={[
				{
					description: 'Amazing detail about piece 1',
					name: 'Piece #1',
					x: '18%',
					y: '48%'
				},
				{
					description: 'Amazing detail about piece 2',
					name: 'Piece #2',
					x: '33.4%',
					y: '68%'
				},
				{
					description: 'Amazing detail about piece 3',
					name: 'Piece #3',
					x: '60%',
					y: '23%'
				},
				{
					description: 'Amazing detail about piece 4',
					name: 'Piece #4',
					x: '79.4%',
					y: '48%'
				}
			]}
		/>
	);
}

export default App;
