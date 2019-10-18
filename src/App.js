import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CarPreview from './components/CarPreview';
import { DOMAIN } from './constants';

function App({
	configuration
}) {
	const {contentKey, siteId = 49829 } = configuration.portletInstance;

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

		structuredContentByKey.relatedContents.forEach(structuredCarPart => {
			const carPart = {
				name: structuredCarPart.title
			};

			structuredCarPart.graphQLNode.contentFields.forEach(carPartField => {
				carPart[carPartField.label.toLowerCase()] = carPartField.value.data;
			});

			car.parts.push(carPart);
		})

		setCar(car);
	};

	const {loading} = contentKey && siteId && useQuery(
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
				contentKey: contentKey,
				siteId: siteId
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
					pointsColor={configuration.system.pointsColor}
				/>
			)}

			{!car && (!contentKey || !siteId) && (
				<div className="text-center">
					{Liferay.Language.get('please-configure-the-widget')}
				</div>
			)}

			{!loading && !car && contentKey && siteId && (
				<div className="text-center">
					{Liferay.Language.get('the-selected-content-key-does-not-exist')}
				</div>
			)}
		</React.Fragment>
	);
}

export default App;
