const BASE_URL = 'https://3df623be4f18.ngrok.io'

const getCredentials = async () => {
	const account = await window.miro.account.get()
	const userId = await window.miro.currentUser.getId();

	return {
		accountId: account.id,
		userId
	}
}

const getImageServerFormat = (base64converted) => {
	const base64ServerPart = base64converted.split('base64,')[1]
	const extension = base64converted.split('image/')[1].split(';')[0]
	return `${extension},${base64ServerPart}`
}

const createStickerData = (image) => ({
	id: +new Date(),
	image: getImageServerFormat(image)
})

export const createPack = async (packData) => {
	const {accountId, userId} = await getCredentials()

	const body = JSON.stringify({
		title: packData.name,
		category: packData.category,
		image: getImageServerFormat(packData.preview),
		stickers: packData.stickers.map(createStickerData),
		accountId,
		userId
	})

	const response = await fetch(`${BASE_URL}/sticker-packs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	})

	if (response.ok) {
		return await response.json()
	}

	return Promise.reject('Error HTTP')
}

export const getStickerPacks = async () => {
	const {accountId, userId} = await getCredentials()

	const response = await fetch(`${BASE_URL}/sticker-packs?currentUserId=${userId}&accountId=${accountId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})

	if (response.ok) {
		return await response.json()
	}

	return Promise.reject('Error HTTP')
}

export const getStickerPackDetails = async (stickerPackId) => {
	const {accountId, userId} = await getCredentials()

	const response = await fetch(`${BASE_URL}/sticker-packs/${stickerPackId}?currentUserId=${userId}&accountId=${accountId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})

	if (response.ok) {
		return await response.json()
	}

	return Promise.reject('Error HTTP')
}