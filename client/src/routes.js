import MyQs from "./page/MyQs"
import Profile from "./page/Profile"
import About from "./page/About"
import Find from "./page/Find"
import Queue from "./page/Queue"
import { ABOUT_ROUTE, CREATE_ROUTE, FIND_ROUTE, MYQS_ROUTE, PROFILE_ROUTE, QUEUE_ROUTE } from "./utils/consts"
import Create from "./page/Create"

export const authRoutes = [
    {
        path: MYQS_ROUTE,
        Component: MyQs
    },

    {
        path: PROFILE_ROUTE + '/:id',
        Component: Profile
    },
    {
        path: CREATE_ROUTE,
        Component: Create
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
        Component: Queue
    }
]