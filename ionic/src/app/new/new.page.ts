import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-new',
    templateUrl: './new.page.html',
    styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

    usuarioId: any = null;
    usuarioForm: FormGroup;
    showError: boolean = false;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.activatedRoute
            .params
            .subscribe(params => {
                if (params.id) {
                    this.usuarioId = params.id;

                    this.apiService
                        .get("http://localhost:3000/users/" + this.usuarioId + "/")
                        .subscribe(response => {
                            this.initUsuarioForm(response);

                        }, error => {
                            console.log(error);
                        })

                } else {
                    this.usuarioId = null;
                    this.initUsuarioForm();
                }
            });
    }

    initUsuarioForm(datos: any = {}) {
        this.usuarioForm = new FormGroup({
            "nombre": new FormControl(datos.nombre || "", [Validators.required]),
            "correo": new FormControl(datos.correo || "", [Validators.required]),
            "telefono": new FormControl(datos.telefono || "", [Validators.required])
        })
    }

    submitForm() {
        if (this.usuarioForm.valid) {
            if (this.usuarioId) {
                // Método PUT
                this.apiService
                    .put(`http://localhost:3000/users/${this.usuarioId}/`, this.usuarioForm.value)
                    .subscribe(response => {
                        this.router.navigate(['/home']);
                    }, error => {
                        console.log(error);
                    })

            } else {
                // Método POST
                this.apiService
                    .post("http://localhost:3000/users/", this.usuarioForm.value)
                    .subscribe(response => {
                        this.router.navigate(['/home']);
                    }, error => {
                        console.log(error);
                    })
            }

        } else {
            this.showError = true;
        }
    }

}
