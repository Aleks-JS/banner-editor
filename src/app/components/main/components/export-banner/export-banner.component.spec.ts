import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBannerComponent } from './export-banner.component';

describe('ExportBannerComponent', () => {
  let component: ExportBannerComponent;
  let fixture: ComponentFixture<ExportBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
