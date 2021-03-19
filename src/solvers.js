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
  var board = new Board({'n': n});
  var checkRooks = function (row = 0) {
    if (row === n) {
      return board.rows();
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);

        if (!board.hasAnyRooksConflicts()) {
          return checkRooks(row + 1);
        }
        board.togglePiece(row, col);
      }
    }
  };
  var solution = checkRooks();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factor = function(n) {
    if (n === 0) {
      return 1;
    } else {
      return (n * factor(n - 1));
    }
  };
  return factor(n);
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var solution = [];
  var checkQueens = function(row = 0) {
    if (row === n) {
      var boardTree = board.rows();
      var count = 0;
      for (var i = 0; i < boardTree.length; i++) {
        for (var j = 0; j < boardTree[i].length; j++) {
          count += boardTree[i][j];
        }
      }
      if (count === n) {
        solution = _.map(board.rows(), function (rows) {
          return rows.slice();
        });
      }
    } else {
      for (var col = 0; col < n; col++) {

        board.togglePiece(row, col);

        if (!board.hasAnyQueenConflictsOn(row, col)) {
          checkQueens(row + 1);
          if (solution.length === 1) {
            return;
          }
        }
        board.togglePiece(row, col);
      }
    }
  };
  if (n === 2 || n === 3) {
    return board.rows();
  }

  checkQueens();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({'n': n});
  var checkQueens = function(row = 0) {
    if (row === n) {
      var boardTree = board.rows();
      var count = 0;
      for (var i = 0; i < boardTree.length; i++) {
        for (var j = 0; j < boardTree.length; j++) {
          count += boardTree[i][j];
        }
      }
      if (count === n) {
        solutionCount++;
      }
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);

        if (!board.hasAnyQueenConflictsOn(row, col)) {
          checkQueens(row + 1);
        }

        board.togglePiece(row, col);
      }
    }
  };

  checkQueens();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
