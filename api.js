const BASE_URL = 'https://3df623be4f18.ngrok.io'

const getCredentials = async () => {
	const account = await window.miro.account.get()
	const userId = await window.miro.currentUser.getId();

	return {
		accountId: account.id,
		userId
	}
}

export const createPack = async (packData) => {
	const {accountId, userId} = await getCredentials()

	const body = JSON.stringify({
		title: packData.name,
		category: packData.category,
		image: packData.preview,
		stickers: packData.stickers,
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

export const getStickersInPack = async (stickerPackId) => {
	const {accountId, userId} = await getCredentials()

	const response = await fetch(`${BASE_URL}/sticker-packs/${stickerPackId}?currentUserId=${userId}&accountId=${accountId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})

	if (response.ok) {
		const stickerPack = await response.json()
		return stickerPack.stickers
	}

	return Promise.reject('Error HTTP')
}