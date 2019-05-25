import React from "react";
import { FormGroup, Form, Label, Input, Table} from 'reactstrap';

export default class GetIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            tags:{}
        }
    }
    render(){
        return(
            <div className="container">
            <Form>
                <FormGroup>
                    <Input
                        type="text"
                        id="key"
                        style={{ margin: '1 rem' }}
                        placeholder="Search Ingredient"
                        onChange={evt =>
                            this.handleGet(evt.target.value)
                        }
                        required
                    />
                </FormGroup>
            </Form>
                <Table> 
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Info</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Ingredient</th>
                            <td>{this.state.text.toLowerCase()}</td>
                        </tr>
                        
                        <TagList data={this.state.tags}/>
                        
                    </tbody>
                </Table>
            </div>
        )
    }

    handleGet(key){
        console.log(key);
        if (key !== ""){
            fetch(`https://f5lyq94lv5.execute-api.us-east-1.amazonaws.com/dev/fuzzy-search/${key}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin" : "*" 
                },
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error(res.statusText + " " + res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    if (data != null){
                        this.setState({
                            text: data.text,
                            tags: data.tags
                        })
                    }
                })
                .catch(function(error) {
                    alert(error);
                });
        
        }
    }
}

export class TagList extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        let tags = Object.keys(this.props.data);
        tags = tags.join(", ");
        return(
            <tr>
                <th scope="row">Tags</th>
                <td>{tags.toLowerCase()}</td>
            </tr>
        )}
}