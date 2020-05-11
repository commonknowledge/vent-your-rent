/** @jsx jsx */
import { jsx, Text, Box } from 'theme-ui';
import { VentCard2020 } from './__graphql__/VentCard2020';
import { useRef, useEffect, useMemo, useState, useReducer, Fragment, memo } from 'react';
import MapGL, { Marker } from 'react-map-gl'
import gql from 'graphql-tag';
import { VentMapItemFragment } from './__graphql__/VentMapItemFragment';
import { useQuery } from '@apollo/react-hooks';
import { VentMapQuery } from './__graphql__/VentMapQuery';

export const VentMap: React.FC = () => {
  const [viewport, setViewport] = useState({
    zoom: 5.39,
    longitude: -3.478498,
    latitude: 54.337021
  })
  const vents = useQuery<VentMapQuery>(VENTMAP_QUERY)

  return (
    <MapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      width="100%"
      height="100%"
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {vents.data?.vents?.length && (
        <VentMapItems vents={vents.data?.vents} />
      )}
    </MapGL>
  )
}

export const VentMapItems: React.FC<{ vents?: VentMapItemFragment[] }> = memo(({ vents }) => {
  return (
    <Fragment>
      {vents?.filter(vent => vent.geo).map(vent => (
        <VentMapItem key={vent.id} vent={vent} />
      ))}
    </Fragment>
  )
})

export const VentMapItem: React.FC<{ vent: VentMapItemFragment }> = ({ vent }) => {
  if (!vent.geo) return null
  return (
    <Marker longitude={vent.geo?.longitude} latitude={vent.geo?.latitude}>
      <Box sx={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <Text sx={{ fontSize: 2 }}>🏚</Text>
      </Box>
    </Marker>
  )
}

// @ts-ignore
VentMapItem.fragment = gql`
  fragment VentMapItemFragment on VentType {
    id
    geo {
      latitude
      longitude
    }
  }
`

const VENTMAP_QUERY = gql`
  query VentMapQuery {
    vents(quantity: 10000) {
      ...VentMapItemFragment
    }
  }

  ${(VentMapItem as any).fragment}
`
