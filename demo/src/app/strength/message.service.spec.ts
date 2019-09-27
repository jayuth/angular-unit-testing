import { MessageService } from "../message.service"

// testing a service with no parameters
describe('MessageService', () => {
    let service: MessageService

    // before testing each test
    beforeEach(() => {
    })

    // check the initial state of our service
    it('should have no messages to start', () => {
        service = new MessageService();

        expect(service.messages.length).toBe(0);
    })

    it('should add a message when add() is called', () => {
        // arrage
        service = new MessageService();
        // act 
        service.add('message1');
        // assert
        expect(service.messages.length).toBe(1);
    })

    it('should remove all messages when clear() is called', () => {
        service = new MessageService();
        service.add('message1'); // add a message before clearing. w/o adding a message, we won't change a state. but this would work but to follow our test story, it should have at lest one msg there and clear it out

        service.clear();

        expect(service.messages.length).toBe(0);
    })
})