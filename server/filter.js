var filterArtistData = (arrayOfArtists) => {
    let resultArray = [];
    for (var i = 0; i < arrayOfArtists.length; i++) {
        var artist = {
            artistID: arrayOfArtists[i].id,
            artistName: arrayOfArtists[i].name,
            artistImage: arrayOfArtists[i].images[1].url
        }
        resultArray.push(artist);
    }
    console.log(resultArray);
    return resultArray;
}

var formatArtistData = (data) => {
    var formattedArray = [];
    if (!data || data.length === 0) {
        return formattedArray;
    } else {
        console.log(data);
        var array = data[0].arrayofartists;
        console.log(array[0].artistID);
        for (var i = 0; i < array.length; i++) {
            var artist = {
                id: array[i].artistID,
                name: array[i].artistName,
                images: ['filler', {url: array[i].artistImage}]
                }
            formattedArray.push(artist);
        }
        return formattedArray;
    }
}
module.exports = {
    filterArtistData: filterArtistData,
    formatArtistData: formatArtistData
}