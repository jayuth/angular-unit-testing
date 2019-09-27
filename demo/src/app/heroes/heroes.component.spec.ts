import { HeroesComponent } from "./heroes.component"
import { of } from "rxjs";

// testing a component
describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 }
        ]

        // mock the heroService so the HeroesComponent can use
        // in the component class, check if our component use any methods from the heroService object 
        // e.g. this.heroService.deleteHero(hero).subscribe();
        // if not, leave it blank
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        // HeroesComponent's constructor expects the HeroService parameter to pass in
        // constructor(private heroService: HeroService)
        component = new HeroesComponent(mockHeroService);
    })

    
    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            // arrage 
            mockHeroService.deleteHero.and.returnValue(of(true)); // when the deleteHero() is called, it will return an observable of true 
            component.heroes = HEROES; // populate heroes list like what the real component does in the ngOnInIt() 
            
            // act - delete index 2 
            component.delete(HEROES[2]);

            // assert
            // state-based test - check if the state of a component had changed (the length of the component)
            expect(component.heroes.length).toBe(2); 
            // the delete() method returns an observable but we don't have that observable so we need to mock it
        })
    })

    // interaction test - 
        it('should call deleteHero', () => {
             mockHeroService.deleteHero.and.returnValue(of(true)); // mock as if an observable was returned
             component.heroes = HEROES; 
             
             component.delete(HEROES[2]);

             // expect(mockHeroService.deleteHero).toHaveBeenCalled(); // check if the deleteHero() is actually called
             expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]); // check if we pass in the correct parameter to the heroService service
        })
})