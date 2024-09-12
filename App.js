import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new task to the list
  const handleAddTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    setTasks([...tasks, { id: Date.now().toString(), text: newTask }]);
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
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(item)}>
          <Text style={styles.editAction}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.deleteAction}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Input for adding a new task */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputField}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchField}
        placeholder="Search tasks"
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#7C9BCC', 
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  taskText: {
    fontSize: 16,
    flex: 1,
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
});
