/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 20 - 09 - 2014
 * LastUpdate: 21 - 09 - 2014
 * version: 0.0.1~alpha
 *
 * Name: Reader.js
 *
 * Description:
 *   Simple function for reading Synchronously a urm file
*/

const debug = require('debug')('IO'),
      fs = require("fs");

/**
 * Function for reading a file based on extension.
 * Parameters:
 *   * String - file
 *       The name for the file to read.
 * Returns:
 *   * Array - elements
 *       An array where every element is one line of the file provided
*/
function Reader(file){
  if(!file){
    throw new Error("File not provided, nothing to do.");
  }else if((typeof file) !== 'string'){
    throw new Error("Type of 'file' provided not recognized");
  }

  var fileSplited = file.toLowerCase().split('.');

  if(fileSplited[fileSplited.length-1] !== 'urm'){
    debug(fileSplited[fileSplited.length-1]);
    throw new Error("Extension for "+file+" not recognized");
  }
  try{
    var content = fs.readFileSync(file,"utf8"),
        contentArr = content.split('\n');
    if(contentArr.length < 2){
      throw new Error("Bad set of instructions, read the documents for more information");
    }
    return contentArr;
  }catch(E){
    debug(E);
    console.error(E.message);
  }
  return [];
}



module.exports = Reader;
