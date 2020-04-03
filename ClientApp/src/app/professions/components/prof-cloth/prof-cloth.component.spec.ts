import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfClothComponent } from './prof-cloth.component';

describe('ProfClothComponent', () => {
  let component: ProfClothComponent;
  let fixture: ComponentFixture<ProfClothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfClothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
