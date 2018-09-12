import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

    usuarios: Array<any> = []

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() { 
        this.getList();
    }

    getList() {
        this.apiService
            .get("http://localhost:3000/users")
            .subscribe((response: any) => {
                this.usuarios = response;
            }, error => {

            })
    }


    agregarRandom() {
        this.apiService.post("http://localhost:3000/users/", {
            id: this.usuarios.length + 1,
            nombre: `Nombre ${this.usuarios.length}`,
            correo: `correo${this.usuarios.length}@gmail.com`,
            telefono: `${this.usuarios.length}`,
        }).subscribe(response => {
            console.log(response)
            this.getList();
        }, error => {
            console.log(error)
        })

        
    }

}
