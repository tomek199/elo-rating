import { Player } from './../../players/shared/player.model';
import { NgbTypeahead, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PlayerServiceStub, PLAYERS } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { QueueAddComponent } from './queue-add.component';

describe('QueueAddComponent', () => {
  let component: QueueAddComponent;
  let fixture: ComponentFixture<QueueAddComponent>;

  let playerService: PlayerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        QueueAddComponent
      ],
      imports: [ FormsModule, NgbModule.forRoot() ], 
      providers: [
        { provide: PlayerService, useClass: PlayerServiceStub },
        { provide: NgbTypeahead }
      ] 
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(QueueAddComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    playerService = fixture.debugElement.injector.get(PlayerService);
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have players correct amount of players',  fakeAsync(() => {
    createComponent();
    expect(component.players.length).toEqual(PLAYERS.filter(p => p.active == true).length);
  }));

  it('should have valid form if two players exist', fakeAsync(() => {
    createComponent();
    let playerOne = new Player();
    playerOne.id = '1';
    playerOne.username = 'PlayerOne';
    let playerTwo = new Player();
    playerTwo.id = '1';
    playerTwo.username = 'PlayerOne';
    component.match.playerOne = playerOne;
    component.match.playerTwo = playerTwo;
    fixture.detectChanges();
    expect(component.formValid()).toBeFalsy();
    component.match.playerTwo.id = '2';
    component.match.playerTwo.id = 'PlayerTwo';
    fixture.detectChanges();
    expect(component.formValid()).toBeTruthy();
  }));
  
});
