import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


const SudokuScreen = ({ navigation }) => {

    const [matrixState, setMatrixState] = useState([
        [0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    const [message, setMessage] = useState("");
    const [selectedCase, setSelectedCase] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [gamePlayed, setGamePlayed] = useState(false);

    const isSafe = (matrix, i, j, no) => {

        // Check for row and col
        for (let k=0; k<9; k++) {
            if (matrix[k][j] === no || matrix[i][k] === no) {
                return false;
            }
        }

        // Check for subgrid

        let sx = Math.floor(i/3) * 3;
        let sy = Math.floor(j/3) * 3;

        for (let x=sx; x<sx + 3; x++) {
            for(let y = sy; y<sy + 3; y++) {
                if(matrix[x][y] === no) {
                    return false;
                }
            }
        }

        return true;
    }

    const solveSudoku = (matrix, i, j, n) => {

        // Base case
        if (i===n) {
            setMatrixState(matrix);
            return true;
        }

        // Recursive case
        if (j===n) {
            return solveSudoku(matrix, i+1, 0, n);
        }

        // Skip the prefilled cell
        if (matrix[i][j] !== 0) {
            return solveSudoku(matrix, i, j+1, n);
        }

        // Cell to be filled
        // Let's try out all possibilities
        for (let no=1; no<=n; no++) {
            if (isSafe(matrix, i, j, no)) {
                matrix[i][j] = no;
                let solveSubproblem = solveSudoku(matrix, i, j+1, n);
                if (solveSubproblem===true) {
                    return true;
                }
            }
        }

        // No option has worked, backtraking !
        matrix[i][j] = 0;
        return false;
    }

    const main = async () => {
        const n = 9;
        let mat = [...matrixState];
        let solvable = solveSudoku(mat, 0, 0, n);
        if (solvable) {
            setMessage("Solved !")
        } else {
            setMessage("Impossible to solve :(")
        }
        setGamePlayed(true);
    }

    useEffect(async () => {
        await main();
    }, [])


  return (
    <SafeAreaView style={styles.mainContainer}>

        <Text
            style={{
                alignSelf: "center",
                marginBottom: 50,
                fontSize: 30,
                fontFamily: 'monospace'
            }}
        >Sudoku Solver</Text>

        {
            isSelecting === false ?

            <View style={styles.sudokuContainer}>
                {matrixState.map((line, idx) => {
                    return (
                        <View style={styles.line} key={idx}>
                        {
                            line.map((el, index) => {
                                return(
                                    <Pressable 
                                        key={index}
                                        style={styles.sudokuCase}
                                        onPress={() => {
                                            setSelectedCase([idx, index]);
                                            setIsSelecting(true);
                                            console.log(selectedCase)
                                        }}>
                                        <Text style={[el === 0 ? styles.sudokuCaseTextZero : styles.sudokuCaseText]}>{el}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                    )
                    
                })}

                {
                    gamePlayed === false ? 

                    <Pressable
                        style={styles.bottomButton}
                        onPress={() => {
                            main();
                        }}>
                        <Text style={styles.bottomButtonText}>Solve !</Text>
                    </Pressable>

                    :

                    <Pressable
                        style={styles.bottomButton}
                        onPress={() => {
                            // Reset Matrix
                            let m = [];
                            for (let i=0; i<9; i++) {
                                let s = [];
                                for (let j=0; j<9; j++) {
                                    s.push(0);
                                }
                                m.push(s);
                            }
                            setMatrixState(m);
                            setMessage("");
                            setGamePlayed(false);
                        }}>
                        <Text style={styles.bottomButtonText}>New game</Text>
                    </Pressable>

                }
                

                <Text style={{
                    fontSize: 25,
                    alignSelf: "center",
                    marginTop: 15
                }}>{message}</Text>
            </View> 
            
            
            :

            <View>
                <View style={styles.row}>
                    <Pressable 
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 1;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>1</Text>
                    </Pressable>

                    <Pressable 
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 2;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>2</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 3;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>3</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 4;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>4</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 5;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>5</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 6;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>6</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 7;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>7</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 8;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>8</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 9;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}
                        style={styles.case}>
                        <Text style={styles.caseText}>9</Text>
                    </Pressable>
                </View>

                <View>
                    <Pressable 
                        style={styles.bottomButton}
                        onPress={() => {
                            const mat = [...matrixState];
                            mat[selectedCase[0]][selectedCase[1]] = 0;
                            setMatrixState(mat);
                            setIsSelecting(false);
                        }}>
                        <Text style={styles.bottomButtonText}>Erase</Text>
                    </Pressable>
                </View>

                <View>
                    <Pressable 
                        style={styles.bottomButton}
                        onPress={() => {
                            setIsSelecting(false);
                        }}>
                        <Text style={styles.bottomButtonText}>Go back</Text>
                    </Pressable>
                </View>
            </View>
            
        }
        
      
    </SafeAreaView>
  )
}

export default SudokuScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "lightblue"
    },

    sudokuContainer: {

    },

    line: {
        flexDirection: "row"
    },

    row: {
        flexDirection: "row"
    },

    case: {
        borderWidth: 1,
        borderColor: "black",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },

    caseText: {
        fontSize: 25
    },

    bottomButton: {
        width: 150,
        height: 50,
        backgroundColor: "lightgrey",
        marginTop: 20,
        alignSelf: "center",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    bottomButtonText: {
        fontSize: 20
    },

    sudokuCase: {
        borderWidth: 1,
        borderColor: "black",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    sudokuCaseText: {
        fontSize: 20
    },

    sudokuCaseTextZero: {
        fontSize: 20,
        opacity: 0  
    }
})