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
        loadComponent: () => import('./pages/redirigiendo-page/redirigiendo-page.component').then(m => m.RedirigiendoPageComponent)
    },
    {
        path: 'gestion-pago',
        loadComponent: () => import('./pages/gestion-pago-page/gestion-pago-page.component').then(m => m.GestionPagoPageComponent)
    },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
    }
];
