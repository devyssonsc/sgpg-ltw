import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { FuncAdminPanelComponent } from './pages/func-admin-panel/func-admin-panel.component';
import { FuncServPanelComponent } from './pages/func-serv-panel/func-serv-panel.component';
import { CostumerPanelComponent } from './pages/costumer-panel/costumer-panel.component';
import { OperatorPanelComponent } from './pages/operator-panel/operator-panel.component';
import { ManagerPanelComponent } from './pages/manager-panel/manager-panel.component';
import { LssComponent } from './components/lss/lss.component';

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
    },
    {
        path: "costumer-panel",
        component: CostumerPanelComponent
    },
    {
        path: "operator-panel",
        component: OperatorPanelComponent
    },
    {
        path: "manager-panel",
        component: ManagerPanelComponent
    },
    {
        path: "lss",
        component: LssComponent
    }
];
