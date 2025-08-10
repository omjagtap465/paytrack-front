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
    selector: 'app-login',
    imports: [RouterOutlet, ReactiveFormsModule, AutoCompleteModule, ButtonModule, FloatLabel],
    standalone: true,
    templateUrl: './login.component.html',
})
export class LoginComponent {

    isSignedIn = model<boolean>(false);

    title = 'paytrack-front';
    //    messageService = inject(MessageService);

    items: any[] | undefined;

    signInForm!: FormGroup;

    formSubmitted: boolean = false;

    signInFields = [
        { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
    ];
    constructor(private fb: FormBuilder) {

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
        if (this.signInForm) {

            if (this.signInForm.valid) {
                this.signInForm.reset();

                this.formSubmitted = false;
            }
        }
    }

    createAccountFlag(): void {
        // this.isSignedIn = !this.isSignedIn
        this.isSignedIn.update(prev => !prev);

    }
}
