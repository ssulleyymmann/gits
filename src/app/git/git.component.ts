// Promise Version
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from './../service/http-promise';

@Component({
    selector: 'git-list',
    moduleId: module.id,
    templateUrl: 'git.component.html',
    providers: [HeroService]
})
export class GitComponent implements OnInit {
    mode = 'Promise';

    errorMessage: string;
    gits: any[];
    constructor(private heroService: HeroService) { }
    ngOnInit() {
        this.gits = ["https://api.github.com/repos/angular/angular", "https://api.github.com/repos/angular/material2", "https://api.github.com/repos/driftyco/ionic"];
    }
    getGitRepo(url: string) {
        this.heroService.getHeroes(url)
            .then(
            gits => {
                return gits;
            },
            error => this.errorMessage = <any>error);
    }
}

@Component({
    selector: 'git-detail-list',
    moduleId: module.id,
    templateUrl: `
     <ul>
      <li *ngFor="let git of gits">
        {{git.title}}
      </li>
    </ul>
    `,
    providers: [HeroService]
})
export class GitDetailComponent implements OnInit {

    errorMessage: string;
    gits: any[];

    @Input('url') gitUrl: string;

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getGitRepo(this.gitUrl);
    }
    getGitRepo(url: string) {
        this.heroService.getHeroes(url)
            .then(
            gits => {
                this.gits = gits
            },
            error => this.errorMessage = <any>error);
    }
}