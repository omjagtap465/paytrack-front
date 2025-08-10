import { Component, inject } from '@angular/core';
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
    selector: 'app-root',
    imports: [RouterOutlet, ReactiveFormsModule, AutoCompleteModule, ButtonModule, FloatLabel],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    isSignedIn: boolean = false;

    title = 'paytrack-front';
    //    messageService = inject(MessageService);

    items: any[] | undefined;

    signUpForm!: FormGroup;
    signInForm!: FormGroup;

    formSubmitted: boolean = false;
signUpFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
  { name: 'ownerName', label: 'Owner Name', type: 'text', placeholder: 'Enter owner name' },
  { name: 'ownerEmail', label: 'Owner Email', type: 'email', placeholder: 'Enter owner email' }
];
signInFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
];
    constructor(private fb: FormBuilder) {
        this.signUpForm = this.fb.group({
            fullName: ['', Validators.required],
            ownerName: ['', Validators.required],
            ownerEmail: ['', Validators.required],
        });
        this.signInForm = this.fb.group({
            fullName: ['', Validators.required],
            password: ['', Validators.required],
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

    createAccountFlag(flag:boolean):void{
        this.isSignedIn = !this.isSignedIn
    }
}
