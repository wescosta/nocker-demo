import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Home extends Component {

	state = {
		page: 1,
		limit: 5,
		movies: [] 
	}

	componentDidMount(){
		this.loadMore()	
	}

	loadMore(){
		let {page, limit} = this.state
		
		fetch(`/api/${page}/${limit}`)
			.then(res => res.json())
			.then(movies => this.setState(previousState => Object.assign({}, previousState, {
				movies: [...previousState.movies, ...movies],
				page: previousState.page++
			})))
	}

	render() {
		let moviesList = this.state.movies.map(movie => (
			<Card key={movie._id}>
				<div class={style.cardHeader}>
					<h2 class=" mdc-typography--title">{movie.title}</h2>
					{/* <div class=" mdc-typography--caption">Welcome to home route</div> */}
				</div>
				<div class={style.cardBody}>
					{movie.markdown}
				</div>
				<Card.Actions>
					<Card.ActionButton>Read on...</Card.ActionButton>
				</Card.Actions>
			</Card>
		))

		return (
			<div class={`${style.home} page`}>
				<h1>Blog posts about Movie Titles</h1>
				{moviesList}
			</div>
		);
	}
}
