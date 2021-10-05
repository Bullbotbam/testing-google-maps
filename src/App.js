import React from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

// import usePlacesAutocomplete, {
// 	getGeoocde,
// 	getLatlng,
// } from 'use-places-autocomplete';
// import {
// 	Combobox,
// 	ComboboxInput,
// 	ComboboxPopover,
// 	ComboboxList,
// 	ComboboxOption,
// } from '@reach/combobox';
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
	width: '100vw',
	height: '100vh',
};
const center = {
	lat: 30.267153,
	lng: -97.743057,
};

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
};

function Map() {
	return (
		<GoogleMap
			defaultZoom={10}
			defaultCenter={{ lat: 30.267153, lng: -97.743057 }}
		/>
	);
}

export default function App() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	const [markers, setMarkers] = React.useState([]);

	if (loadError) return 'Error loading Maps';
	if (!isLoaded) return 'Loading Maps';

	return (
		<div>
			<h1>
				FarmGo
				<span role="img" aria-label="leaf">
					🌿
				</span>
			</h1>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={10}
				center={center}
				options={options}
				onClick={(event) => {
					setMarkers((current) => [
						...current,
						{
							lat: event.latLng.lat(),
							lng: event.latLng.lng(),
							time: new Date(),
						},
					]);
				}}
			>
				{markers.map((marker) => (
					<Marker
						key={marker.time.toISOString()}
						position={{ lat: marker.lat, lng: marker.lng }}
						icon={{
							url: '/leaf.svg',
						}}
					/>
				))}
			</GoogleMap>
		</div>
	);
}
