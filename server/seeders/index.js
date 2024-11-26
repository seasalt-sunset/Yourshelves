const { platform } = require('os');
const data = require('./games.json');
const fs = require('fs'); //file system module
const result = data.results.map((value) => {
    return {
        name: value.name,
        slug: value.slug,
        released: value.released,
        tba: value.tba,
        background_image: value.background_image
    }
})
console.log(result);

//convert Json to string
const jsonStr = JSON.stringify(result, null, 4); //prent with 4 spaces indentation

//Write json to a file
fs.writeFile('result.json', jsonStr, (err) => {
    if (err) {
        console.error('Error writing to file:', err)
    } else {
        console.log('Data saved!')
    }
})