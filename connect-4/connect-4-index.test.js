

const functions = require('./connect-4-index')



test('Board is empty at start', () => {
    const expectedResult = 
    [[null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]]




    const result = functions.getBoard()


    expect(result).toEqual(expectedResult)

})


test('acrossGrab contains and array of 4 nulls', () => {
    const expectedResult = [[null, null, null, null]]
    

    const result = functions.acrossGrab()

    expect(result).toEqual(expect.arrayContaining(expectedResult))



})










