//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const translate = require('google-translate-api');
 

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
const directoryPath = process.argv[2];


//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
		translate(file, {to: 'en'}).then(res => {
			console.log(res.text);
			//=> I speak English
			console.log(res.from.language.iso);
			fs.rename(`${directoryPath}\\${file}`, `${directoryPath}\\${res.text}.mp3`, function(err) {
				if ( err ) console.log('ERROR: ' + err);
			});
			//=> nl
		}).catch(err => {
			console.error(err);
		});
       
    });
});