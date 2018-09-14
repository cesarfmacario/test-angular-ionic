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
                console.log(error);
            })
    }


    eliminarUsuario(usuario) {
        this.apiService
            .delete(`http://localhost:3000/users/${usuario.id}/`)
            .subscribe(response => {
                this.getList();
            }, error => {
                console.log(error);
            })
    }

}
