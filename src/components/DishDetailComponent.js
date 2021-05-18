import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

    }

    renderDish(dish) {
        if (dish !== null) {
            return (
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    renderComments(comments) {
        if (comments === null || comments.length === 0) {
            return (<div></div>);
        }
        else {
            const commentList = comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}</li>
                        <br />
                    </div>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul class="list-unstyled">
                        {commentList}
                    </ul>
                </div>
            );
        }
    }

    render() {
        if (this.props.dish !== null && this.props.dish !== undefined) { 
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}

export default DishDetail;