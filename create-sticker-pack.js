import Navigation, {CATEGORIES} from './components/navigation'
import Button from './components/button'
import {createPack} from "./api"

const StickerPackNameEditor = ({onNameChange}) => {
	const onChange = React.useCallback((e) => {
		onNameChange(e.target.value)
	}, [onNameChange]);
	return <input type="text"
				  placeholder="Name sticker pack"
				  style={{padding: '4px 8px', height: '30px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '18px'}}
				  onChange={onChange}
	/>
}

const StickerPackCategoryEditor = ({onCategoryChange, currentCategory}) => {
	return (<div style={{
		margin: '0 -10px'
	}}>
		<Navigation onCategoryChange={onCategoryChange} currentCategory={currentCategory}/>
	</div>)
}

const convertToBase64 = (file, onConverted) => {
	const reader = new FileReader();
	reader.onloadend = function () {
		const base64 = reader.result.split('base64,')[1]
		const extension = reader.result.split('image/')[1].split(';')[0]
		const res = `${extension},${base64}`

		onConverted(res)
	};

	reader.readAsDataURL(file)
}

const StickerPackPreviewImageEditor = ({onPreviewChange}) => {
	const [imageSrc, setImageSrc] = React.useState(null);
	const onImageChange = React.useCallback((event) => {
		if (event.target.files && event.target.files[0]) {
			const img = event.target.files[0];
			setImageSrc(URL.createObjectURL(img))
			convertToBase64(img, onPreviewChange)
		}
	}, [setImageSrc, onPreviewChange])

	return (
		<div style={{
			width: '140px',
			height: '140px'
		}}>
			{imageSrc
				? <img style={{
					width: '100%',
					height: '100%',
					borderRadius: '8px'
				}} src={imageSrc}/>
				: (
					<React.Fragment>
						<input type="file" name="file" id="file" className="inputfile" onChange={onImageChange}/>
						<label htmlFor="file">Add preview image</label>
					</React.Fragment>
				)}

		</div>
	)
}

const StickerPackDataEditor = ({stickerPackData, updatePickerData}) => {
	const updateStickerPackName = React.useCallback((name) => {
		updatePickerData({name})
	}, [updatePickerData])

	const updateStickerPackCategory = React.useCallback((category) => {
		updatePickerData({category})
	}, [updatePickerData])

	const updateStickerPackPreview = React.useCallback((preview) => {
		updatePickerData({preview})
	}, [updatePickerData])

	return (
		<div style={{
			display: 'flex',
			justifyContent: 'space-between'
		}}>
			<div style={{
				flex: 1,
				display: 'flex',
				flexWrap: 'wrap'
			}}>
				<StickerPackNameEditor onNameChange={updateStickerPackName}/>
				<StickerPackCategoryEditor currentCategory={stickerPackData.category} onCategoryChange={updateStickerPackCategory}/>
			</div>
			<div style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<StickerPackPreviewImageEditor onPreviewChange={updateStickerPackPreview}/>
			</div>
		</div>
	)
}

const StickersUploader = ({setStickers, stickers}) => {
	const addFileToData = React.useCallback((sticker) => setStickers([...stickers, {id: +new Date(), image: sticker}]), [stickers, setStickers])
	const [files, setFiles] = React.useState([])
	const uploadMultipleFiles = React.useCallback((event) => {
		if (event.target.files.length) {

			for (let i = 0; i <= event.target.files.length; i++) {
				const img = event.target.files[i]
				setFiles([...files, URL.createObjectURL(img)])
				convertToBase64(img, addFileToData)
			}
		}
	}, [files, stickers, setFiles, addFileToData])

	return (
		<div
			className="stickers-uploader"
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				overflow: 'scroll',
				margin: '-10px',
				flex: 1
			}}>
			{
				files.map((img, idx) => (
					<img key={`uploaded-stickers-${idx}`} src={img} style={{
						width: '130px',
						height: '130px',
						margin: '10px'
					}}/>
				))
			}
			<div>
				<input type="file" name="sticker" id="sticker" accept=".jpg, .png, .jpeg, .svg, .gif" className="inputfile" onChange={uploadMultipleFiles}/>
				<label id="stickers-uploader-btn" htmlFor="sticker">Add sticker</label>
			</div>
		</div>
	)
}

const DialogRoot = () => {
	const [isCreationFetching, setIsCreationFetching] = React.useState(false)
	const [stickerPackData, setStickerPackData] = React.useState({
		name: '',
		category: CATEGORIES[0],
		preview: null,
		stickers: []
	})

	const updatePickerData = React.useCallback((data) => {
		setStickerPackData(Object.assign({}, stickerPackData, data))
	}, [stickerPackData, setStickerPackData])

	const setStickers = React.useCallback((newStickers) => updatePickerData({stickers: newStickers}), [updatePickerData])

	const submit = React.useCallback(async () => {
		setIsCreationFetching(true)
		await createPack(stickerPackData)
		setIsCreationFetching(false)
		miro.board.ui.closeModal()
	}, [stickerPackData, setIsCreationFetching])

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			padding: '18px 24px',
		}}>
			<StickerPackDataEditor stickerPackData={stickerPackData} updatePickerData={updatePickerData}/>
			<StickersUploader stickers={stickerPackData.stickers} setStickers={setStickers}/>
			<div style={{
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<Button onClick={submit} disabled={!stickerPackData.name || !stickerPackData.preview || isCreationFetching}>
					{isCreationFetching ? 'Loading..' : 'Submit'}
				</Button>
			</div>
		</div>
	)
}

function bootstrap() {
	const domContainer = document.querySelector('#create-sticker-pack');
	ReactDOM.render(React.createElement(DialogRoot), domContainer);

}

miro.onReady(bootstrap)