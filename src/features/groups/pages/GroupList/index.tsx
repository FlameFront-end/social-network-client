import { type FC, useState } from 'react'
import { Button, Collapse, Typography } from 'antd'
import ScheduleTable from '../../../schedule/components/ScheduleTable'
import { Link } from 'react-router-dom'
import { pathsConfig } from '@/pathsConfig'
import { StyledGroupListWrapper } from './GroupList.styled.tsx'

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

const groups: Collections.Group[] = [
    {
        id: '1',
        name: '3ИСИП3',
        schedule: scheduleData
    },
    {
        id: '4',
        name: '1ИСИП3',
        schedule: scheduleData
    },
    {
        id: '2',
        name: '1СИСАД1',
        schedule: scheduleData
    },
    {
        id: '3',
        name: '2ИСИТ1',
        schedule: scheduleData
    }
]

const AdminDashboard: FC = () => {
    const [activeKeys, setActiveKeys] = useState<string[]>([])

    const groupByCourse = (groups: Collections.Group[]): Collections.GroupedCourses => {
        const courseMap: Record<string, Collections.Group[]> = {}

        groups.forEach((group) => {
            const course = group.name[0]
            if (!courseMap[course]) {
                courseMap[course] = []
            }
            courseMap[course].push(group)
        })

        return Object.entries(courseMap).sort(
            ([courseA], [courseB]) => Number(courseA) - Number(courseB)
        )
    }

    const groupedCourses: Collections.GroupedCourses = groupByCourse(groups)

    const handleCollapseChange = (keys: string | string[]): void => {
        setActiveKeys(typeof keys === 'string' ? [keys] : keys)
    }

    return (
        <StyledGroupListWrapper>
            <div className="top-row">
                <Typography.Title level={2}>Все группы</Typography.Title>
                <Button>Создать группу</Button>
            </div>
            <div className='group-list'>
                {groupedCourses.map(([course, courseGroups]) => (
                    <div key={course}>
                        <h3 className='course-title'>{course} Курс</h3>
                        <Collapse
                            className='styled-collapse'
                            accordion
                            activeKey={activeKeys}
                            onChange={handleCollapseChange}
                        >
                            {courseGroups.map((group) => (
                                <Collapse.Panel header={group.name} key={group.id}>
                                    <div className='collapse-top'>
                                        <div className='left'>
                                            <div>Классный руководитель: ФИО</div>
                                            <div>Расписание</div>
                                        </div>
                                        <Link to={pathsConfig.group} state={{ id: group.id }}>
                                            Страница группы
                                        </Link>
                                    </div>
                                    <ScheduleTable/>
                                </Collapse.Panel>
                            ))}
                        </Collapse>
                    </div>
                ))}
            </div>
        </StyledGroupListWrapper>
    )
}

export default AdminDashboard
