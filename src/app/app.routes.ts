import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { FuncAdminPanelComponent } from './pages/func-admin-panel/func-admin-panel.component';
import { FuncServPanelComponent } from './pages/func-serv-panel/func-serv-panel.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "admin-panel",
        component: AdminPanelComponent
    },
    {
        path: "func-admin-panel",
        component: FuncAdminPanelComponent
    },
    {
        path: "func-serv-panel",
        component: FuncServPanelComponent
    }
];
