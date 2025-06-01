import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CategoriaConSubcategorias } from '../../interfaces/categoriaconsubcategorias.interface';
import { CategoriaService } from '../../services/categoria.service';
import { MatIcon } from '@angular/material/icon';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-subcategorias-page',
  imports: [MatIcon, RouterLink],
  templateUrl: './subcategorias-page.component.html',
  styleUrl: './subcategorias-page.component.css',
  standalone: true
})
export class SubcategoriasPageComponent implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  categoriaService = inject(CategoriaService);

  categoriaConSubcategorias = signal<CategoriaConSubcategorias | null>(null);
  categorias = signal<Categoria[] | null>([]);


  subcategoriaNombresNuevosMap: { [key: string]: string } = {
    'Lanas&hilos_otros': 'Otros (lanas&hilos)',
    'Handmade_otros': 'Otros (handmade)',
    'Merceria_otros': 'Otros (mercería)',
    'Kits_otros': 'Otros (kits)',
  };

  ngOnInit() {
    const idCategoria = Number(this.route.snapshot.paramMap.get('id'));
    if (idCategoria) {
      this.cargarCategoriaConSubcategoria(idCategoria);
    }
  }

  cargarCategoriaConSubcategoria(idCategoria: number) {
    this.categoriaService.getCategoriaById(idCategoria).subscribe(categoria => {
      this.categoriaService.getSubcategoriasPorCategoria(idCategoria).pipe(
        map(subs => {
          subs.forEach(sub => {
            if (this.subcategoriaNombresNuevosMap[sub.nombre]) {
              sub.nombre = this.subcategoriaNombresNuevosMap[sub.nombre];
            }
          });

          return {
            id: categoria.id,
            nombre: categoria.nombre,
            subcategorias: subs
          };
        })
      ).subscribe(resultado => {
        this.categoriaConSubcategorias.set(resultado);
      });
    });
  }

   volver() {
    this.router.navigate(['/home']);
  }

  irATienda(idCategoria: number | undefined, idSubcategoria: number) {
    if (!idCategoria) return;

    // Guardamos en localStorage
    localStorage.setItem('subcategoriaSeleccionada', idSubcategoria.toString());

    this.router.navigate(['/tienda']);
  }

}
