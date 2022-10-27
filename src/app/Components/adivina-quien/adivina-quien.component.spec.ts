import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaQuienComponent } from './adivina-quien.component';

describe('AdivinaQuienComponent', () => {
  let component: AdivinaQuienComponent;
  let fixture: ComponentFixture<AdivinaQuienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdivinaQuienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinaQuienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
