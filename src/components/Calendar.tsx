import { useMemo, useState } from 'react'
import {
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	eachDayOfInterval,
	isSameMonth,
	isBefore,
	endOfDay,
	isToday,
	subMonths,
	addMonths,
} from 'date-fns'
import { formatDate } from '../utils/formatDate'
import { cc } from '../utils/cc'

export function Calendar() {
	const [selectedMonth, setSelectedMonth] = useState(new Date())

	const calendarDays = useMemo(() => {
		const firstWeekStart = startOfWeek(startOfMonth(selectedMonth), {
			weekStartsOn: 1,
		})
		const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth), {
			weekStartsOn: 1,
		})
		return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
	}, [selectedMonth])

	// console.log(firstWeekStart,' - ', lastWeekEnd);
	// console.log(calendarDays)

	return (
		<div className='calendar'>
			<div className='header'>
				<button
					className='btn'
					onClick={() => setSelectedMonth(new Date())}>
					Today
				</button>
				<div>
					<button
						className='month-change-btn'
						onClick={() => setSelectedMonth(m => subMonths(m, 1))}>
						&lt;
					</button>
					<button
						className='month-change-btn'
						onClick={() => setSelectedMonth(m => addMonths(m, 1))}>
						&gt;
					</button>
				</div>
				<span className='month-title'>{formatDate(selectedMonth, {month: 'long', year: 'numeric'})}</span>
			</div>
			<div className='days'>
				{calendarDays.map((day, index) => (
					<CalendarDay
						key={day.getTime()}
						day={day}
						showWeekName={index < 7 ? true : false}
						selectedMonth={selectedMonth}
					/>
				))}
			</div>
		</div>
	)
}

type CalendarDayProps = {
	day: Date
	showWeekName: boolean
	selectedMonth: Date
}

function CalendarDay({ day, showWeekName, selectedMonth }: CalendarDayProps) {
	return (
		<div
			className={cc(
				'day',
				!isSameMonth(day, selectedMonth) && 'non-month-day',
				isBefore(endOfDay(day), new Date()) && 'old-month-day'
			)}>
			<div className='day-header'>
				{showWeekName && (
					<div className='week-name'>
						{formatDate(day, { weekday: 'short' })}
					</div>
				)}
				<div className={cc('day-number', isToday(day) && 'today')}>
					{formatDate(day, { day: 'numeric' })}
				</div>
				<button className='add-event-btn'>+</button>
			</div>
			{/* <div className='events'>
				<button className='all-day-event blue event'>
					<div className='event-name'>Short</div>
				</button>
				<button className='all-day-event green event'>
					<div className='event-name'>
						Long Event Name That Just Keeps Going
					</div>
				</button>
				<button className='event'>
					<div className='color-dot blue'></div>
					<div className='event-time'>7am</div>
					<div className='event-name'>Event Name</div>
				</button>
			</div> */}
		</div>
	)
}
