export default ({searchKey, setSearchKey}) => {
	const onInputChange = React.useCallback((e) => setSearchKey(e.target.value), [setSearchKey])

	return (
		<div className="search-bar">
			<input
				className="search-input"
				placeholder="Search"
				value={searchKey}
				onChange={onInputChange}
			/>
		</div>
	)
}