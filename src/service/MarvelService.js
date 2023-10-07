class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=67075fdaa0160dc50efca809e8b579b4'; 
    _baseOffset = 0;

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error('Error')
        }

        return await res.json();
    } 

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
        
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name || 'No name',
            description: (char.description.length < 20 ? char.description : char.description.substring(0, 210) + '...') || 'No description.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, 
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

}

export default MarvelService;