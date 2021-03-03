// 'Result' is a simple functional component.
const Result = ({props}) => {
	// deconstruct props.
	const author = props.author
	const points = props.points || 0
	const signage = points >= 0 ? '+' : '–'
	const title = props.title || props.story_title
	const url = props.url || props.story_url
	const numComments = props.numComments || 0
	// convert date to readable string.
	const date = (new Date(props.created_at)).toLocaleDateString()

	return (
		<div className='result'>
			<h3>
				<span className='points'>
					{signage}
					{Math.abs(points)}
				</span>
				<a href={url}>{title}</a>
			</h3>
			<p>
				<span>
					{'posted by '}
					<u>{author}</u>
					{' on '}
					{date}
				</span>
				<span>
					{numComments} comments
				</span>
			</p>
		</div>
	)
}

export default Result
