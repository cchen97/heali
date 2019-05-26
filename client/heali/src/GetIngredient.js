import React from "react";
import { FormGroup, Form, Table} from 'reactstrap';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015

export default class GetIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            tags:{},
            allIngredients:[]
        }
    }
    componentDidMount() {
        fetch(`https://f5lyq94lv5.execute-api.us-east-1.amazonaws.com/dev/ingredients`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin" : "*" 
                },
            })
                .then(res => {
                    if (res.ok > 200) {
                        throw Error(res.statusText + " " + res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data != null){
                        var keyList = [];
                        data.forEach(function(i) {
                            keyList.push(i.key);
                        });
                        this.setState({
                            allIngredients: keyList
                        })
                    }
                })
                .catch(function(error) {
                    alert(error);
                });
    }
    render(){
        return(
            <div className="container">
            <div className="bg-info clearfix" style={{ padding: '.5rem', color: "white" }}>Search Ingredient</div>
            <Form>
                <FormGroup>
                    <Typeahead
                        id="key"
                        style={{ margin: '1 rem' }}
                        placeholder="Search Ingredient"
                        onInputChange={(text, evt) =>
                            this.handleGet(text)
                        }
                        options={this.state.allIngredients}
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
        if (key !== ""){
            fetch(`https://f5lyq94lv5.execute-api.us-east-1.amazonaws.com/dev/fuzzy-search/${key}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin" : "*" 
                },
            })
                .then(res => {
                    if (res.status > 200) {
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