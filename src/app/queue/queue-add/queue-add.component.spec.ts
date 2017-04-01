import { By } from '@angular/platform-browser';
import { PlayerServiceStub, PLAYERS } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { QueueAddComponent } from './queue-add.component';

fdescribe('QueueAddComponent', () => {
  let component: QueueAddComponent;
  let fixture: ComponentFixture<QueueAddComponent>;

  let playerService: PlayerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        QueueAddComponent
      ],
      providers: [
        { provide: PlayerService, useClass: PlayerServiceStub }
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
    expect(component.players.length).toEqual(PLAYERS.length);
  }));
  
});
