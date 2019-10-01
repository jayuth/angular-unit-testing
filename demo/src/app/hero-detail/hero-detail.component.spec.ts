import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

// testing a component that includes a routing service
describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>; 
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        // hand-code not built-in code
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return '3'; }}}
        }
        // mocking routing services
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        // to populate and return property data when ngOnInIt is run and calls getHero 
        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'Wonder Woman', strength: 89 }));
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('WONDER WOMAN');
    });
})