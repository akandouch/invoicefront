import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceprofileComponent } from './invoiceprofile.component';

describe('InvoiceprofileComponent', () => {
  let component: InvoiceprofileComponent;
  let fixture: ComponentFixture<InvoiceprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
