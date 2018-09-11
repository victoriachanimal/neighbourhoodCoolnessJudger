import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import LibraryMarkers from "./LibraryMarkers";
import ConcertVenueMarkers from './ConcertVenueMarkers';

const GoogleMaps = withScriptjs(withGoogleMap((props) => {

  const libraryLocations = props.libraries.map((place) => {
    return <LibraryMarkers location={place.geometry.location} library={place}/>
  });
  
  let concertVenueLocations;

  if (Array.isArray(props.concerts)) {
    concertVenueLocations = props.concerts.map((venue) => {
      const location = venue._embedded.venues[0].location;
      return <ConcertVenueMarkers location={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}} concertVenue={venue}/>
    });
  }
  return (
    <GoogleMap defaultZoom={14} center={props.location}>
      <Marker position={props.location} />
      {libraryLocations}
      {concertVenueLocations}
    </GoogleMap>
    );
  }
  ))
  
  export default GoogleMaps;