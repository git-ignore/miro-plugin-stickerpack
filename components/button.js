export default (props) => {
	return <button style={{
		boxSizing: 'border-box',
		display: 'inline-block',
		border: '1px solid',
		padding: '14px 24px 16px',
		fontSize: '16px',
		borderRadius: '6px',
		textAlign: 'center',
		lineHeight: ' 1',
		cursor: props.disabled ? 'default' : 'pointer',
		verticalAlign: ' middle',
		userSelect: ' none',
		backgroundColor: props.disabled ? 'transparent' : 'rgba(66, 98, 255, 1)',
		borderColoer: props.disabled ? 'grey' : 'rgba(66, 98, 255, 1)',
		color: props.disabled ? 'grey' : '#fff'
	}} {...props}/>
}