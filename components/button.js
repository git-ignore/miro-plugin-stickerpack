const getBgColor = (props) => {
	if (props.disabled || props.secondary) {
		return 'transparent'
	}

	return 'rgba(66, 98, 255, 1)'
}

const getBorderColor = (props) => {
	if (props.disabled) {
		return '#dfdfdf'
	}

	if (props.secondary) {
		return '#4c4c4c'
	}

	return 'rgba(66, 98, 255, 1)'
}

const getColor = (props) => {
	if (props.disabled) {
		return '#a9a9a9'
	}

	if (props.secondary) {
		return '#4c4c4c'
	}

	return '#fff'
}

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
		backgroundColor: getBgColor(props),
		borderColor: getBorderColor(props),
		color: getColor(props),
	}} {...props}/>
}