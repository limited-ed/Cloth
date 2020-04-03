import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'core/guarsds/authentication.guard';

import { ClothComponent } from './components/cloth/cloth.component';


const routes: Routes = [
    {
        path: '', component: ClothComponent}

];

export const ClothRoutes = RouterModule.forChild(routes);
