import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../Utils/services/serviciosprod';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-prod1form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
     MatCardModule
  ],
  templateUrl: './prod1form.html',
  styleUrls: ['./prod1form.scss']
})
export class Prod1form implements OnInit {
  form!: FormGroup;
  editMode = false;
  id!: number;
mostrarModal: boolean = false;
mensajeModal: string = '';



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductoService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.editMode = true;
      this.id = +paramId;
      this.productosService.getProducto(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  guardar() {
  if (this.form.valid) {
    if (this.editMode) {
      const productoEditado = {
        id: this.id,
        ...this.form.value
      };

      this.productosService.actualizarProducto(this.id, productoEditado).subscribe({
        next: () => {
          this.mensajeModal = '✅ Producto actualizado exitosamente.';
          this.mostrarModal = true;
          setTimeout(() => {
            this.mostrarModal = false;
            this.router.navigate(['/productos']);
          }, 2500);
        },
        error: err => {
          console.error('❌ Error al actualizar producto:', err);
          this.mensajeModal = '❌ Error al actualizar: ' + (err.error?.message || 'Error desconocido.');
          this.mostrarModal = true;
        }
      });
    } else {
      this.productosService.crearProducto(this.form.value).subscribe({
        next: () => {
          this.mensajeModal = '✅ Producto registrado exitosamente.';
          this.mostrarModal = true;
          setTimeout(() => {
            this.mostrarModal = false;
            this.router.navigate(['/productos']);
          }, 2500);
        },
        error: err => {
          console.error('❌ Error al registrar producto:', err);
          this.mensajeModal = '❌ Error al guardar: ' + (err.error?.message || 'Error desconocido.');
          this.mostrarModal = true;
        }
      });
    }
  }
}

}
