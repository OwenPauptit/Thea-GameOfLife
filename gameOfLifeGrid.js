
ALIVE_CELL = 1;
DEAD_CELL = 0;

class GameOfLifeGrid {

    constructor (width, height){
        this.grid = this.createGrid(width,height);
        this.width = width;
        this.height = height;
    }

    // prints grid to console
    printGrid = function(){
        console.log(this.grid);
    }

    // create a new grid full of dead cells
    createGrid = function(width, height){
        var grid = [];
        for (var row = 0; row < height; row++){
            var tempRow = []
            for (var col = 0; col < width; col++){
                tempRow.push(DEAD_CELL);
            }
            grid.push(tempRow);
        }
        return grid;
    }

    // make the cell at position (row,col) become alive
    birthCell = function(row, col){
        if (0 < row && row < this.height && 0 < col && col < this.width){
            this.grid[row][col] = ALIVE_CELL;
        }
    }

    // make the cell at position (row, col) become dead
    killCell = function(row, col){
        if (0 < row && row < this.height && 0 < col && col < this.width){
            this.grid[row][col] = DEAD_CELL;
        }
    }

    // calculates the state of the grid after the next iteration
    nextIteration = function(){
        var nextGrid = this.createGrid(this.width,this.height);

        for (var row = 0; row < this.height; row++){
            for (var col = 0; col < this.width; col++){
                var numberOfAliveNeighbours = this.getNumberOfAliveNeighbours(row,col);
                nextGrid[row][col] = this.getCellsNextIteration(this.grid[row][col], numberOfAliveNeighbours);
            }
        }
        this.grid = nextGrid;

    }

    // returns the current state of the cell in position (row,col)
    getCell = function(row, col){
        return this.grid[row][col];
    }

    // returns whether the cell will be alive or dead in the next iteration
    getCellsNextIteration = function(currentState, numberOfAliveNeighbours){
        if (currentState == ALIVE_CELL){
            if (numberOfAliveNeighbours == 2 || numberOfAliveNeighbours == 3){
                return ALIVE_CELL; // Cell survives
            }
        }
        else if (numberOfAliveNeighbours == 3){
            return ALIVE_CELL; // Cell is born
        }
        return DEAD_CELL; // Cell either dies or is not born
    }

    // returns the number of alive neighbours around the cell at position (row,col)
    getNumberOfAliveNeighbours = function(row, col){

        var numberOfAliveNeighbours = 0;

        var notAtTop = row > 0;
        var notAtBottom = row < this.height - 1;
        var notAtLeft = col > 0;
        var notAtRight = col < this.width - 1;

        if (notAtTop){
            if (notAtLeft){
                numberOfAliveNeighbours += this.grid[row-1][col-1]; // check above and to the left
            }
            if (notAtRight){
                numberOfAliveNeighbours += this.grid[row-1][col+1]; // theck above and to the right
            }
            numberOfAliveNeighbours += this.grid[row-1][col]; // check directly above
        }
        if (notAtBottom){
            if (notAtLeft){
                numberOfAliveNeighbours += this.grid[row+1][col-1]; // check below and to the left
            }
            if (notAtRight){
                numberOfAliveNeighbours += this.grid[row+1][col+1]; // check below and to the right
            }
            numberOfAliveNeighbours += this.grid[row+1][col]; // check directly below
        }
        if (notAtLeft){
            numberOfAliveNeighbours += this.grid[row][col-1]; // check directly to the left
        }
        if (notAtRight){
            numberOfAliveNeighbours += this.grid[row][col+1]; // check directly to the right
        }

        return numberOfAliveNeighbours;
    }
}