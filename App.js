import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Alert, Switch } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);  // Dark mode state

  // Add a new task to the list
  const handleAddTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
    setNewTask('');
  };

  // Remove a task from the list
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Update an existing task
  const handleUpdateTask = () => {
    setTasks(
      tasks.map(task =>
        task.id === currentTask.id ? { ...task, text: newTask } : task
      )
    );
    setNewTask('');
    setIsModalVisible(false);
  };

  // Mark task as complete/incomplete
  const toggleTaskComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Open modal with the task to be edited
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setNewTask(task.text);
    setIsModalVisible(true);
  };

  // Filter tasks based on search input
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render each task item
  const renderTaskItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTaskComplete(item.id)}>
      <View style={[styles.taskItem, item.completed && styles.completedTask]}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.text}</Text>
        <View style={styles.taskActions}>
          <TouchableOpacity onPress={() => handleEditTask(item)}>
            <Text style={styles.editAction}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <Text style={styles.deleteAction}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[styles.appContainer, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>To-Do List</Text>

      {/* Dark mode toggle */}
      <View style={styles.darkModeToggle}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={handleToggleDarkMode} />
      </View>

      {/* Input for adding a new task */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.inputField, darkMode && styles.darkInputField]}
          placeholder="Add a new task"
          placeholderTextColor={darkMode ? '#BBB' : '#555'}
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput
        style={[styles.searchField, darkMode && styles.darkInputField]}
        placeholder="Search tasks"
        placeholderTextColor={darkMode ? '#BBB' : '#555'}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* List of tasks */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal for editing a task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput
            style={styles.modalInput}
            value={newTask}
            onChangeText={setNewTask}
          />
          <View style={styles.modalButtonGroup}>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTask}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FEECD6',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#7C9BCC',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    borderColor: '#A39FE1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFDDE4',
  },
  darkInputField: {
    backgroundColor: '#555',
    borderColor: '#888',
    color: '#FFFFFF',
  },
  searchField: {
    borderColor: '#A39FE1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFDDE4',
  },
  taskItem: {
    backgroundColor: '#FEC6DF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedTask: {
    backgroundColor: '#C6F7E1',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskActions: {
    flexDirection: 'row',
  },
  editAction: {
    color: '#007FFF',
    marginRight: 10,
  },
  deleteAction: {
    color: '#FF00FF',
  },
  addButton: {
    backgroundColor: '#9BB8ED',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalContainer: {
    marginTop: '40%',
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#7C9BCC',
  },
  modalInput: {
    borderColor: '#A39FE1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFDDE4',
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#DEB3E0',
    borderRadius: 5,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: '#FEC6DF',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  darkModeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
