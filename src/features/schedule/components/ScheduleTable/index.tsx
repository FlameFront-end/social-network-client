import type React from 'react'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { StyledScheduleTableWrapper } from './ScheduleTable.styled.tsx'

const scheduleData: Collections.ScheduleData = {
    monday: [
        { title: 'Математика', teacher: 'Иванов И.И.', cabinet: '24' },
        { title: 'Русский', teacher: 'Петрова А.А.', cabinet: '25' },
        { title: 'Английский', teacher: 'Смирнов А.А.', cabinet: '26' },
        { title: 'История', teacher: 'Васильев В.В.', cabinet: '27' }
    ],
    tuesday: [
        { title: 'Физика', teacher: 'Сидоров В.В.', cabinet: '14' },
        { title: 'Химия', teacher: 'Кузнецова Е.В.', cabinet: '15' },
        { title: 'Биология', teacher: 'Михайлова О.О.', cabinet: '16' },
        { title: 'География', teacher: 'Романов Р.Р.', cabinet: '17' }
    ],
    wednesday: [
        { title: 'Информатика', teacher: 'Ковалев Д.Д.', cabinet: '18' },
        { title: 'Физкультура', teacher: 'Попова Н.Н.', cabinet: 'спортзал' },
        { title: 'Литература', teacher: 'Тихонов А.А.', cabinet: '19' },
        { title: 'Обществознание', teacher: 'Никитина В.В.', cabinet: '20' }
    ],
    thursday: [
        { title: 'Алгебра', teacher: 'Иванова М.М.', cabinet: '21' },
        { title: 'Геометрия', teacher: 'Смирнова Е.А.', cabinet: '22' },
        { title: 'Физика', teacher: 'Сидоров В.В.', cabinet: '14' },
        { title: 'Химия', teacher: 'Кузнецова Е.В.', cabinet: '15' }
    ],
    friday: [
        { title: 'История', teacher: 'Васильев В.В.', cabinet: '27' },
        { title: 'Английский', teacher: 'Смирнов А.А.', cabinet: '26' },
        { title: 'Биология', teacher: 'Михайлова О.О.', cabinet: '16' },
        { title: 'Физкультура', teacher: 'Попова Н.Н.', cabinet: 'спортзал' }
    ]
}

const timeSlots = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:59', '13:00 - 14:30']

const daysOfWeek = [
    { en: 'monday', ru: 'Понедельник' },
    { en: 'tuesday', ru: 'Вторник' },
    { en: 'wednesday', ru: 'Среда' },
    { en: 'thursday', ru: 'Четверг' },
    { en: 'friday', ru: 'Пятница' }
]

const ScheduleTable: React.FC = () => {
    const [currentCell, setCurrentCell] = useState<{ day: string, time: string } | null>(null)
    const [currentDay, setCurrentDay] = useState<string>('')

    const tableData = timeSlots.map((time, index) => {
        const row: Collections.ScheduleItem = { index: index + 1, time }
        daysOfWeek.forEach(({ en }) => {
            row[en] = scheduleData[en]?.[index] ? [scheduleData[en][index]] : undefined
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
                        <div>Учитель: {lesson.teacher}</div>
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
