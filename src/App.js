import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import Projects from './Components/Projects';
import $ from 'jquery';
import './App.css';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';

class App extends Component{
  constructor() {
    super();
    this.state = {
      projects : []
    }

  }


  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function() {
          console.log(this.state);
          
        });

      }.bind(this), 
      error: function(xhr, status, err){
        console.log(err);
        
      }
    });

  }

  getProjects() {
    this.setState({projects : [
      {
        id: uuid(),
        title: 'Business Webiste',
        category: 'Web Design'
      },
      {
        id: uuid(),
        title: 'Socail App',
        category: 'Mobile Development'
      },
      {
        id: uuid(),
        title: 'ECommerce Shopping Cart',
        category: 'Web Development'
      }
    ] });
  }
  componentDidMount() {
    this.getProjects();
    this.getTodos();
  }

  componentWillMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
    
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects});
    
  }

  render() {
    return (
      <div className="App">
      <AddProject addProject = {this.handleAddProject.bind(this)}/>
      <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}  />
      <hr />
      <Todos todos={this.state.todos}  />
      </div>
    );
  }
  
}

export default App;
