import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with 2 controls', () => {
    expect(component.loginForm.contains('user')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the user control required and min length 4', () => {
    const control = component.loginForm.get('user');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    control?.setValue('abc');
    expect(control?.valid).toBeFalsy();
    control?.setValue('abcd');
    expect(control?.valid).toBeTruthy();
  });

  it('should make the password control required and min length 4', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    control?.setValue('abc');
    expect(control?.valid).toBeFalsy();
    control?.setValue('abcd');
    expect(control?.valid).toBeTruthy();
  });

  it('should set isSumbit to true on valid form submit', () => {
    spyOn(console, 'log');
    component.loginForm.setValue({ user: 'user', password: 'password' });
    component.onSumbit();
    expect(component.isSumbit).toBeTrue();
    expect(console.log).toHaveBeenCalledWith('Form Submitted', { user: 'user', password: 'password' });
  });

  it('should reset isSumbit after form submit simulation', (done) => {
    component.loginForm.setValue({ user: 'user', password: 'password' });
    component.onSumbit();
    setTimeout(() => {
      expect(component.isSumbit).toBeFalse();
      done();
    }, 2000);
  });
});
