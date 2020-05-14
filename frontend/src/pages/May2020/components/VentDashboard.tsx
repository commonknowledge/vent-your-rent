/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { VentDashboardQuery_vents, VentDashboardQuery } from './__graphql__/VentDashboardQuery';
import useLocalStorage from '@rehooks/local-storage'
import { useSpring, animated, useTransition } from 'react-spring';
import { Emoji } from 'emoji-mart';
import Truncate from 'react-truncate';
import { useAnalytics } from '../../../analytics/browser';
import { useResponsiveValue } from '@theme-ui/match-media'

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
    </Heading>
  )
}

const NEW_VENT_MILLISECONDS = 3500

export const VentDashboard: React.FC = () => {
  const [ventIds] = useLocalStorage<number[]>('VENT_YOUR_RENT_VENT_IDS', [])
  const [quantity, setQuantity] = useState(1)
  const nextIndex = useRef<number>(0)
  const [vents, setVents] = useState<VentDashboardQuery_vents[]>([])
  const [isHovering, setHovering] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovering) return
      setQuantity(q => q + 1)
    }, NEW_VENT_MILLISECONDS)
    return () => clearInterval(interval)
  }, [isHovering, setQuantity])

  const { data, refetch } = useQuery<VentDashboardQuery>(GET_VENTS, {
    variables: { quantity: 50, ventIds }
  });

  useEffect(() => {
    setVents(vents => {
      const nextVent = data?.vents[nextIndex.current]
      if (!nextVent) return vents
      return vents.concat(nextVent)
    })
    nextIndex.current = nextIndex.current + 1
  }, [data, quantity])

  const direction = useResponsiveValue(['Left', 'Left', 'Top'])

  const transition = useTransition(vents?.slice().reverse(), {
    keys: (vent: { id?: string }) => vent?.id,
    from: {
      opacity: 0,
      offset: -10
    },
    enter: {
      opacity: 1,
      offset: 0
    }
  })

  const fragment = transition(({ opacity, offset }, vent) => {
    // 3. Render each item
    return vent ? (
      <animated.div style={{ opacity, [`margin${direction}`]: offset.interpolate(offset => `${offset}px`) }}>
        <Box sx={{ my: 2, width: ['calc(100vw - 30px)', 300, '100%'], maxWidth: ['100vw', '100vw', '100%'], mr: 3 }}>
          <VentCard vent={vent} />
        </Box>
      </animated.div>
    ) : null
  })

  return (
    <Flex
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      sx={{
        pt: 2,
        flexDirection: ['row', 'row', 'column'],
        width: [`calc(${vents?.length} * min(300px, 100vw))`, null, 'auto']
      }}>
      {fragment}
    </Flex>
  )
}

export const VentCard: React.FC<{ vent: VentDashboardQuery_vents, sx?: any }> = ({ vent, ...props }) => {
  const [truncate, setTruncate] = useState(true)

  const analytics = useAnalytics()

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
          {truncate ? (
            <Truncate lines={truncate ? 5 : 100}>
              {vent.caption}
            </Truncate>
          ) : (
              <Fragment>
                {vent.caption.split(/[\r\n\r]+/).map((p, i) => (
                  <p key={i} sx={{ '&:first-child': { mt: 0 } }}>{p}</p>
                ))}
              </Fragment>
            )}
        </Text>
        <Flex sx={{ textTransform: 'uppercase', fontSize: 0, alignItems: 'flex-end' }}>
          <Box sx={{ fontSize: 2, lineHeight: 1, flexShrink: 0 }}>
            <Emoji emoji={vent.emoji || 'derelict_house_building'} set='apple' size={24} />
          </Box>
          <Box sx={{ px: 2 }}>
            <Text sx={{ fontWeight: 'emphasis' }}>{vent.firstName}</Text>
            <Text sx={{ fontSize: 0, color: 'textLight' }}>{vent?.location?.name}</Text>
          </Box>
          <Box sx={{ ml: 'auto', flexShrink: 0, color: 'orange', cursor: 'pointer' }} onClick={() => {
            analytics.trackEvent(truncate ? 'expandVent' : 'collapseVent', {
              'category': 'vents',
              'label': 'User clicked on the vent card',
              'value': vent.id
            });
            setTruncate(t => !t)
          }}>
            {truncate ? 'Read more' : 'Read less'}
          </Box>
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
