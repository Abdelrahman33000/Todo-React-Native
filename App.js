import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSave = () => {
    if (name.trim() !== "" && description.trim() !== "") {
      setTodos([...todos, { name, description }]);
      setName("");
      setDescription("");
    }
  };

  const handleTodoPress = (todo) => {
    navigation.navigate("TodoDetails", { todo });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        Todo App
      </Text>
      <TextInput
        style={{
          width: "80%",
          height: 40,
          backgroundColor: "white",
          margin: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Enter your Todo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          width: "80%",
          height: 40,
          backgroundColor: "white",
          margin: 15,
          paddingHorizontal: 10,
        }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="     Save     " onPress={handleSave} />
      <View
        style={{
          width: "80%",
          height: 1,
          backgroundColor: "white",
          marginVertical: 20,
        }}
      />
      {todos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => handleTodoPress(todo)}>
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "gray",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, width: 300 }}>
              {todo.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TodoDetailsScreen = ({ navigation, route }) => {
  const { todo } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        {todo.name}
      </Text>
      <Text style={{ fontSize: 18, color: "white" }}>{todo.description}</Text>
      <Button title="Go Back" onPress={handleGoBack} />
    </View>
  );
};

const App = () => {
  return (
    //     <NavigationContainer>
    //       <Stack.Navigator>
    //         <Stack.Screen name="Todo App" component={HomeScreen} />
    //         <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} />
    //       </Stack.Navigator>
    //     </NavigationContainer>

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Todo App"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
          }}
        />
        <Tab.Screen
          name="TodoDetails"
          component={TodoDetailsScreen}
          options={{
            tabBarIcon: () => <AntDesign name="bars" size={24} color="black" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
