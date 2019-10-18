import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CarPreview from './components/CarPreview';
import { DOMAIN } from './constants';

function App() {
	const [car, setCar] = useState();

	const processContent = (data) => {
		const structuredContentByKey = data.structuredContentByKey;

		const car = {
			name: structuredContentByKey.title,
			parts: []
		};

		structuredContentByKey.contentFields.forEach(field => {
			car[field.label.toLowerCase()] = field.value.data || 
				(field.value.image && 
					`${DOMAIN}${field.value.image.contentUrl}`
				)
		});

		structuredContentByKey.relatedContents.map(structuredCarPart => {
			const carPart = {
				name: structuredCarPart.title
			};

			structuredCarPart.graphQLNode.contentFields.map(carPartField => {
				carPart[carPartField.label.toLowerCase()] = carPartField.value.data;
			});

			car.parts.push(carPart);
		})

		setCar(car);
	};

	useQuery(
		gql`
			query getCar($siteId: Long!, $contentKey: String!) {
				structuredContentByKey(key: $contentKey, siteId: $siteId) {
					title
					relatedContents {
						contentType
						id
						title
						graphQLNode {
							id
							... on StructuredContent {
								title
								contentFields {
									label
									value {
										data
									}
								}
							}
						}
					}
					contentStructureId
					contentFields {
						label
						value {
							data
							image {
								contentUrl
								encodingFormat
							}
						}
					}
				}
			}
		`,
		{
			onCompleted: data => { processContent(data)},
			variables: { 
				contentKey: '56697',
				siteId: 49829,
			},
		}
	);

	return (
		<React.Fragment>
			{car && (
				<CarPreview
					carName={car.name}
					carDescription={car.description}
					carPicture={car.image}
					carParts={car.parts}
				/>
			)}		
		</React.Fragment>
	);
}

export default App;
