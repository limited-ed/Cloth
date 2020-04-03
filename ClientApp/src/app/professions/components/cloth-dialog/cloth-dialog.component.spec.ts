import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothDialogComponent } from './cloth-dialog.component';

describe('ClothDialogComponent', () => {
  let component: ClothDialogComponent;
  let fixture: ComponentFixture<ClothDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
