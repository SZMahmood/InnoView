import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSystemManagerComponent } from './file-system-manager.component';

describe('FileSystemManagerComponent', () => {
  let component: FileSystemManagerComponent;
  let fixture: ComponentFixture<FileSystemManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileSystemManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileSystemManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
