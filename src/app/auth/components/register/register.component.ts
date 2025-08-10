import { Component, inject, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}
@Component({
    selector: 'app-register',
    imports: [RouterOutlet, ReactiveFormsModule, AutoCompleteModule, ButtonModule, FloatLabel],
    standalone: true,
    templateUrl: './register.component.html',
})
export class RegisterComponent {

     isSignedIn= model<boolean>(false);

    title = 'paytrack-front';
    //    messageService = inject(MessageService);

    items: any[] | undefined;

    signUpForm!: FormGroup;

    formSubmitted: boolean = false;
signUpFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
  { name: 'ownerName', label: 'Owner Name', type: 'text', placeholder: 'Enter owner name' },
  { name: 'ownerEmail', label: 'Owner Email', type: 'email', placeholder: 'Enter owner email' }
];

    constructor(private fb: FormBuilder) {
        this.signUpForm = this.fb.group({
            fullName: ['', Validators.required],
            ownerName: ['', Validators.required],
            ownerEmail: ['', Validators.required],
        });
   
    }
    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.signUpForm) {

            if (this.signUpForm.valid) {
                this.signUpForm.reset();
                
                this.formSubmitted = false;
            }
        }
    }

    createAccountFlag():void{
         this.isSignedIn.update(prev => !prev);
    }
}
