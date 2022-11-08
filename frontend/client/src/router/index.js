import { createRouter, createWebHistory } from 'vue-router';
import ListPage from '../components/ListPage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'

const routes = [
    {
        path: "/",
        name: "List",
        component: ListPage
    },
    {
        path: "/list",
        name: "List2",
        component: ListPage
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage
    }
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})
export default router