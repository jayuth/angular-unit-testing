import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component";
import { Directive, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

// set up <a> tag directive by writing our own directive
@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' } // listen to the click event on the parent DOM node
})
export class RouterLinkDirectiveStub{
    @Input('routerLink') linkParams:  any; //@Input will pass a linkParams value to a child component - e.g. <a routerLink=null>
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 }
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService } 
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    // finding child elements through directives
    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInIt
        fixture.detectChanges();

        // check the number of debug elements corresponding to HeroComponent and return it as an array 
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);
        // check the real value of each li element that belongs to HeroComponent
        for(let i = 0; i < heroComponentDEs.length; i++){
            // check if the whole object is the same object from the HEROES array
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })

    // testing a raised event
    it(`should call heroService.deleteHero when the Hero Component's 
        delete button is clicked`, () => {
            spyOn(fixture.componentInstance, 'delete'); // find the delete method on HeroesComponent
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();

            // dig into the child component
            // raised an event by clicking a button but we can do this manaully by access a child property - the delete method, 
            // and manually raise an event for us instead of clicking a button 

            // click button technique
            /*
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            heroComponents[1].query(By.css('button'))
                // click is the name of an event (event could be click, focus, etc), stopPropagation is an event object
                .triggerEventHandler('click', { stopPropagation: () => {}});
                */

            // manually raise an event    
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            // dig into a child component instance
            // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

            // another way to raise an event - trigger that event directly rather than telling the component to raise an event
            // but in this case, we don't know if the child component really has a delete event emitter 
            heroComponents[0].triggerEventHandler('delete', null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]); // if the delete method is really called
    });

    // testing add a new hero name to the input box 
    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES)); // ngOnInIt
        fixture.detectChanges(); // ngOnInIt
        const name = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0]; // choose the first button in the template because it belongs to the parent. Other buttons belong to a a child class  

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges(); // Angular will automatically update the values in the template, we need binding

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES)); 
        fixture.detectChanges(); 
        // query all elements that belong to the HeroComponent
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // query an <a> tag (RouterLinkDirectiveStub) for the first hero 
        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);
            // after the above code is run, our template is rendered 
            // and the <a> tag will be filled with populated values - hero.id = 11
            // look like this - <a routerLink="/detail/11">.

        // simulate a click event for an <a> tag to simulate a routing event
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/11');
    })
});