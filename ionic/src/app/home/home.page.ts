import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    usuarios: Array<any> = [];

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.usuarios = []
        this.apiService
            .get("http://localhost:3000/users/")
            .subscribe((response: any) => {
                this.usuarios = response;

            }, error => {
                console.log(error);

            })
    }

    nuevoUsuario() {
        this.router.navigate(['/new']);
    }

    editarUsuario(id) {
        this.router.navigate(['/edit/' + id]);
    }

    eliminarUsuario(id) {
        this.apiService
            .delete("http://localhost:3000/users/" + id + "/")
            .subscribe(response => {
                this.getList();

            }, error => {
                console.log(error);

            })
    }

}
