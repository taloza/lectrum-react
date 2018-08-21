import { Composer } from "./";

//Mocks (заглушка)

const mocks = {
    _createPostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock:   jest.fn(),
};

const avatar = 'https://www.avatar.com';
const currentUserFirstName = 'Tt';
const props = {                                     //симулируем передачу пропсов копонентам
    _createPostAsync: mocks._createPostAsyncMock,
    currentUserFirstName,
    avatar,
};

const testComment = 'hi!';                       //иммитация стейта
const  initialState = {
    comment: '',
};

const mutatedState = {                    //иммитация стейта  после написания коммента
    comment: testComment,
};

const result = mount(<Composer {...props}/>);
const markup = render(<Composer {...props}/>);

//Spies  - шпион - наблюдает над методом, візівался - нет, сколько раз...
const spies = {
    _upgradeCommentSpy: jest.spyOn(result.instance(), '_handleTextareaChange'),  // 1- обьект, за которім следим, 2 - метод за кот следим
    _submitCommentSpy:  jest.spyOn(result.instance(), '_handleSubmit'),
}

describe('Composer component:', () =>{
    describe('should have valid markup elements', () =>{
        test('core JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
        });
    });
    describe('should have valid props', ()=>{
       test('_createPostAsync should  be an async function', async()=>{
           await expect(
               result.prop('_createPostAsync')()
            ).resolves.toBeUndefined();
       });

       test('currentUserFirstName should be string', ()=>{      // проверили пропси
           expect(typeof result.prop('currentUserFirstName')).toBe('string');
       });

        test('avatar should be string', ()=>{
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });

    describe('should have valid initial state',()=>{
        test('comment should be an empty string',() => {
            expect(result.state('comment')).toBe('');
        });
    });


    describe('should have core class metods',()=>{
        describe('_handleSubmit',() => {
            test('should call preventDefault',()=>{
                result.instance()._handleSubmit({
                    preventDefault: mocks.preventDefaultMock,
                });
                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            test('should call this._handleSubmit class method',()=>{
                expect (spies._submitCommentSpy).toHaveBeenCalledTimes(1);

                jest.clearAllMocks();   // сброс всех моков
            });

            test('should have a valid initial state',()=>{
                expect(result.state()).toEqual(initialState);
            });

            test('should call props._createPostAsync with a comment as an argument',()=>{
                result.setState({
                    comment: testComment,
                    });
                result.instance()._createPost();

                expect(mocks._createPostAsyncMock).toHaveBeenNthCalledWith(
                    1,                                                           //метод бил визван с одним аргументом
                    testComment,
                );
                expect(result.state()).toEqual(initialState);
            });
            test('should update a state.comment value when called onChange',()=>{
               const event = {
                   target:{
                       value: testComment,
                   },
               };

                result.instance()._handleTextareaChange(event);

                expect(result.state()).toEqual(mutatedState);

                jest.resetAllMocks();
                result.setState(initialState);
        });
    });

    describe('textarea onChange',() => {                    //тестирование собітия onChange, onClick...
        test('textarea onChange',()=>{
            const event = {
                target:{
                    value: testComment,
                }
            };
            result.find('textarea').simulate('change',event);

            expect(spies._upgradeCommentSpy).toHaveBeenCalledTimes(1);
            expect(result.find('textarea').text()).toBe(testComment);
            expect(result.state()).toEqual(mutatedState);
        });
    });
    });
})



