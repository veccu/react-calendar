import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'
import React from 'react'

import useCalendar from '../../../../src'
import { Container } from '../components/Container'

export default function Example() {
  const { cursorDate, headers, body, navigation, view } = useCalendar()

  return (
    <Container height="100vh">
      <Stack
        padding={12}
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={4}
      >
        <Heading as="h1" size="4xl" colorScheme="teal">
          react-calendar
        </Heading>
        <Text color="gray.500">
          Headless Calendar UI Library Example with Charkra UI
        </Text>
      </Stack>

      <Table variant="simple" size="lg">
        <TableCaption placement="top">
          <nav>
            <Flex justify="space-between" width="w.100">
              <Stack direction="row" gutter={4}>
                <Button
                  size="md"
                  onClick={view.showMonthView}
                  isActive={view.isMonthView}
                >
                  M
                </Button>
                <Button
                  size="md"
                  onClick={view.showWeekView}
                  isActive={view.isWeekView}
                >
                  W
                </Button>
                <Button
                  size="md"
                  onClick={view.showDayView}
                  isActive={view.isDayView}
                >
                  D
                </Button>
              </Stack>
              <Text fontSize="2xl">{format(cursorDate, 'yyyy. MM')}</Text>
              <Stack direction="row" gutter={8}>
                <IconButton
                  aria-label="prev-button"
                  icon={<ChevronLeftIcon />}
                  onClick={navigation.toPrev}
                />
                <Button
                  size="md"
                  colorScheme="teal"
                  onClick={navigation.setToday}
                >
                  TODAY
                </Button>
                <IconButton
                  aria-label="next-button"
                  icon={<ChevronRightIcon />}
                  onClick={navigation.toNext}
                />
              </Stack>
            </Flex>
          </nav>
        </TableCaption>
        <Thead>
          <Tr>
            {headers.weekDays.map(({ key, value }) => {
              return <Th key={key}>{format(value, 'E', { locale })}</Th>
            })}
          </Tr>
        </Thead>
        <Tbody>
          {body.value.map((week) => {
            const { key, value: days } = week

            return (
              <Tr key={key}>
                {days.map((day) => {
                  const { key, date, isCurrentDate, isCurrentMonth } = day

                  return (
                    <Td key={key} opacity={isCurrentMonth ? 1 : 0.2}>
                      {isCurrentDate ? (
                        <Text fontWeight="bold" color="teal.500">
                          {date}
                        </Text>
                      ) : (
                        date
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Container>
  )
}
