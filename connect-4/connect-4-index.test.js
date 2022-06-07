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


test('Check winner', () => {
    const board = [[null, null, null, null]]
    

    const result = functions.acrossGrab()

    expect(result).toEqual(expect.arrayContaining(board))



})



