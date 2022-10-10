'use strict';
let __ = require('./util');

let _factorsmap = new Map()
function get_factors(n){
  if(_factorsmap.has(n)){
    return _factorsmap.get(n);
  }
  let stop = Math.ceil( Math.sqrt(n) );
  let factors = new Set();
  for(let i=0; i<=stop; ++i){
      if( n % i === 0 ){ 
        factors.add(i);
        factors.add(n/i);
      }
  }
  _factorsmap.set(n,factors);
  return factors;
}

const solution=(input_arr)=>{
  __.clog(`input_arr:`);
  __.clog(input_arr)

  let sarr = input_arr
    .sort((a,b)=>a-b)
    .map((e,i,arr)=>{ 
      return {
        key:e, 
        pairs:[], 
        factors: get_factors(e)
      } 
    });
  __.clog(sarr)

  let lucky_triple_count = 0;
  let lucky_triple_list = [];
  let lucky_triple_map = new Map();
  let lucky_triple_set = new Set();

  for(let i=0; i<sarr.length-2; ++i){
    __.clog(`===============`);
    __.clog(`i:`,i);
    let e1 = sarr[i]; 
    __.clog(`e1:`,e1);

    for(let j=i+1; j<sarr.length-1; ++j){
      __.clog(`  ===============`);
      __.clog(`  j:`,i);
      let e2 = sarr[j];
      __.clog(`  e2:`,e2);
      if(e2.factors.has(e1.key)){
        for(let k=j+1; k<sarr.length; ++k){

          __.clog(`    ===============`);
          __.clog(`    k:`,i);

          let e3 = sarr[k];
          __.clog(`    e3:`,e3);
          if(e3.factors.has(e2.key)){
            let ltvalue = [e1.key,e2.key,e3.key];
            let ltkey = `${ltvalue}`;
            if(! lucky_triple_map.has(ltkey) ){
              ++lucky_triple_count;
              lucky_triple_map.set(ltkey,ltvalue);
              lucky_triple_list.push(ltvalue);
            }
          }
        }
      }
    }
  }
  return {
    array: sarr.map( e => e.key ),
    count: lucky_triple_count,
    triples: lucky_triple_list
  };
}

if(!__.parseCommandLineArgs('solution')){
  return 0;
}
let strarr = __.getStringsFromCommandLine();
__.clog(`strarr:`);
__.clog(strarr);

while(strarr.length>0){
    let s = strarr.shift();
    let input_arr;
    if(s.charAt(1)===','){
      input_arr = s.split(',').map( e => parseInt(e));
    }else{
      input_arr = s.split('').map( e => parseInt(e));
    }
    input_arr.shift();
    __.clog(`input_arr:`);
    __.clog(input_arr);

    let obj = solution(input_arr)
    __.clog(`array: ${obj.array}`);
    __.clog(`lucky triples count: ${obj.count}`);
    __.clog(`lucky triples:`);
    obj.triples.forEach(e=>{
      __.clog(`${e}`);
    })
    __.clog();
}
