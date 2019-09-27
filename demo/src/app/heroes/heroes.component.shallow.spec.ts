import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    // 2. mocking child component
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
    class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      }

    beforeEach(() => {
        HEROES = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 }
        ]

        // 1. mocking the heroService including methods that are called on the heroService
        // followed by declarations and providers arrays 
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }  // register a service use this object instead of the real service when it's looking for heroService
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes property correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES)) // mock that heroService return a list of heroes for us
        // detectChanges is used to run life cycle eebents such as ngOnInit
         fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    // test for element in the template
    it('should create one li element for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})

 
// before implementing a mock child component, we saw the following error:
// Can't bind to 'hero' since it isn't a known property of 'app-hero'.
// this is because <app-hero> is not part of a module. 
// in the heroes template, we have <app-hero> tag. This tag refers to a child component class
// To fix this, we have to create a fake child component and import it to the test module