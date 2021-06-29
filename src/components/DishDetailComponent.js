import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    function RenderDish({ dish }) {
        if (dish !== null) {
            return (
                <div>
                    <FadeTransform in transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    function RenderComments({ comments, postComment, dishId }) {
        if (comments === null || comments.length === 0) {
            return (<div><CommentForm /></div>);
        }
        else {
            const commentList = comments.map((comment) => {
                return (
                    <Fade in>
                        <div key={comment.id}>
                            <li>{comment.comment}</li>
                            <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))}</li>
                            <br />
                        </div>
                    </Fade>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul class="list-unstyled">
                        <Stagger in>
                            {commentList}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish !== null && props.dish !== undefined) { 
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);
    
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }
    
        render() {
            return (
                <React.Fragment>
                    <Button outline color="secondary" onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id=".author" name=".author"
                                        className="form-control"
                                        placeholder="Your Name"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" name="comment"
                                        className="form-control"
                                        rows="6"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

export default DishDetail;