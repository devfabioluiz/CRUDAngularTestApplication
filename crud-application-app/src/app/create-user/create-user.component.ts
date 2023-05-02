import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createForm: FormGroup;
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  emailMask = [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm = this.formBuilder.group({
      id: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
      rendaMensal: 0,
      email: '',
      dataCadastro: ''
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/users']);
  }

  createUser() {
    this.router.navigate(['/users']);
  }

  cancelCreate() {
    this.goBack();
  }
}
