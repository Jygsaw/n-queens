/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = window.buildBoard(n);
  for (var i = 0; i < n; i++) {
    solution[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for (var i = 1; i <= n; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var placeNewQueen = function(row, ld, col, rd) {

console.log("===== PLACE NEW QUEEN =====");
console.log("row: " + row);
console.log("ld: " + ld);
console.log("rd: " + rd);
console.log("col: ", col);

    // calculate poss
    var pos = '';
    for (var i = 0; i < col.length; i++) {
      if (row > 1) {
        if (col[i] === '1' || ld[i] === '1' || rd[i] === '1') {
          pos += '0';
        }
        else {
          pos += '1';
        }
      }
      else {
        pos += "0";
      }
    }

    console.log("pos:", pos);
          // // check poss for next level
          // if (new poss != crap) {
          //    recurse with ld, col, rd, new poss
          // }

    if (n === row) {
      solutionCount++;
    } else {
      // iterate through good poss
      for (var i = 0; i < poss.length; i++) {
        if (poss[i] === '0') {
          // create column mask
          var newCol = col.split('');
          newCol[i] = 1;
          newCol = newCol.join();

          // create ld mask
          var newLd = ld.split('');
          newLd[i] = 1;

          newLd = newLd.join();


          var newRd = rd.split('');
          newRd[i] = 1;

          newRd = newRd.join();

          // shift diagonal masks

          // recurse with new masks
//          placeNewQueen(row + 1, newCol, newLd, newRd);
        }
      }
    }
  };

  var baseMask = "00000000";
  placeNewQueen(1, baseMask, baseMask, baseMask);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  return solutionCount;
};

window.buildBoard = function (n) {
  var solution = [];
  var rows = Array(n + 1).join('0').split();
  for (var i = 0; i < n; i++) {
    solution[i] = rows.concat();
  }
  return solution;
};
