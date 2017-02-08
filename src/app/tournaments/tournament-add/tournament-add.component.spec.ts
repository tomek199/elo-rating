/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { TournamentAddComponent } from './tournament-add.component';
import { TournamentService } from '../shared/tournament.service';
import { TournamentServiceStub } from '../../testing/tournament-stubs';

describe('TournamentAddComponent', () => {
  let component: TournamentAddComponent;
  let fixture: ComponentFixture<TournamentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentAddComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [
        {provide: TournamentService, useClass: TournamentServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
