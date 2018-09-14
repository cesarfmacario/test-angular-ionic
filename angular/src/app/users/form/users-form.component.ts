import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'users-form',
    templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit {

    usuarioId: any = null;
    usuarioForm: FormGroup;
    showError: boolean = false;

    constructor(
        private route: Router,
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute
            .params
            .subscribe(params => {
                if (params.id) {
                    // Si se detecta un ID, se trata de una edicion
                    this.usuarioId = params.id;
                    this.apiService
                        .get("http://localhost:3000/users/" + this.usuarioId)
                        .subscribe(response => {
                            // Rehidratar formulario con la información del
                            // usuario obtenida desde el servicio API REST
                            this.initUsuarioForm(response);
                        }, error => {
                            console.log(error);
                        })
                } else {
                    // Iniciar el formulario sin información cuando es una creación
                    this.usuarioId = null;
                    this.initUsuarioForm();
                }
            })

    }

    initUsuarioForm(datos: any = {}) {
        // Valores por defecto del formulario si tuviese datos
        this.usuarioForm = new FormGroup({
            "nombre": new FormControl(datos.nombre || "", [Validators.required]),
            "correo": new FormControl(datos.correo || "", [Validators.required]),
            "telefono": new FormControl(datos.telefono || "", [Validators.required])
        });
    }

    submitForm() {
        if (this.usuarioForm.valid) {
            if (this.usuarioId) {
                // Método PUT
                this.apiService
                    .put(`http://localhost:3000/users/${this.usuarioId}/`, this.usuarioForm.value)
                    .subscribe(response => {
                        this.route.navigate(['/users/']);
                    }, error => {
                        console.log(error);
                    })

            } else {
                // Método POST
                this.apiService
                    .post("http://localhost:3000/users/", this.usuarioForm.value)
                    .subscribe(response => {
                        this.route.navigate(['/users/']);
                    }, error => {
                        console.log(error);
                    })
            }

        } else {
            this.showError = true;
        }
    }

}
