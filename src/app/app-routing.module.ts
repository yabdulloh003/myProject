import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './loading/loading.module#LoadingPageModule' },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'project-add', loadChildren: './project-add/project-add.module#ProjectAddPageModule' },
    { path: 'project-edit/:project_id', loadChildren: './project-edit/project-edit.module#ProjectEditPageModule' },
    { path: 'project-detail/:project_id', loadChildren: './project-detail/project-detail.module#ProjectDetailPageModule' },
    { path: 'set-api', loadChildren: './set-api/set-api.module#SetApiPageModule' },
    { path: 'loading', loadChildren: './loading/loading.module#LoadingPageModule' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
