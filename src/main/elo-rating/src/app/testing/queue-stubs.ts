import { Match } from './../matches/shared/match.model';
import { Injectable, Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-queue-list',
    template: ''
})
export class QueueListComponent implements OnInit {
    @Input("leagueId") leagueId: string;

    ngOnInit(): void { }
}