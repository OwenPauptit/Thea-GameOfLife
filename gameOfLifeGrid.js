
ALIVE_CELL = 1;
DEAD_CELL = 0;

class GameOfLifeGrid {

    constructor (width, height){
        this.grid = this.createGrid(width,height);
        this.width = width;
        this.height = height;
        this.iteration = 0;
    }

    printGrid = function(){
        console.log(this.grid);
    }

    createGrid = function(width, height){
        var grid = [];
        for (var i = 0; i < height; i++){
            var tempRow = []
            for (var j = 0; j < width; j++){
                tempRow.push(DEAD_CELL);
            }
            grid.push(tempRow);
        }
        return grid;
    }

    birthCell = function(row, col){
        if (0 < row < this.height && 0 < col < this.width){
            this.grid[row][col] = ALIVE_CELL;
        }
    }

    killCell = function(row, col){
        if (0 < row < this.height && 0 < col < this.width){
            this.grid[row][col] = DEAD_CELL;
        }
    }

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

    getCell = function(row, col){
        return this.grid[row][col];
    }

    getCellsNextIteration = function(currentState, numberOfAliveNeighbours){
        if (currentState == ALIVE_CELL){
            if (numberOfAliveNeighbours == 2 || numberOfAliveNeighbours == 3){
                return ALIVE_CELL;
            }
        }
        else if (numberOfAliveNeighbours == 3){
            return ALIVE_CELL;
        }
        return DEAD_CELL;
    }

    getNumberOfAliveNeighbours = function(row, col){
        var left = col - 1;
        var right = col + 1;
        var top = row - 1;
        var bottom = row + 1;

        if (left < 0){
            left = 0;
        }
        if (right > this.width - 1){
            right = this.width - 1;
        }
        if (top < 0){
            top = 0;
        }
        if (bottom > this.height - 1){
            bottom = this.height - 1;
        }

        var numberOfAliveNeighbours = 0;

        for (var c = left; c <= right; c++){
            for (var r = top; r <= bottom; r++){
                if (c != col || r != row){
                    numberOfAliveNeighbours += this.grid[r][c];
                }
            }
        }

        return numberOfAliveNeighbours;
    }
}