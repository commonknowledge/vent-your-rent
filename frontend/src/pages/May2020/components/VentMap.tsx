/** @jsx jsx */
import { jsx, Text, Box } from 'theme-ui';
import { VentCard2020 } from './__graphql__/VentCard2020';
import { useRef, useEffect, useMemo, useState, useReducer, Fragment, memo } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl'
import gql from 'graphql-tag';
import { VentMapItemFragment } from './__graphql__/VentMapItemFragment';
import { useQuery } from '@apollo/react-hooks';
import { VentMapQuery } from './__graphql__/VentMapQuery';
import { Emoji } from 'emoji-mart'
import { VentCard } from './VentDashboard';
import { sample } from 'lodash';

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

export const VentMapItems: React.FC<{ vents: VentMapItemFragment[] }> = memo(({ vents }) => {
  const [currentId, setCurrentId] = useState<string>()
  const [cycle, setCycle] = useState(true)

  const acceptableVents = useMemo(() => vents.filter(v => v.isPublished), [vents])

  useEffect(() => {
    setCurrentId(sample(acceptableVents)?.id)

    const interval = setInterval(() => {
      if (!cycle) return
      setCurrentId(sample(acceptableVents)?.id)
    }, 5000)

    return () => clearInterval(interval)
  }, [vents, setCurrentId, cycle])

  const highlightedVent = useMemo(() => vents.find(v => v.id === currentId), [currentId])

  return (
    <Fragment>
      {vents.filter(vent => vent.geo).map(vent => (
        <VentMapItem key={vent.id} vent={vent} onClick={(id) => {
          setCurrentId(id)
          setCycle(false)
        }} />
      ))}
      {!!highlightedVent && (
        <VentMapPopup vent={highlightedVent} onClose={() => {
          setCurrentId(undefined)
          setCycle(false)
        }} />
      )}
    </Fragment>
  )
})

export const VentMapItem: React.FC<{ vent: VentMapItemFragment, onClick?: (id: string) => void }> = ({ vent, onClick }) => {
  if (!vent.geo) return null
  return (
    <Marker longitude={vent.geo?.longitude} latitude={vent.geo?.latitude}>
      <Box sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', cursor: onClick ? 'pointer' : 'initial' }}
        onMouseOver={onClick ? () => onClick(vent.id) : undefined}
        onClick={onClick ? () => onClick(vent.id) : undefined}
      >
        <Text sx={{ fontSize: 2 }}>
          {vent.emoji ? <Emoji emoji={vent.emoji} set='apple' size={24} /> : '🏚'}
        </Text>
      </Box>
    </Marker>
  )
}

export const VentMapPopup: React.FC<{ vent: VentMapItemFragment, onClose?: () => void }> = ({ vent, onClose }) => {
  if (!vent.geo) return null
  return (
    <Popup closeOnClick={false} onClose={onClose} longitude={vent.geo?.longitude} latitude={vent.geo?.latitude} offsetTop={-20} sx={{
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      '.mapboxgl-popup-close-button': {
        top: 15,
        right: 15,
      },
      '.mapboxgl-popup-content': {
        padding: 0,
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        width: 300
      }
    }}>
      <VentCard key={vent.id} vent={vent} />
    </Popup>
  )
}

// @ts-ignore
VentMapItem.fragment = gql`
  fragment VentMapItemFragment on VentType {
    id
    emoji
    isPublished
    geo {
      latitude
      longitude
    }
    ...VentCard2020
  }

  ${(VentCard as any).fragment}
`

const VENTMAP_QUERY = gql`
  query VentMapQuery {
    vents(quantity: 1000) {
      ...VentMapItemFragment
    }
  }

  ${(VentMapItem as any).fragment}
`
