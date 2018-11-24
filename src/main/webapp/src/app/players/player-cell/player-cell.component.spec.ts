import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../shared/player.service';
import {SmallSpinnerComponent} from './../../core/directives/small-spinner/small-spinner.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MATCHES} from './../../testing/data/matches';
import {PlayerCellComponent} from './player-cell.component';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';


describe('PlayerCellComponent', () => {
  let component: PlayerCellComponent;
  let fixture: ComponentFixture<PlayerCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCellComponent, SmallSpinnerComponent ],
      imports: [ RouterTestingModule, NgbModule.forRoot() ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should present current player without hyperlink', () => {
    component.match = MATCHES[4];
    component.player = MATCHES[4].playerOne;
    component.currentPlayerId = MATCHES[4].playerOne.id;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('span'));
    expect(playerName.nativeElement.textContent).toEqual('Player 1');
    let rating = fixture.debugElement.query(By.css('span.small'));
    expect(rating.nativeElement.textContent).toEqual('1500');    
  })

  it('should present not current player as hyperlink', () => {
    component.match = MATCHES[4];
    component.player = MATCHES[4].playerTwo;
    component.currentPlayerId = MATCHES[4].playerOne.id;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('a'));
    expect(playerName.nativeElement.textContent).toEqual('Player 2');
    let rating = fixture.debugElement.query(By.css('span.small'));
    expect(rating.nativeElement.textContent).toEqual('1000');   
  })

  it('should present current player as winner without hyperlink', () => {
    component.match = MATCHES[0];
    component.player = MATCHES[0].playerOne;
    component.currentPlayerId = MATCHES[0].playerOne.id;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('span'));    
    expect(playerName.nativeElement.textContent).toEqual('Player 1');
    let ratingInfo = fixture.debugElement.queryAll(By.css('span.small'));
    expect(ratingInfo[0].nativeElement.textContent).toEqual('1200');    
    expect(ratingInfo[2].nativeElement.textContent).toEqual('20');        
    let ratingArrow = fixture.debugElement.query(By.css('span.text-success'));
    expect(ratingArrow).toBeTruthy();
  })

  it('should present current player as looser without hyperlink', () => {
    component.match = MATCHES[1];
    component.player = MATCHES[1].playerOne;
    component.currentPlayerId = MATCHES[0].playerOne.id;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('span'));        
    expect(playerName.nativeElement.textContent).toEqual('Player 1');
    let ratingInfo = fixture.debugElement.queryAll(By.css('span.small'));
    expect(ratingInfo[0].nativeElement.textContent).toEqual('800');    
    expect(ratingInfo[2].nativeElement.textContent).toEqual('-20');        
    let ratingArrow = fixture.debugElement.query(By.css('span.text-danger'));
    expect(ratingArrow).toBeTruthy();
  })

  it('should present match looser as hyperlink', () => {
    component.match = MATCHES[0];
    component.player = MATCHES[0].playerTwo;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('a'));    
    expect(playerName.nativeElement.textContent).toEqual('Player 2');
    let ratingInfo = fixture.debugElement.queryAll(By.css('span.small'));
    expect(ratingInfo[0].nativeElement.textContent).toEqual('1500');    
    expect(ratingInfo[2].nativeElement.textContent).toEqual('-20');        
    let ratingArrow = fixture.debugElement.query(By.css('span.text-danger'));
    expect(ratingArrow).toBeTruthy();
  })

  it('should present disabled player in "<del>" tag', () => {
    component.match = MATCHES[3];
    component.player = MATCHES[3].playerTwo;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('a del.text-muted'));    
    expect(playerName.nativeElement.textContent).toEqual('Player 3');
    let ratingInfo = fixture.debugElement.queryAll(By.css('span.small'));
    expect(ratingInfo[0].nativeElement.textContent).toEqual('1700');    
    expect(ratingInfo[2].nativeElement.textContent).toEqual('20');        
    let ratingArrow = fixture.debugElement.query(By.css('span.text-success'));
    expect(ratingArrow).toBeTruthy();
  })

  it('should present deleted player in <em> tag', () => {
    component.match = MATCHES[2];
    component.player = MATCHES[2].playerTwo;
    fixture.detectChanges();
    let playerName = fixture.debugElement.query(By.css('em.text-warning'));    
    expect(playerName.nativeElement.textContent).toEqual('deleted player');
  })
});
