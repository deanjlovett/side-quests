'use strict';

/*

put this in ./util folder
with links inside ./someother/util
inside folder ./someother
$ ln -s ../util util


to use in a file... include this line:
let __ = require('./util');
or
let __ = require('./util/util');

*/

/*
 * debugging boilerplate
 * begin
**/
const dline = '========================';
const sline = '------------------------';

let _isSilent  = false;
let _isVerbose = false;
let _isDebug   = false;
let _inFile    = '';
let _outFile   = '';
let _otherFile = '';
let _validateFile = '';

function setSilent(val=true)  {_isSilent=val};
function setVerbose(val=true) {_isVerbose=val};
function setDebug(val=true)   {_isDebug=val};

function getIsSilent()  {return _isSilent};
function getIsVerbose() {return _isVerbose};
function getIsDebug()   {return _isDebug};

function progdot(){ if(!_isSilent) process.stdout.write('.');}

function clog(...args){ if(              !_isSilent) console.log(...args);}
function dlog(...args){ if(_isDebug   && !_isSilent) console.log(...args);}
function vlog(...args){ if(_isVerbose && !_isSilent) console.log(...args);}
function slog(...args){ if(               _isSilent) console.log(...args);}

function clogdline(){ clog(dline);}
function clogsline(){ clog(sline);}

function dlogdline(){ dlog(dline);}
function dlogsline(){ dlog(sline);}

function vlogdline(){ dlog(dline);}
function vlogsline(){ dlog(sline);}

function setInputFilename(s){_inFile=s;}
function getInputFilename(){return _inFile;}

function setOutputFilename(s){_outFile=s;}
function getOutputFilename(){return _outFile;}

function setOtherFilename(s){_otherFile=s;}
function getOtherFilename(){return _otherFile;}

function setValidateFilename(s){_validateFile=s;}
function getValidateFilename(){return _validateFile;}

/*
 * end
 * debugging boilerplate
**/
let nums = [];
let _strarr = [];
function getNumbersFromCommandLine(){return nums;}
function getStringsFromCommandLine(){return _strarr;}

function parseCommandLineArgs(name='something',extraArr=[]){
    
    let isError = false;
    let unknownArgs = [];
    const myArgs = process.argv.slice(2);
    let smyArgs = myArgs.slice(); // save a copy

    /*
    hey look, it is data drive
    note:  add flags and functtion to set them, here
    note:  the area nums hold any INTEGERS found
    */
    let arglist = [
      {key:['-d','--debug'  ], params:0, val: setDebug   },
      {key:['-v','--verbose'], params:0, val: setVerbose },
      {key:['-s','--silent' ], params:0, val: setSilent  },
      {key:['-i','--input'  ], params:1, val: setInputFilename  },
      {key:['-o','--output' ], params:1, val: setOutputFilename  },
      {key:['-f','--file'   ], params:1, val: setOtherFilename  },
      {key:['--val','--valid','--validate'], params:1, val: setValidateFilename  },
    ];

    let argmap          = new Map();
    let argmapWithParms = new Map();
    let last = -1;
    let lastObj = null;
    arglist.forEach((e,i,arr)=>{
      e.key.forEach((v)=>{
        // argmap.set( v.toLowerCase(), e.val);
        argmap.set( v.toLowerCase(), e );
      });
    });
    let skipNext = false;
    myArgs.forEach((e,i,arr)=>{
      if( skipNext ){
        skipNext = false;
        return;
      }
      let se = e.toLowerCase();
      let testNum   = parseInt(e);
      if( argmap.has(se) ) {
        let obj = argmap.get(se);
        switch( obj.params){
          case 0:
            obj.val(); // look it up and call it.
            break;
          case 1:
            if(arr.length-1>=i+1){
              obj.val(arr[i+1])
              skipNext = true;
            }
            break;
          default:
            // error
        }
        // argmap.get(se)(); // look it up and call it.
      }else if(!isNaN(testNum)){
        nums.push(testNum);
      }else if(e.charAt(0)=='-'){
        isError = true;
        unknownArgs.push(e);
      }else{
        _strarr.push(e);
      }
    });
    if(isError || unknownArgs.length > 0){
        console.log();
        console.log('unknown args:',unknownArgs )
        // let shelp = myArgs[0].toLowerCase();
        // if( shelp === '-h' || '--help')
        console.log();
        console.log(`usage: node ${name}.js [number ...] [-d | --debug] [-v | --verbose] [-s | --silent]`);
        console.log();
        console.log('       -d or --debug.  : extra debugging output');
        console.log('       -v or --verbose : extra chatty output');
        console.log('       -s or --silent  : only output the answer');
        console.log();
        extraArr.forEach((e,i,arr)=>{
            console.log(e);
        });
        // console.log('Starting number, equal to or less than input number, produces the longest collatz sequence (chain of numbers)?');
        // console.log();
        // console.log('Default number is 13.');
        console.log();
        return(false);
    }

    dlog()
    dlog('calling args: ',smyArgs)
    dlog()
    if(_inFile.length>0)    clog(' input filename:', _inFile  )
    if(_outFile.length>0)   clog('output filename:', _outFile )
    if(_otherFile.length>0) clog(' other filename:', _otherFile )
    if(_isVerbose)          clog(' verbose set to:', _isVerbose)
    if(_isDebug)            clog('   debug set to:', _isDebug)
    if(nums.length>0)       dlog(' integers found on command line:', nums);
    return true;
}

