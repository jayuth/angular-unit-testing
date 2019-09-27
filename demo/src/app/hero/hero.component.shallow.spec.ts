import { TestBed, ComponentFixture } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA] // ignore unknown attributes and elements in the html
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id: 11, name: 'Mr. Nice', strength: 10 };

        expect(fixture.componentInstance.hero.name).toEqual('Mr. Nice');
    })

    // template test
    it('should render the hero name in an anchor tag', () => {
        fixture.componentInstance.hero = { id: 11, name: 'Mr. Nice', strength: 10 };
        fixture.detectChanges(); // update any bindings - hero.id and hero.name in the template

        let deA = fixture.debugElement.query(By.css('a')); // find an <a> tag
        expect(deA.nativeElement.textContent).toContain('Mr. Nice');
        // grab element by its tag
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Mr. Nice');

    })
})

// Before implementing detectChanges() :
// we got an error becuase the testing module doesn't know about the routerLink directive in the template
// we got an empty string because we didn't tell Angular to actually implement the bindings