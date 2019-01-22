import './styles.css';
import './views/todo-view.js';
import {
    Router
} from '@vaadin/router'

window.addEventListener('load', () => {
    initRouter()
})

const initRouter = () => {
    const router = new Router(document.querySelector('main'))
    router.setRoutes([{
            path: '/',
            component: 'todo-view'
        },
        {
            path: '/stats',
            component: 'stats-view',
            action: () => import( /* webpack chunk name: 'stats' */ './views/stats-view')
        },
        {
            path: '(.*)',
            component: 'not-found-view',
            action: () => import( /* webpack chunk name: 'not-found-view' */ './views/not-found-view')
        }
    ])
}