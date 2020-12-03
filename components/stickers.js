import {getStickersInPack} from "../api"

const StickerItem = ({src}) => {
	return (
		<img className="draggable-item image-box" style={{
			width: 'calc(50% - 20px)',
			margin: '10px',
		}} src={`data:image/jpeg;base64,${src}`} data-image-url={`data:image/jpeg;base64,${src}`}/>
	)
}

let currentImageUrl

function createImage(canvasX, canvasY, url) {
	return miro.board.widgets.create({
		type: 'image',
		url: url,
		x: canvasX,
		y: canvasY,
	})
}

export default ({stickerPackId}) => {
	const [stickers, setStickers] = React.useState([])
	React.useEffect(() => {
		if (!stickers.length) {
			return
		}

		const imageOptions = {
			draggableItemSelector: 'img',
			onClick: async (targetElement) => {
				const url = targetElement.getAttribute('data-image-url')
				const widget = (await createImage(0, 0, url))[0]
				miro.board.viewport.zoomToObject(widget)
			},
			getDraggableItemPreview: (targetElement) => {
				//drag-started
				currentImageUrl = targetElement.getAttribute('data-image-url')
				return {
					width: 100,
					height: 100,
					url: currentImageUrl,
				}
			},
			onDrop: (canvasX, canvasY) => {
				console.log('onDrop 1')
				createImage(canvasX, canvasY, currentImageUrl)
			},
		}
		miro.board.ui.initDraggableItemsContainer(document.getElementById('stickers-container'), imageOptions)
	}, [stickers])

	React.useEffect(async () => {
		const stickers = await getStickersInPack(stickerPackId)
		setStickers(stickers)
	}, [stickerPackId])

	return (
		<div id="stickers-container"
			 style={{margin: '0 -20px', padding: '0 10px', display: 'flex', flexWrap: 'wrap', overflow: 'scroll', height: '100%'}}>
			{stickers.map((image, idx) =>
				<StickerItem key={`sticker-item-${idx}`} src={image.src}/>
			)}
		</div>
	)
}
