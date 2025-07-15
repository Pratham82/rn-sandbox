import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform,
} from 'react-native';
import { TodoType } from '../types';
import CheckBox from '@react-native-community/checkbox';

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState<string>('');
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    background: isDarkMode ? '#121212' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    surface: isDarkMode ? '#1e1e1e' : '#f5f5f5',
    border: isDarkMode ? '#333333' : '#cccccc',
    inputBackground: isDarkMode ? '#1e1e1e' : '#ffffff',
    inputText: isDarkMode ? '#ffffff' : '#000000',
    placeholder: isDarkMode ? '#888888' : '#666666',
    checkboxTint: isDarkMode ? '#007bff' : '#007bff',
  };

  const onInputChange = (text: string) => {
    setTodo(text);
  };

  const addTodo = () => {
    if (todo.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: Math.floor(Math.random() * 200) + 1,
          isDone: false,
          title: todo.trim(),
        },
      ]);
    }
    setTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(item =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView
      style={[styles.todoContainer, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.heading, { color: colors.text }]}>Todo App</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="Enter Todo"
          placeholderTextColor={colors.placeholder}
          style={[
            styles.inputStyles,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
              color: colors.inputText,
            },
          ]}
          value={todo}
          onChangeText={onInputChange}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.buttonStyles} onPress={addTodo}>
          <Text style={styles.buttonTextStyles}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[styles.todoItemStyles, { backgroundColor: colors.surface }]}
          >
            <View style={styles.todoContent}>
              <CheckBox
                value={item.isDone}
                onValueChange={() => toggleTodo(item.id)}
                tintColor={colors.checkboxTint}
                onCheckColor={colors.checkboxTint}
                onTintColor={colors.checkboxTint}
                tintColors={{
                  true: colors.checkboxTint,
                  false: colors.border,
                }}
                style={styles.checkbox}
              />
              <Text
                style={[
                  styles.todoText,
                  {
                    color: colors.text,
                    textDecorationLine: item.isDone ? 'line-through' : 'none',
                    opacity: item.isDone ? 0.6 : 1,
                  },
                ]}
              >
                {item.title}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.placeholder }]}>
              No todos yet. Add one above!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  inputStyles: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    flex: 1,
    fontSize: 16,
  },
  buttonStyles: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 60,
  },
  buttonTextStyles: {
    fontSize: 16,
    color: 'white',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  todoItemStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    minHeight: 50,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 12,
    ...(Platform.OS === 'android' && {
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    }),
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
