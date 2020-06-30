import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';

class AddProject extends Component {
    constructor() {
        super();
        this.state = {
            newProject : {}
        }
    }

    static defaultProps = {
        categories : ['Web Design', 'Mobile Development', 'Web Development']
    }

    handleSubmit(e){
        if(this.refs.title.value === '') {
            alert("Title is empty");
        }
        else{
            this.setState({newProject:{
                id: uuid(),
                title: this.refs.title.value,
                category: this.refs.category.value
            }}, function() {
                this.props.addProject(this.state.newProject);           
            });
        }
        e.preventDefault();
        
    }  
  
  render() {
      let categoryOptions = this.props.categories.map(category => {
          return <option key={category} value={category}>{category}</option>
      });
      return (
        <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                <label>Title </label>  =====
                    <input type="text" ref="title" />
            </div>
            <br />
            <div>
                <label>Category</label> =====
                <select ref="category" > {categoryOptions}
                    </select>
            </div>
            <br/>
            <input type="submit" value='Submit' />
        </form>
    </div>
      );
  }
}

export default AddProject;
