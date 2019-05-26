import React from "react";
import { FormGroup, Form, Label, Input, Button} from 'reactstrap';

export default class PostIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            tags:""
        }
    }
    render(){
        return(
            <Form>
                <FormGroup>
                <div className="bg-info clearfix" style={{ padding: '.5rem', color: "white" }}>Add New Ingredient</div>
                    <Input
                        type="text"
                        id="textInput"
                        style={{ margin: '1 rem' }}
                        placeholder="Text Description"
                        onInput={evt =>
                            this.setState({
                                text:
                                    evt.target.value
                            })
                        }
                        required
                    />
                    <Input
                        type="textarea"
                        id="tagsInput"
                        style={{ margin: '1 rem' }}
                        placeholder="Tags (enter multiple -> separate by comma)"
                        onInput={evt =>
                            this.setState({
                                tags:
                                    evt.target.value
                            })
                        }
                        required
                    />
                </FormGroup>
                <Button onClick={evt =>this.handleSubmit(evt)}>Submit</Button>
            </Form>
        )
    }

    handleSubmit(evt){
        evt.preventDefault();
        let tagList = this.state.tags.split(",");
        let tags = {};
        tagList.forEach(function(tag) {
            tags[tag] = 1;
        })
        let value = {};
        value["text"] = this.state.text;
        value["tags"] = tags;
        fetch(`https://f5lyq94lv5.execute-api.us-east-1.amazonaws.com/dev/add-ingredients`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*" 
            },
            body: JSON.stringify({
                key: this.state.text,
                value: value
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText + " " + res.status);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                alert("input success!")
            })
            .catch(function(error) {
                alert(error);
            });
        
        
    }
}