import type React from 'react'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { StyledScheduleTableWrapper } from './ScheduleTable.styled.tsx'

const timeSlots = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:59', '13:00 - 14:30']

const daysOfWeek = [
    { en: 'monday', ru: 'Понедельник' },
    { en: 'tuesday', ru: 'Вторник' },
    { en: 'wednesday', ru: 'Среда' },
    { en: 'thursday', ru: 'Четверг' },
    { en: 'friday', ru: 'Пятница' }
]

interface Props {
    schedule: Collections.Schedule
}

const ScheduleTable: React.FC<Props> = ({ schedule }) => {
    const [currentCell, setCurrentCell] = useState<{ day: string, time: string } | null>(null)
    const [currentDay, setCurrentDay] = useState<string>('')

    const tableData = timeSlots.map((time, index) => {
        const row: Collections.ScheduleItem = { index: index + 1, time }
        daysOfWeek.forEach(({ en }) => {
            // @ts-expect-error
            row[en] = schedule[en]?.[index] ? [schedule[en][index]] : undefined
        })
        return row
    })

    const columns: ColumnsType<Collections.ScheduleItem> = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            align: 'center'
        },
        {
            title: 'Время',
            dataIndex: 'time',
            key: 'time',
            fixed: 'left'
        },
        ...daysOfWeek.map(({ en, ru }) => ({
            title: ru,
            dataIndex: en,
            key: en,
            onCell: (record: Collections.ScheduleItem) => ({
                className: currentCell?.day === en && currentCell?.time === record.time ? 'highlight-cell' : ''
            }),
            render: (lessons: Collections.Lesson[] | undefined) => (
                lessons?.map((lesson, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                        <strong>{lesson.title}</strong>
                        <div>Учитель: {lesson.teacher.name}</div>
                        <div>Кабинет: {lesson.cabinet}</div>
                    </div>
                )) ?? ''
            ),
            className: currentDay === en ? 'current-day-column' : ''
        }))
    ]

    useEffect(() => {
        const checkCurrentClass = (): void => {
            const now = dayjs()
            const day = now.format('dddd').toLowerCase()
            setCurrentDay(day)

            const currentTime = now.format('HH:mm')
            const currentClass = timeSlots.find((time) => {
                const [start, end] = time.split(' - ')
                return (
                    dayjs(currentTime, 'HH:mm').isAfter(dayjs(start, 'HH:mm')) &&
                    dayjs(currentTime, 'HH:mm').isBefore(dayjs(end, 'HH:mm'))
                )
            })

            setCurrentCell(currentClass ? { day, time: currentClass } : null)
        }

        checkCurrentClass()
        const interval = setInterval(checkCurrentClass, 60000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <StyledScheduleTableWrapper>
            <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                bordered
                rowKey="time"
            />
        </StyledScheduleTableWrapper>
    )
}

export default ScheduleTable
