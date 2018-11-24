import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {SCHEDULED_MATCHES} from './../../testing/data/matches';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ActivatedRouteStub, RouterLinkStub, RouterStub} from './../../testing/routing-stubs';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../../players/shared/player.service';
import {HttpModule} from '@angular/http';
/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {QueueListComponent} from './queue-list.component';

describe('QueueComponent', () => {
  let component: QueueListComponent;
  let fixture: ComponentFixture<QueueListComponent>;

  let playerService: PlayerService;
  let router: RouterStub;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueueListComponent,
        RouterLinkStub
      ],
      imports: [
        HttpModule,
        FormsModule,
        NgbModule.forRoot(),
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PlayerService, useClass: PlayerServiceStub },
        { provide: GoogleAuthService, useClass: GoogleAuthServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    fixture = TestBed.createComponent(QueueListComponent);
    component = fixture.componentInstance;
    component.scheduledMatches = SCHEDULED_MATCHES;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