// a quick and dirty factorial
let _factmap = new Map();
_factmap.set(0,1);
_factmap.set(1,1);
_factmap.set(2,2);
_factmap.set(3,6);
let _factmapmaxn = 3;
let _depth=0
//let _dspace=''
function factorial(n){
  // ++_depth;
  // let _dspace = ' '.repeat(_depth);
  let fact = NaN;
  // if( _depth > 20)
  // {
  //   clog(`*** to deep ***`)
  //   --_depth;
  //   return 1;
  // }
  // clog(`${_dspace}factorial(n:${n})`)  
  if( _factmap.has(n) ){
    // clog(`${_dspace}looked it up`)  
    fact =  _factmap.get(n);
  } 
  else if( n < 0           ) fact = NaN;
  else if( n < 2           ) fact = 1;
  else{
    fact = n * factorial(n-1);
    _factmap.set(n,fact);
    // clog(`${_dspace}calculate and save`)  
  }
  // clog(`${_dspace}factorial = ${fact})`)  
  // --_depth;
  return fact;
}

const getRandomInt=(min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  // _isSilent, _isDebug, _isVerbose,
  setSilent, setVerbose, setDebug,
  getIsSilent, getIsVerbose, getIsDebug,
  progdot,
  clog, dlog, vlog, slog,
  clogdline, clogsline,
  dlogdline, dlogsline,
  vlogdline, vlogsline,
  getNumbersFromCommandLine,
  getStringsFromCommandLine,
  parseCommandLineArgs,
  factorial,
  getRandomInt,
  setInputFilename,  getInputFilename,
  setOutputFilename, getOutputFilename,
  setOtherFilename, getOtherFilename,
  setValidateFilename, getValidateFilename,

};

/*
// example of use #1

if(!__.parseCommandLineArgs('solution')){
    return 0;
}
let strarr = __.getStringsFromCommandLine();
while(strarr.length>0){
    let s = strarr.shift();
    if(!'<->'.includes(s.charAt(0))) s = s.substring(1);
    let salutes = ''+solution(s)
    __.clog(`s: ${s}`);
    __.clog(`salutes: ${salutes}`);
    __.clog();
}

// example of use #2

if(!__.parseCommandLineArgs('solution')){
    return 0;
}
let nums = __.getNumbersFromCommandLine();
while(nums.length>0){
    let x = nums.shift();
    let y = nums.length>0 ? nums.shift() : x;
    let id = ''+solution(x,y)
    __.clog(`x,y: (${x},${y}) = id: ${id}`);
    __.clog();
}


*/
