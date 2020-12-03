export default () => {
	const [searchKey, setSearchKey] = React.useState('');
	const onInputChange = React.useCallback((e) => setSearchKey(e.target.value), [setSearchKey])

	return <input
		placeholder="Search"
		value={searchKey}
		onChange={onInputChange}
		style={{
			padding: '4px 8px',
			height: '30px',
			border: '1px solid #d9d9d9',
			borderRadius: '4px',
			fontSize: '18px',
			marginBottom: '10px'
		}}
	/>
}