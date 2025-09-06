import { Routes } from '@angular/router';
import { PublicLayout } from './modules/public/layout/public-layout/public-layout';
import { HomePage } from './modules/public/pages/home-page/home-page';

export const routes: Routes = [{
    path: '',component: PublicLayout,
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path:'home',component: HomePage},
    ]
}];
