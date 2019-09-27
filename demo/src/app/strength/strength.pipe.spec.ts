import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {
    it('should display unbelievable if strength is 20', () => {
        // arrage
        let pipe = new StrengthPipe();

        expect(pipe.transform(20)).toEqual('20 (unbelievable)');
    })

    it('should display strong if strength is 19', () => {
        let pipe = new StrengthPipe();

        expect(pipe.transform(19)).toEqual('19 (strong)');
    })

    it('should display weak if strength is 1', () => {
        let pipe = new StrengthPipe();

        expect(pipe.transform(1)).toEqual('1 (weak)');
    })
})