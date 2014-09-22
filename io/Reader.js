/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 20 - 09 - 2014
 * LastUpdate: 21 - 09 - 2014
 * version: 0.1.0~beta
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
  //Make all the name to be lower case and split the full string name based on points.
  // This makes easy to check the extension because the extension is always the latest
  // Element of the string divided by a point.
  var fileSplited = file.toLowerCase().split('.');

  //Check for file extension to be 'urm' or 'URM'
  if(fileSplited[fileSplited.length-1] !== 'urm'){
    debug(fileSplited[fileSplited.length-1]);
    throw new Error("Extension for "+file+" not recognized");
  }
  try{
    var content = fs.readFileSync(file,"utf8"),
        contentArr = content.split('\n');

    //If length is less than 2 it means that we don't have operations
    if(contentArr.length < 2){
      throw new Error("Bad set of instructions, read the documents for more information");
    }

    // Check every element on the array for empty lines
    for(var i = contentArr.length, l = i; l--;){
      if(contentArr[l].length === 0){
        contentArr.splice(l,1);
      }
    }
    return contentArr;
  }catch(E){
    debug(E);
    console.error(E.message);
  }
  //If last return doesn't works because of an error
  // return an empty array, this is considered a good practice
  // because the function is expected to return an Array
  return [];
}


//Current version of the function
Reader.__defineGetter__("version",function(){
  return "0.1.0~beta";
});

module.exports = Reader;
