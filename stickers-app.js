import Search from "./components/search.js"
import Stickers from "./components/stickers"
import Navigation, {CATEGORIES} from './components/navigation.js'
import StickerPacks from './components/sticker-packs'
import Button from './components/button'
import {getStickerPacks} from "./api"

const StickerApp = () => {
	const [searchKey, setSearchKey] = React.useState('')
	const [isStickerPacksFetching, setIsStickerPacksFetching] = React.useState(false)
	const [stickerPacks, setStickerPacks] = React.useState([])
	const [selectedPack, setSelectedPack] = React.useState(null)
	const [category, setCategory] = React.useState(CATEGORIES[0])
	const onCategoryChange = React.useCallback((category) => setCategory(category), [setCategory])
	const onStickerPackSelect = React.useCallback((pack) => setSelectedPack(pack), [setSelectedPack])
	const resetStickerPack = React.useCallback(() => setSelectedPack(null), [setSelectedPack])
	const filteredStickerPacks = stickerPacks.filter(stickerPack =>
		(stickerPack.category === category && stickerPack.title.toLowerCase().includes(searchKey.toLowerCase()))
	)
	const openCreatePackModal = React.useCallback(() => {
		miro.board.ui.openModal("/create-sticker-pack.html", {width: 630, height: 500}).then(() => {
			// todo reset state ? reload stickerPacks if one was created?
		});
	}, [])

	React.useEffect(async () => {
		setIsStickerPacksFetching(true)
		const stickerPacks = await getStickerPacks()
		setStickerPacks(stickerPacks)
		setIsStickerPacksFetching(false)
	}, [setStickerPacks])

	return <div style={{padding: '20px', display: 'flex', flexDirection: 'column', height: '100%'}}>
		{!selectedPack && <Search searchKey={searchKey} setSearchKey={setSearchKey}/>}
		{
			isStickerPacksFetching
				? <div className="loader"/>
				: selectedPack
				? <React.Fragment>
					<Button onClick={resetStickerPack} secondary>Back</Button>
					<Stickers stickerPackId={selectedPack.id}/>
				</React.Fragment>
				: <React.Fragment>
					<Navigation currentCategory={category} onCategoryChange={onCategoryChange}/>
					{
						filteredStickerPacks.length > 0
							? (
								<React.Fragment>
									<StickerPacks items={filteredStickerPacks} onStickerPackSelect={onStickerPackSelect}/>
									<Button onClick={openCreatePackModal}>
										Create pack
									</Button>
								</React.Fragment>
							) : (
								<div style={{
									color: 'rgb(165 165 165)',
									padding: '40px 10px',
									cursor: 'pointer',
									lineHeight: '1.6',
									fontSize: '17px'
								}}>We couldn't find matching packs.<br/>
									But you can <span style={{
										color: 'rgba(66, 98, 255, 1)',
										cursor: 'pointer'
									}} onClick={openCreatePackModal}>create your own one</span>
								</div>

							)
					}
				</React.Fragment>
		}

	</div>
}

function bootstrap() {
	const domContainer = document.querySelector('#sticker-app');
	ReactDOM.render(React.createElement(StickerApp), domContainer);

}

miro.onReady(bootstrap)