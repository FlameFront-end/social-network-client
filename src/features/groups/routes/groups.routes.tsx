import GroupList from '../pages/GroupList'
import Group from '../pages/Group'
import { groupsPaths } from './groups.paths.ts'

export const groupsRoutes = [
    {
        path: groupsPaths.group_list,
        element: <GroupList/>
    },
    {
        path: groupsPaths.group,
        element: <Group/>
    }
]
