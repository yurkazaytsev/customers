import { Routes } from '@angular/router';

import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent }

];
