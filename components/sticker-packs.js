const StickerPackItem = ({stickerPack, onStickerPackSelect}) => {
	const onClick = React.useCallback(() => onStickerPackSelect(stickerPack), [onStickerPackSelect, stickerPack])
	return (
		<div style={{
			width: 'calc(50% - 20px)',
			margin: '10px',
			cursor: 'pointer'
		}}>
			<img style={{
				width: '100%',
				height: 'auto'
			}} src={stickerPack.image} onClick={onClick} alt={stickerPack.title}/>
			<div style={{
				fontSize: '14px',
				lineHeight: '1.6',
				textAlign: 'center'
			}}>{stickerPack.title}</div>
		</div>
	)
}

export default React.memo(({items, onStickerPackSelect}) => {
	return (
		<div
			style={{
				margin: '10px -20px',
				padding: '0 10px',
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				flexWrap: 'wrap',
				overflow: 'scroll',
				flex: 1

			}}>
			{items.map((stickerPack, idx) =>
				<StickerPackItem key={`sticker-pack-item-${idx}`} stickerPack={stickerPack} onStickerPackSelect={onStickerPackSelect}/>
			)}
		</div>
	)
})