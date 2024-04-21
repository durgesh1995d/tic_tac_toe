import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Winner Checking function
  const checkWinner = () => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(square => square !== null)) {
      return 'Draw';
    }
    return null;
  };

  useEffect(() => {
    let winner = checkWinner();
    if (winner) {
      setModalVisible(true);
      setWinner(winner);
    }
  }, [currentPlayer]);

  const handleSquarePress = index => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
    }
  };

  // Restart function
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          resetGame();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Game Over</Text>
            <Text
              style={[
                styles.modalText,
                {
                  color:
                    winner == 'X'
                      ? '#cd4977'
                      : winner == 'O'
                      ? '#cd6c49'
                      : '#e41d1d',
                },
              ]}>
              {winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
                resetGame();
              }}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.headerView}>
        {winner ? (
          <Text style={styles.title}>Player {winner} wins!</Text>
        ) : (
          <Text style={styles.title}>
            Current Player:{' '}
            <Text style={{color: currentPlayer == 'X' ? '#cd4977' : '#cd6c49'}}>
              {currentPlayer}
            </Text>
          </Text>
        )}
      </View>
      <View style={styles.board}>
        {board.map((square, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handleSquarePress(index)}>
            <Text
              style={[
                styles.squareText,
                {color: square == 'X' ? '#cd4977' : '#cd6c49'},
              ]}>
              {square}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a3c1e5',
  },
  headerView: {
    marginBottom: 100,
  },
  title: {
    fontSize: 32,
  },
  board: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  square: {
    width: Dimensions.get('screen').width / 4,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 40,
  },
  button: {
    marginTop: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 26,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#dbcdde',
    borderRadius: 20,
    padding: 35,
    width: Dimensions.get('screen').width / 1.5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default App;
