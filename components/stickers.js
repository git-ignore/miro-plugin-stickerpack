import {getStickerPackDetails} from "../api"

const StickerItem = ({src}) => {
	return (
		<img className="draggable-item image-box" style={{
			width: 'calc(50% - 20px)',
			margin: '10px',
			cursor: 'grab'
		}} src={src} data-image-url={src}/>
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
	const [isFetching, setIsFetching] = React.useState(false)
	const [stickers, setStickers] = React.useState([])
	const [details, setDetails] = React.useState({title: null, image: null})
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
				console.log("currentImageUrl", currentImageUrl)
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
		setIsFetching(true)
		const {stickers, title, image} = await getStickerPackDetails(stickerPackId)
		setDetails({title, image})
		setStickers(stickers)
		setIsFetching(false)
	}, [stickerPackId, setIsFetching, setDetails])

	return (
		<div id="stickers-container"
			 style={{margin: '20px -20px -20px', padding: '0 10px', display: 'flex', flexWrap: 'wrap', overflow: 'scroll'}}>
			{isFetching
				? <div className="loader"/>
				: (
					<React.Fragment>
						<div style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							border: '1px solid lightgray',
							borderRadius: '8px',
							margin: '0 10px 20px',
							padding: '10px 15px'
						}}>
							<img src={details.image} style={{
								width: '80px',
								height: '80px',
								display: 'block'
							}}/>
							<span>{details.title}</span>
						</div>
						{stickers.map((sticker, idx) =>
							<StickerItem key={`sticker-item-${sticker.id}`} src={sticker.image}/>
						)}
					</React.Fragment>
				)

			}
		</div>
	)
}
