import Navigation, {CATEGORIES} from './components/navigation'
import Button from './components/button'
import {createPack} from "./api"

const StickerPackNameEditor = ({onNameChange}) => {
	const onChange = React.useCallback((e) => {
		onNameChange(e.target.value)
	}, [onNameChange]);
	return (
		<div className="name-bar">
			<input className="name-input"
				   type="text"
				   placeholder="Name sticker pack"
				   onChange={onChange}
			/>
		</div>
	)
}

const StickerPackCategoryEditor = ({onCategoryChange, currentCategory}) => {
	return (<div style={{
		margin: '0 -34px 0 -24px'
	}}>
		<Navigation onCategoryChange={onCategoryChange} currentCategory={currentCategory}/>
	</div>)
}

const convertToBase64 = (file, onConverted) => {
	const reader = new FileReader();
	reader.onloadend = function () {
		onConverted(reader.result)
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
	const removeImage = React.useCallback(() => {setImageSrc(null)}, [])

	return (
		<div style={{
			width: '130px',
			height: '130px',
			position: 'relative'
		}}>
			{imageSrc
				? (
					<React.Fragment>
						<img style={{
							width: '100%',
							height: '100%',
							borderRadius: '14px'
						}} src={imageSrc}/>
						<div className="delete-btn" onClick={removeImage}>&#x2716;</div>
					</React.Fragment>
				)
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
				flexDirection: 'column'
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
	const uploadMultipleFiles = React.useCallback((e) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);

			Promise.all(files.map(file => {
				return (new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.addEventListener('load', (ev) => {
						resolve(ev.target.result);
					});
					reader.addEventListener('error', reject);
					reader.readAsDataURL(file);
				}));
			}))
				.then(images => {
					setStickers([...stickers, ...images])
				}, error => {
					console.error(error);
				});
		}
	}, [setStickers, stickers])

	const deleteSticker = React.useCallback(stickerToRemove => {
		setStickers(stickers.filter(sticker => sticker !== stickerToRemove))
	}, [stickers, setStickers]);

	return (
		<div
			className="stickers-uploader"
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				overflow: 'scroll',
				margin: '5px -10px',
				flex: 1
			}}>
			<div>
				<input type="file" name="sticker" id="sticker" accept=".jpg, .png, .jpeg, .svg, .gif" className="inputfile" multiple onChange={uploadMultipleFiles}/>
				<label id="stickers-uploader-btn" htmlFor="sticker">Add sticker</label>
			</div>
			{
				stickers.map((img, idx) => (
					<div key={`uploaded-stickers-${idx}`}
						 style={{
							 width: '130px',
							 height: '130px',
							 margin: '10px',
							 borderRadius: '14px',
							 position: 'relative'
						 }}>
						<img src={img} style={{
							width: '100%',
							height: '100%'
						}}/>
						<div className="delete-btn" onClick={() => deleteSticker(img)}>&#x2716;</div>
					</div>
				))
			}
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

	const onClose = React.useCallback(() => miro.board.ui.closeModal(), [])

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
			padding: '28px 24px 20px',
		}}>
			<StickerPackDataEditor stickerPackData={stickerPackData} updatePickerData={updatePickerData}/>
			<StickersUploader stickers={stickerPackData.stickers} setStickers={setStickers}/>
			<div style={{
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<div style={{marginRight: '10px'}}>
					<Button onClick={onClose} secondary>
						Cancel
					</Button>
				</div>
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