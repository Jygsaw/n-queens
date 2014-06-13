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
  var solution = window.buildBoard(n);

  var placeNewQueen = function(row, ld, col, rd) {
    // calculate poss
    var poss = '';
    for (var i = 0; i < col.length; i++) {
      if (row > 1) {
        if (col[i] === '1' || ld[i] === '1' || rd[i] === '1') {
          poss += '0';
        }
        else {
          poss += '1';
        }
      }
      else {
        poss += '0';
      }
    }

    // convert poss into number
    // if poss === 0, then no more moves
    var possNum = parseInt(poss, 2);
    if (possNum === 0 && row !== 1) {
      return;
    }
    if (n === row) {
      for (var i = 0; i < poss.length; i++) {
        if (poss[i] === '1') {
          solution[row-1][i] = 1;
        }
      }
      return true;
    } else {
      // iterate through good poss
      for (var i = 0; i < poss.length; i++) {
        if (poss[i] === '1' || row === 1 && poss[i] === '0') {
          // create column mask
          var newCol = col.split('');
          newCol[i] = 1;
          newCol = newCol.join('');
          // create ld mask by shifting bits
          var newLd = ld.split('');
          newLd[i] = 1;
          newLd.shift();
          newLd.push('0');
          newLd = newLd.join('');

          // create rd mask by shifting bits
          var newRd = rd.split('');
          newRd[i] = 1;
          newRd.unshift(0);
          newRd.pop();
          newRd = newRd.join('');

          // recurse with new masks
          if (placeNewQueen(row + 1, newLd, newCol, newRd)) {
            solution[row - 1][i] = 1;
            return true;
          }
        }
      }
    }
  };

  var baseMask = '';
  for (var i = 0; i < n; i++) {
    baseMask += "0";
  }

  if (n > 0) {
    placeNewQueen(1, baseMask, baseMask, baseMask);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var placeNewQueen = function(row, ld, col, rd) {

    // calculate poss
    var poss = (col | ld | rd);
    var mask = Math.pow(2, n) - 1;
    poss = poss ^ mask;

    // convert poss into number
    // if poss === 0, then no more moves
    if (!poss && row !== 1) {
      return;
    }

    // solution found if n === row
    if (n === row) {
      solutionCount++;
      return;
    } else {
      // brute force board position
      for (var i = 0; i < n; i++) {
        var binaryIndex = Math.pow(2, i);
        if (poss & binaryIndex) {
          // create column mask
          var newCol = col | binaryIndex;

          // create ld mask by shifting bits
          var newLd = ld | binaryIndex;
          newLd =  newLd << 1;
          newLd = newLd & mask;

          // create rd mask by shifting bits
          var newRd = rd | binaryIndex;
          newRd = newRd >> 1;

          // recurse with new masks
          placeNewQueen(row + 1, newLd, newCol, newRd);
        }
      }
    }
  };

  if (n > 0) {
    var start = new Date().getTime();
    placeNewQueen(1, 0, 0, 0);
    console.log('Time for ' + n + ' queens: ', new Date().getTime() - start);
  }
  else {
    solutionCount++;
  }
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
