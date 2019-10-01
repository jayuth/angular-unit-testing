import { TestBed, inject } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// testing only service
describe('HeroService', () => {
    let mockMessageService;
    // set up a handle to the mock HttpClient service so that we can adjuct it and control it inside of our test 
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            // import it so we can connect to http 
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

            httpTestingController = TestBed.get(HttpTestingController);
            service =  TestBed.get(HeroService);
    });

    describe('getHero', () =>{

        it('should call get with the correct URL', () => {
                // call http.get
            service.getHero(4).subscribe(() => {
                // this code will be executed when the flush returns
                console.log('fulfilled');
            });
            // service.getHero(3).subscribe(); //try to call an incorrect URL

            // http.get is actually called here. we pass in an expected URL  
            const req = httpTestingController.expectOne('api/heroes/4');
            // tell http.get what to send back to us
            req.flush({ id:4, name: 'SuperDude', strength: 100 });
            httpTestingController.verify(); // to verify exactly what we want in case we put the wrong URL
        });      
    });
})


