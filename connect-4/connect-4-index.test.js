

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


test('acrossGrab contains an array of 4 nulls', () => {
    const expectedResult = [[null, null, null, null]]
    

    const result = functions.acrossGrab()

    expect(result).toEqual(expect.arrayContaining(expectedResult))



})


test('isValidYellowAcrossDiagonalWin returns false', () => {

    const expectedResult = false

    const result = functions.isValidYellowAcrossDiagonalWin(0)

    expect(result).toEqual(expectedResult)
})

test('isValidYellowAcrossDiagonalWin returns false for first array in grab', () => {

    const expectedResult = false

    const result = functions.isValidYellowAcrossDiagonalWin(0)

    expect(result).toEqual(expectedResult)
})





test('isValidYellowAcrossDiagonalWin returns false for first array in grab', () => {
    const expectedResult = false

    const result = functions.isValidYellowDownWin(0)


    expect(result).toEqual(expectedResult)


})










