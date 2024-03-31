import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo"
          value={todoText}
          onChangeText={text => setTodoText(text)}
        />
        <Button title="Add Todo" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text
              style={[styles.todoText, item.completed ? styles.completed : null]}
              onPress={() => toggleTodo(item.id)}
            >
              {item.text}
            </Text>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
});

export default TodoApp;
