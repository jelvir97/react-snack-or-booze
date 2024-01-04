const unroll = require("./unroll");

describe("#unroll", function () {

  const square = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  const smallestSquare = [
    [1,2],
    [4,3]
  ]
  const smallerSquare = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"]
  ];
  
  unroll(smallerSquare); // ["a", "b", "c", "f", "i", "h", "g", "d", "e"]

  const biggerSquare = [
    [1,2,3,4,5,6],
    [20,21,22,23,24,7],
    [19,32,33,34,25,8],
    [18,31,36,35,26,9],
    [17,30,29,28,27,10],
    [16,15,14,13,12,11]
]

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("should work with squares", ()=>{
    expect(unroll(square)).toEqual([1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10])
    expect(unroll(smallerSquare)).toEqual(["a", "b", "c", "f", "i", "h", "g", "d", "e"])
    expect(unroll(biggerSquare)).toEqual([1, 2, 3, 4, 5, 6,
                                          7, 8, 9, 10, 11, 12,
                                          13, 14, 15, 16, 17, 18, 
                                          19, 20, 21, 22, 23, 24, 
                                          25, 26, 27, 28, 29, 30, 
                                          31, 32, 33, 34, 35, 36])
  })
  expect(unroll(smallestSquare)).toEqual([1,2,3,4])

});
