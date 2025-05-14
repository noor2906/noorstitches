import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
    },
    {
        path: 'tienda',
        loadComponent: () => import('./pages/tienda-page/tienda-page.component').then(m => m.TiendaPageComponent)
    },
    {
        path: 'productos/:id',
        loadComponent: () => import('./pages/producto-page/producto-page.component').then(m => m.ProductoPageComponent)
    },
    {
        path: 'carrito',
        loadComponent: () => import('./pages/carrito-page/carrito-page.component').then(m => m.CarritoPageComponent)
    }
];
