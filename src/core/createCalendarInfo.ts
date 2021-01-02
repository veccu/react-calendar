import { getDay, getDaysInMonth, setDay, startOfMonth } from 'date-fns'

import { WeekDayType } from '../models'
import { arrayOf, parseDate } from '../utils'

export default function createCalendarInfo(
  cursorDate: Date,
  { weekStartsOn }: { weekStartsOn: WeekDayType },
) {
  const { year, month, day } = parseDate(cursorDate)
  const startWeekdayInMonth = getStartWeekdayInMonth(cursorDate, weekStartsOn)
  const weeksInMonth = getWeeksInMonth(cursorDate, weekStartsOn)
  const weekendDays = arrayOf(7).map((index) => ({
    value: setDay(cursorDate, (index + weekStartsOn) % 7),
  }))

  const getDateCellByIndex = (weekIndex: number, dayIndex: number) => {
    const day = weekIndex * 7 + dayIndex - startWeekdayInMonth + 1

    return { value: new Date(year, month, day) }
  }

  return {
    cursorDate,
    year,
    month,
    day,
    weekStartsOn,
    startWeekdayInMonth,
    weeksInMonth,
    weekendDays,
    today: {
      weekIndex: getCurrentWeekIndex(day, startWeekdayInMonth),
      dateIndex: getDay(cursorDate),
    },
    getDateCellByIndex,
  }
}

function getStartWeekdayInMonth(date: Date, weekStartsOn: WeekDayType) {
  const monthStartsAt = (startOfMonth(date).getDay() - weekStartsOn) % 7

  return monthStartsAt < 0 ? monthStartsAt + 7 : monthStartsAt
}

function getWeeksInMonth(date: Date, weekStartsOn: WeekDayType) {
  const { month } = parseDate(date)
  const totalDaysOfMonth = getDaysInMonth(month)

  return Math.ceil((weekStartsOn + totalDaysOfMonth) / 7)
}

function getCurrentWeekIndex(day: number, startWeekdayInMonth: number) {
  const control = (day - 1) % 7 > startWeekdayInMonth ? 0 : -1

  return Math.ceil(day / 7) + control
}