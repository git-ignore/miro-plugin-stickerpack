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
		onConverted(reader.result.split('base64,')[1])
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

const StickersUploader = () => {
	return <div style={{flex: 1}}>Stickers will be placed here</div>
}

const DialogRoot = () => {
	const [stickerPackData, setStickerPackData] = React.useState({
		name: '',
		category: CATEGORIES[0],
		preview: null
	})

	const updatePickerData = React.useCallback((data) => {
		setStickerPackData(Object.assign({}, stickerPackData, data))
	}, [stickerPackData, setStickerPackData])

	const submit = React.useCallback(async () => {
		await createPack(stickerPackData)
	}, [stickerPackData])

	console.log('stickerPackData', stickerPackData)
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			padding: '18px 24px'
		}}>
			<StickerPackDataEditor stickerPackData={stickerPackData} updatePickerData={updatePickerData}/>
			<StickersUploader/>
			<div style={{
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<Button onClick={submit} disabled={!stickerPackData.name || !stickerPackData.preview}>
					ok
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