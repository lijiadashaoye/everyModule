import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OneComponent } from './one/one.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const main: Routes = [
    { path: 'one', component: OneComponent },
    { path: 'two', loadChildren: 'app/two/twoModule#TwoModule' },
    { path: 'two/:id', loadChildren: 'app/two/twoModule#TwoModule' },
    { path: 'three', loadChildren: 'app/three/threeModule#ThreeModule' },
    { path: '', redirectTo: 'one', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(main)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoute { }