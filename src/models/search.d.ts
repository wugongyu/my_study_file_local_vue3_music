export interface SearchHotDetail {
	searchWord: string;
	score: number;
	content: string;
	source: number;
	iconType: number;
	iconUrl?: string;
	url: string;
	alg: string;
}

export interface SearchSuggest {
	albums: SearchSuggestAlbums[];
	artists: SearchSuggestArtists[];
	songs: SearchSuggestSongs[];
	playlists: SearchSuggestPlaylists[];
	order: string[];
}
export interface SearchSuggestAlbums {
	id: number;
	name: string;
	artist: SearchSuggestAlbumsArtist;
	publishTime: number;
	size: number;
	copyrightId: number;
	status: number;
	picId: number;
	mark: number;
}
export interface BasicSearchSuggestItem {
  id: number;
	name: string;
	picUrl: string;
	alias: string[];
	albumSize: number;
	picId: number;
	img1v1Url: string;
	img1v1: number;
}
export interface SearchSuggestAlbumsArtist extends BasicSearchSuggestItem {
	alia: string[];
	trans?: any;
}
export interface SearchSuggestArtists extends BasicSearchSuggestItem {
	transNames: string[];
	alia: string[];
	trans: string;
}
export interface SearchSuggestSongsArtists extends BasicSearchSuggestItem {
	trans?: any;
}
export interface SearchSuggestSongsAlbumArtist extends BasicSearchSuggestItem {
	trans?: any;
}
export interface SearchSuggestSongsAlbum {
	id: number;
	name: string;
	artist: SearchSuggestSongsAlbumArtist;
	publishTime: number;
	size: number;
	copyrightId: number;
	status: number;
	picId: number;
	mark: number;
}
export interface SearchSuggestSongs {
	id: number;
	name: string;
	artists: SearchSuggestSongsArtists[];
	album: SearchSuggestSongsAlbum;
	duration: number;
	copyrightId: number;
	status: number;
	alias: any[];
	rtype: number;
	ftype: number;
	mvid: number;
	fee: number;
	rUrl?: any;
	mark: number;
}
export interface SearchSuggestPlaylists {
	id: number;
	name: string;
	coverImgUrl: string;
	creator?: any;
	subscribed: boolean;
	trackCount: number;
	userId: number;
	playCount: number;
	bookCount: number;
	specialType: number;
	officialTags?: any;
	action?: any;
	actionType?: any;
	description?: any;
	highQuality: boolean;
}
