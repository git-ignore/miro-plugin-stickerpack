export const CATEGORIES = ['personal', 'company', 'shared']

const NavItem = ({children, category, isActive, onSelect}) => {
	const onClick = React.useCallback(() => onSelect(category), [onSelect, category])
	return (<div
		className="nav-item"
		onClick={onClick}
		style={{
			flex: 1,
			padding: '10px',
			textAlign: 'center',
			textTransform: 'capitalize',
			color: isActive ? 'rgba(66, 98, 255, 1)' : 'rgba(5, 0, 56, 1)',
			fontWeight: isActive ? 'bold' : 'normal',
			cursor: isActive ? 'default' : 'pointer'
		}}

	>{children}</div>)
}

export default ({onCategoryChange, currentCategory}) => {
	return <div style={{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}}>
		{
			CATEGORIES.map(category =>
				<NavItem
					isActive={currentCategory === category}
					onSelect={onCategoryChange}
					category={category}
					key={category}>
					{category}
				</NavItem>)
		}
	</div>
}
