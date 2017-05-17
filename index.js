var Comment = new React.createClass({

	render : function(){
		return (
			<li className="list-group-item">
				<div className="row">
					<div className="col-xs-2 col-md-1">
						<img src="http://placehold.it/80" className="img-circle img-responsive" alt="" /></div>
					<div className="col-xs-10 col-md-11">
						<div>
							<a href="http://www.jquery2dotnet.com/2013/10/google-style-login-page-desing-usign.html">
								{this.props.title}</a>
							<div className="mic-info">
								By: <a href="#">{this.props.author}</a> on {this.props.date}
							</div>
						</div>
						<div className="comment-text">
							<span style={  {color : this.props.color}  }>{this.props.comment}</span>
						</div>
						<div className="action">
							<button type="button" className="btn btn-primary btn-xs" title="Edit">
								<span className="glyphicon glyphicon-pencil"></span>
							</button>
							<button type="button" className="btn btn-success btn-xs" title="Approved">
								<span className="glyphicon glyphicon-ok"></span>
							</button>
							<button onClick={ () => {this.props.handleDelete(this.props.title)} } type="button" className="btn btn-danger btn-xs" title="Delete">
								<span className="glyphicon glyphicon-trash"></span>
							</button>
						</div>
					</div>
				</div>
			</li>
		)
	}
});

var CommentBox = React.createClass({

	getInitialState : function () {
		return {
			displaySize : 3,
			comments: [
				{title: "title 1", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'red'},
				{title: "title 2", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'blue'},
				{title: "title 3", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'yellow'},
				{title: "title 5", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'pink'},
				{title: "title 6", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'green'},
				{title: "title 7", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'red'},
				{title: "title 8", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'maroon'},
				{title: "title 9", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'grey'},
				{title: "title 10", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'aquamarine'},
				{title: "title 11", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'green'},
				{title: "title 12", comment: "React works for the most part", author: "MJ", date: "2 Aug 2013", color : 'green'},
			]
		}
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
			return 	<Comment title={c.title} comment={c.comment} author={c.author} date={c.date} color={c.color} handleDelete={this.handleDelete}/>
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


ReactDOM.render(<CommentBox/>, document.getElementById("app"));


