import MyQs from "./page/MyQs"
import Profile from "./page/Profile"
import About from "./page/About"
import Find from "./page/Find"
import { ABOUT_ROUTE, FIND_ROUTE, MYQS_ROUTE, PROFILE_ROUTE, QUEUE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: MYQS_ROUTE,
        Component: MyQs
    },

    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: FIND_ROUTE,
        Component: Find
    },
    {
        path: QUEUE_ROUTE + '/:id',
        Component: Find
    }
]