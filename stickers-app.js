const images = [
	{src: 'img/Asset_1.svg', width: 267.02, height: 218.31},
	{src: 'img/Asset_11.svg', width: 204.36, height: 375.54},
	{src: 'img/Asset_12.svg', width: 252.37, height: 254.81},
	{src: 'img/Asset_13.svg', width: 262.87, height: 364.2},
	{src: 'img/Asset_14.svg', width: 256.19, height: 365.41},
	{src: 'img/Asset_15.svg', width: 259.2, height: 181.74},
	{src: 'img/Asset_17.svg', width: 255, height: 175.65},
	{src: 'img/Asset_18.svg', width: 249.34, height: 225.69},
	{src: 'img/Asset_19.svg', width: 257.34, height: 305.2},
	{src: 'img/Asset_20.svg', width: 245.67, height: 174.88},
	{src: 'img/Asset_21.svg', width: 263.63, height: 246.18},
	{src: 'img/Asset_22.svg', width: 254.62, height: 334.65},
	{src: 'img/Asset_23.svg', width: 251.08, height: 234.84},
	{src: 'img/Asset_24.svg', width: 251.44, height: 270.31},
	{src: 'img/Asset_25.svg', width: 246.51, height: 278.04},
	{src: 'img/Asset_26.svg', width: 125.58, height: 123.66},
	{src: 'img/Asset_27.svg', width: 109.91, height: 213.59},
	{src: 'img/Asset_28.svg', width: 215.6, height: 156.79},
	{src: 'img/Asset_29.svg', width: 193.6, height: 195.33},
	{src: 'img/Asset_3.svg', width: 239.27, height: 281.26},
	{src: 'img/Asset_32.svg', width: 139.77, height: 150.23},
	{src: 'img/Asset_33.svg', width: 127.36, height: 162.64},
	{src: 'img/Asset_34.svg', width: 163.54, height: 211.2},
	{src: 'img/Asset_35.svg', width: 212.54, height: 93.78},
	{src: 'img/Asset_36.svg', width: 160.19, height: 110.65},
	{src: 'img/Asset_37.svg', width: 188.59, height: 127.25},
	{src: 'img/Asset_38.svg', width: 247.68, height: 473.78},
	{src: 'img/Asset_39.svg', width: 282.79, height: 213.35},
	{src: 'img/Asset_40.svg', width: 228.45, height: 139.07},
	{src: 'img/Asset_41.svg', width: 213.14, height: 168.79},
	{src: 'img/Asset_42.svg', width: 239.71, height: 196.94},
	{src: 'img/Asset_43.svg', width: 174.07, height: 262.56},
	{src: 'img/Asset_45.svg', width: 134.8, height: 118.42},
	{src: 'img/Asset_46.svg', width: 220.27, height: 159.99},
	{src: 'img/Asset_47.svg', width: 137.35, height: 113.94},
	{src: 'img/Asset_48.svg', width: 233.98, height: 277.4},
	{src: 'img/Asset_49.svg', width: 103.23, height: 109.1},
	{src: 'img/Asset_50.svg', width: 234.95, height: 265.47},
	{src: 'img/Asset_51.svg', width: 155.91, height: 133.13},
	{src: 'img/Asset_52.svg', width: 199.46, height: 163.54},
	{src: 'img/Asset_53.svg', width: 224.52, height: 222.51},
	{src: 'img/Asset_54.svg', width: 315.1, height: 278.03},
	{src: 'img/Asset_55.svg', width: 197, height: 85.03},
	{src: 'img/Asset_56.svg', width: 70.92, height: 108.35},
	{src: 'img/Asset_6.svg', width: 265, height: 177.19},
	{src: 'img/Asset_7.svg', width: 215.65, height: 138.67},
	{src: 'img/Asset_8.svg', width: 251.67, height: 266.92},
	{src: 'img/Asset_9.svg', width: 211.51, height: 246.24},
]

function getImage(img) {
	return `<div class="draggable-item image-box">
						<img src="${img.src}" data-image-url="https://realtimeboard.com/api/awesome-plugins/plugins/rtb_sticker_pack/${img.src}">
			</div>`
}

function addShapes(container) {
	container.innerHTML += `<div class="shape draggable-item green" data-color="0ca788">I am shape</div><div class="shape draggable-item red" data-color="f24726">Me too</div>`
}

function addImages(container) {
	container.innerHTML += images.map((i) => getImage(i)).join('')
}

function createImage(canvasX, canvasY, url) {
	return miro.board.widgets.create({
		type: 'image',
		url: url,
		x: canvasX,
		y: canvasY,
	})
}

const Search = () => {
	const [searchKey, setSearchKey] = React.useState('');
	const onInputChange = React.useCallback((e) => setSearchKey(e.target.value), [setSearchKey])

	return <input
		placeholder="Search"
		value={searchKey}
		onChange={onInputChange}
		style={{padding: '4px 8px', height: '30px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '18px'}}
	/>
}

const StickerItem = ({src}) => {
	const realSrc = `https://realtimeboard.com/api/awesome-plugins/plugins/rtb_sticker_pack/${src}`;
	return (
		<img className="draggable-item image-box" style={{
			flex: '1',
			width: 'calc(50% - 20px)',
			margin: '10px',
		}} src={realSrc} data-image-url={realSrc}/>
	)
}

const Stickers = ({images}) => {
	return (
		<div id="stickers-container"
			 style={{margin: '0 -20px', padding: '0 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', overflow: 'scroll', height: '100%'}}>
			{images.map((image, idx) =>
				<StickerItem key={`sticker-item-${idx}`} src={image.src}/>
			)}
		</div>
	)
}

const NavItem = ({children}) => <div style={{
	flex: 1,
	padding: '10px',
	textAlign: 'center'
}}>{children}</div>

const Navigation = () => {
	return <div style={{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}}>
		<NavItem>Personal</NavItem>
		<NavItem>Company</NavItem>
		<NavItem>Shared</NavItem>
	</div>
}

const StickerApp = () => {
	return <div style={{padding: '20px', display: 'flex', flexDirection: 'column', height: '100%'}}>
		<Search/>
		<Navigation/>
		<Stickers images={images}/>
	</div>
}

function bootstrap() {
	const domContainer = document.querySelector('#sticker-app');
	ReactDOM.render(React.createElement(StickerApp), domContainer);

	let currentImageUrl
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

}

miro.onReady(bootstrap)