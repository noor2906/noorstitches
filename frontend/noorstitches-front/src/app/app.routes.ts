import { Routes } from '@angular/router';
import { authGuardGuard } from './guards/auth-guard.guard';

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
        canActivate: [authGuardGuard],
        loadComponent: () => import('./pages/carrito-page/carrito-page.component').then(m => m.CarritoPageComponent)
    },
    {
        path: 'contactanos',
        loadComponent: () => import('./pages/contact-page/contact-page.component').then(m => m.ContactPageComponent)
    },
    {
        path: 'preguntasFrecuentes',
        loadComponent: () => import('./pages/preguntas-frecuentes-page/preguntas-frecuentes-page.component').then(m => m.PreguntasFrecuentesPageComponent)
    },
    {
        path: 'redirigiendo',
        canActivate: [authGuardGuard],
        loadComponent: () => import('./pages/redirigiendo-page/redirigiendo-page.component').then(m => m.RedirigiendoPageComponent)
    },
    {
        path: 'gestion-pago',
        canActivate: [authGuardGuard],
        loadComponent: () => import('./pages/gestion-pago-page/gestion-pago-page.component').then(m => m.GestionPagoPageComponent)
    },
    {
        path: 'settings',
        canActivate: [authGuardGuard],
        loadComponent: () => import('./pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
    },
    {
        path: 'favoritos',
        canActivate: [authGuardGuard],
        loadComponent: () => import('./pages/favoritos-page/favoritos-page.component').then(m => m.FavoritosPageComponent)
    }
];
