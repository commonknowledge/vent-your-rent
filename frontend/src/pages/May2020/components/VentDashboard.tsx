/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import { Fragment, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { VentDashboardQuery_vents, VentDashboardQuery } from './__graphql__/VentDashboardQuery';
import useLocalStorage from '@rehooks/local-storage'
import { useSpring, animated } from 'react-spring';
import { Emoji } from 'emoji-mart';
import Truncate from 'react-truncate';

const COUNT_QUERY = gql`
  query CountQuery {
    ventsCount
  }
`

const useVentCount = () => {
  const [count, setCount] = useState(0)
  const countQuery = useQuery(COUNT_QUERY)
  useEffect(() => {
    if (countQuery.data?.ventsCount) {
      setCount(countQuery.data?.ventsCount)
    }
    const interval = setInterval(() => {
      countQuery.refetch()
    }, 5000)

    return () => clearInterval(interval)
  }, [countQuery.data, setCount])
  return count
}

export const VentCounter: React.FC = () => {
  const count = useVentCount()
  const [{ count: animatedCount }] = useSpring({ count }, [count]);

  return (
    <Heading>
      <animated.span sx={{ color: 'orange' }}>
        {animatedCount.interpolate(n => Math.floor(n))}
      </animated.span>
      &nbsp;rent vents
      <br />(and counting!)
    </Heading>
  )
}

export const VentDashboard: React.FC = () => {
  const [ventIds] = useLocalStorage<number[]>('VENT_YOUR_RENT_VENT_IDS', [])
  const { loading, data, refetch } = useQuery<VentDashboardQuery>(GET_VENTS, {
    variables: { quantity: 10, ventIds }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 5000)
    return () => clearInterval(interval)
  }, [refetch])

  return (
    <Flex sx={{ flexDirection: ['row', 'row', 'column'], width: [`calc(${data?.vents?.length} * min(300px, 100vw))`, null, 'auto'] }}>
      {data?.vents ? (
        <Fragment>
          {data.vents.map((vent) => {
            return (
              <Box key={vent.id} sx={{ my: 3, width: ['calc(100vw - 30px)', 300, '100%'], maxWidth: ['100vw', '100vw', '100%'], mr: 3 }}>
                <VentCard vent={vent} />
              </Box>
            )
          })}
        </Fragment>
      ) : "Loading"}
    </Flex>
  )
}

export const VentCard: React.FC<{ vent: VentDashboardQuery_vents, sx?: any }> = ({ vent, ...props }) => {
  return (
    <Box sx={{ color: 'text' }}>
      <Box sx={{
        bg: 'white',
        boxShadow: '0px 0px 20px rgba(53, 53, 53, 0.1)',
        borderRadius: '6px',
        py: 3,
        px: 3,
        // transition: 'all 0.2s ease',
        // ':hover': { transform: 'scale(1.05)' }
      }} {...props}>
        <Text sx={{ mb: 3 }}>
          <Truncate lines={5}>
            {vent.caption}
          </Truncate>
        </Text>
        <Flex sx={{ textTransform: 'uppercase', fontSize: 0, alignItems: 'flex-end' }}>
          <Box sx={{ fontSize: 2, lineHeight: 1, flexShrink: 0 }}>
            {vent.emoji ? <Emoji emoji={vent.emoji} set='apple' size={24} /> : '🏚'}
          </Box>
          <Box sx={{ px: 2 }}>
            <Text sx={{ fontWeight: 'emphasis' }}>{vent.firstName}</Text>
            <Text sx={{ fontSize: 0, color: 'textLight' }}>{vent?.location?.name}</Text>
          </Box>
          {/* <Box sx={{ ml: 'auto', flexShrink: 0, color: 'orange' }}>Read more</Box> */}
        </Flex>
      </Box>
    </Box>
  )
}

// @ts-ignore
VentCard.fragment = gql`
  fragment VentCard2020 on VentType {
    id
    firstName
    image
    caption
    emoji
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
