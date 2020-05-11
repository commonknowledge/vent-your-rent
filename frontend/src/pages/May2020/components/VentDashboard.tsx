/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { VentDashboardQuery_vents, VentDashboardQuery } from './__graphql__/VentDashboardQuery';
import useLocalStorage from '@rehooks/local-storage'

export const VentCounter: React.FC = () => {
  return (
    <Heading>
      <span sx={{ color: 'orange' }}>357</span> rent vents
      <br />(and counting!)
    </Heading>
  )
}

export const VentDashboard: React.FC = () => {
  const [ventIds] = useLocalStorage<number[]>('VENT_YOUR_RENT_VENT_IDS', [])
  const { loading, data } = useQuery<VentDashboardQuery>(GET_VENTS, {
    variables: { quantity: 10, ventIds }
  });

  return (
    <Box sx={{ my: 4 }}>
      {data?.vents ? <VentCardList vents={data?.vents} /> : "Loading"}
    </Box>
  )
}

export const VentCardList: React.FC<{ vents: VentDashboardQuery_vents[] }> = ({ vents }) => {
  return (
    <Fragment>
      {vents.map((vent, i) => {
        return (
          <Box key={i} sx={{ my: 3 }}>
            <VentCard vent={vent} />
          </Box>
        )
      })}
    </Fragment>
  )
}

export const VentCard: React.FC<{ vent: VentDashboardQuery_vents }> = ({ vent }) => {
  return (
    <Link to={`/vent/${vent.id}`} sx={{ color: 'text' }}>
      {vent.id}
      <Box sx={{
        bg: 'white',
        boxShadow: '0px 0px 20px rgba(53, 53, 53, 0.1)',
        borderRadius: '6px',
        py: 3,
        px: 3,
        transition: 'all 0.2s ease',
        ':hover': { transform: 'scale(1.05)' }
      }}>
        <Text sx={{ mb: 3 }}>
          {vent.caption}
        </Text>
        <Flex sx={{ textTransform: 'uppercase', fontSize: 0, alignItems: 'flex-end' }}>
          <Box sx={{ fontSize: 2, lineHeight: 1, flexShrink: 0 }}>👩🏽</Box>
          <Box sx={{ px: 2 }}>
            <Text sx={{ fontWeight: 'emphasis' }}>{vent.firstName}</Text>
            <Text sx={{ fontSize: 0, color: 'textLight' }}>{vent?.location?.name}</Text>
          </Box>
          <Link sx={{ ml: 'auto', flexShrink: 0 }} to={`/vent/${vent.id}`}>Read more</Link>
        </Flex>
      </Box>
    </Link>
  )
}

// @ts-ignore
VentCard.fragment = gql`
  fragment VentCard2020 on VentType {
    id
    firstName
    image
    caption
    location: geo {
      name: parliamentaryConstituency
    }
    dateCreated
  }
`;

export const GET_VENTS = gql`
  ${(VentCard as any).fragment}

  query VentDashboardQuery($quantity: Int!, $ventIds: [Int!]) {
    vents(quantity: $quantity, ventIds: $ventIds) {
      ...VentCard2020
    }
  }
`;
