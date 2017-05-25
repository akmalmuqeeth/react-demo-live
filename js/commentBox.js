import React from 'react'
import Comment from './comment'
import axios from 'axios'


var CommentBox = React.createClass({

	getInitialState : function () {
		return {
			displaySize : 3,
			comments: []
		}
	},

	componentWillMount : function(){
		console.log('componentWillMount triggered')
	},

	componentDidMount : function(){
		console.log('componenetDidMount triggered')

		axios.get('https://sheetlabs.com/AAM/comments')
			.then( (response) => {
				this.setState({
					comments : response.data
				})
			})
			.catch(function (error) {
				console.log(error);
			});

	},

	handleSubmit : function(event){
		event.preventDefault();
		var newlyAddedComment = this.addedComment.value;
		var commentNode = {title: "title 1", comment: newlyAddedComment, author: "MJ", date: "2 Aug 2013", color : 'red'};
		var newComments = this.state.comments.concat(commentNode);
		this.setState({
			displaySize : this.state.displaySize,
			comments : newComments
		});
	},

	handleDelete : function(title){
		var comments = this.state.comments.filter(function(c){
			return c.title != title;
		});
		this.setState({displaySize : this.state.displaySize, comments : comments});
	},

	handleShowMore : function(){
		this.setState({
			displaySize : this.state.displaySize + 3,
			comments : this.state.comments
		});
	},

	render : function(){

		var commentsToDisplay = this.state.comments.slice(0, this.state.displaySize)
		var commentNodes = commentsToDisplay.map((c)=>{
			return 	<Comment {...c}   handleDelete={this.handleDelete}/>
		});

		return (
			<div className="container">
				<div className="row">
					<div className="panel panel-default widget">
						<div className="panel-heading">
							<form onSubmit={this.handleSubmit}>
								<textarea ref={  (comment) => { this.addedComment = comment}  } name="commentsForm" id="commentsForm" cols="30" rows="10"></textarea>
								<button type="submit">Add comment</button>
							</form>
						</div>
						<div className="panel-heading">
							<span className="glyphicon glyphicon-comment"></span>
							<h3 className="panel-title">
								Recent Comments</h3>
							<span className="label label-info">78</span>
						</div>
						<div className="panel-body">
							<ul className="list-group">
								{commentNodes}
							</ul>
							<a onClick={this.handleShowMore} className="btn btn-primary btn-sm btn-block" role="button"><span className="glyphicon glyphicon-refresh"></span> More</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

export default CommentBox