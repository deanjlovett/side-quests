'use strict';
const { assert } = require('console');
const fs = require('fs');
let __ = require('./util');


const getRandomInt=(min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newNode=(k,i,v)=>{
  let obj = {
    key            : k,
    count          : 1,
    possible_parents_nset : v,   //# factors of k
    factors        : v,
    parent_map   : new Map(),
  }
  return obj;
}

let _factorsmap = new Map();

const get_factors=(n)=>{
  if(_factorsmap.has(n)){
    return _factorsmap.get(n);
  }
  let stop = Math.ceil( Math.sqrt(n) );
  let factors = new Set();
  for(let i=1; i<=stop; ++i){
      if( n % i === 0 ){ 
        factors.add(i);
        factors.add(n/i);
      }
  }
  // slightly fast algorithm
  // 1/2 as many checks if 2 is not a facter
  // factors.add(1);
  // factors.add(n);
  // if( n % 2 === 0){
  //   factors.add(2);
  //   factors.add(n/2);
  //   for(let i=4; i<=stop; i+=2){
  //     if( n % i === 0 ){ 
  //       factors.add(i);
  //       factors.add(n/i);
  //     }
  //   }
  // }
  // for(let i=3; i<=stop; i+=2){
  //   if( n % i === 0 ){ 
  //     factors.add(i);
  //     factors.add(n/i);
  //   }
  // }
  _factorsmap.set(n,factors);
  __.dlog(`=========`);
  __.dlog(`      n: `, n);
  __.dlog(`factors:`,factors);
  return factors;
}
/*
1. rejigger duplicates e => { key:e  ecount:n}
2. get factors for each e, put in map {key:e , ... efacts:{}}
   the factor list are legal parents of this node

3. make map legal childre for this node {key:e , ... child:{e2}}
4.

*/
const solution=(input_arr)=>{
  __.clog('================================');
  __.clog('================================');
  __.dlog(`input_arr:`);
  __.dlog(input_arr)

  // catch obvious case where there will be no triples
  if(input_arr.length<3){
    return {
      count: 0,
      triples: []
    };
  
  } 

  let smap = new Map();
  
  let tobj = undefined;
  input_arr
    // .sort((a,b)=>a-b) // for debug
    // .reduce((a,e,i,arr)=>{

    .forEach((e,i,arr)=>{
      if((tobj = smap.get(e))===undefined){
        smap.set( e, newNode(e,i,get_factors(e)));
      }else{
        assert(tobj.key === e,`tobj.key:${tobj.key} !== e:${e}`)
        tobj.count += 1;
      }
    },smap);
  tobj = undefined;
  
  __.dlog(`smap:`);
  __.dlog(smap);
  smap.forEach((v,k,map)=>{
    v.possible_parents_nset.forEach((pv,pk)=>{
      if(map.has(pk)){
        v.parent_map.set(pk, map.get(pk) );
      }
    });
  });

  __.dlog(`smap:`);
  __.dlog(smap);

  let lucky_triple_count = 0;
  let lucky_triple_list = [];
  let lucky_triple_set = new Set();

  let arr = input_arr;
  let stop = input_arr.length
  for( let child_idx=2; child_idx < stop; ++child_idx){
    let child_key  = arr[child_idx];
    let child_node = smap.get(child_key);

    for(let parent_idx=1; parent_idx < child_idx; ++parent_idx){
      let parent_key  = arr[parent_idx];
      if( ! child_node.factors.has(parent_key) ) continue;
      let parent_node = smap.get(parent_key);

      for(let grandp_idx=0; grandp_idx < parent_idx; ++grandp_idx){
        let grandp_key  = arr[grandp_idx];
        if( ! parent_node.factors.has(grandp_key) ) continue;
        let ltvalue = [grandp_key,parent_key,child_key];
        let ltkey = `${ltvalue}`;
        if(! lucky_triple_set.has(ltkey) ){
          lucky_triple_set.add(ltkey)
          ++lucky_triple_count;
          lucky_triple_list.push(
            [grandp_key, parent_key, child_key]
          );
        }
      }
    }
  }
  lucky_triple_list.sort((a,b)=>{
    if(a[0]!==b[0]) return a[0]-b[0]; 
    if(a[1]!==b[1]) return a[1]-b[1]; 
    if(a[2]!==b[2]) return a[2]-b[2];
    return 0; 
  });
  return {
    count: lucky_triple_count,
    triples: lucky_triple_list
  };
}

if(!__.parseCommandLineArgs('solution')){
  return 0;
}
let strarr = __.getStringsFromCommandLine();
__.dlog(`strarr:`);
__.dlog(strarr);

let validateArr = [];
let validatateFilename = __.getValidateFilename()
if(validatateFilename !== ''){
  __.clog(`reading in validate file:`,validatateFilename);
  let inputValArr = fs.readFileSync(validatateFilename, 'utf-8').split('\n')
  inputValArr.forEach((line)=>{
    validateArr.push(line.split(',').map(elem=>parseInt(elem)))
  });
  __.clog(`validateArr:`);
  __.clog(validateArr);
}


let input_arr = [];
let inputFilename = __.getInputFilename();
if( inputFilename !== '' ){
  __.clog(`reading in file:`,inputFilename);
  __.setVerbose();
  input_arr = fs
    .readFileSync(inputFilename, 'utf-8')
    .split(' ')
    .map(e=>parseInt(e))
    .filter(e=>e!=='0');

  input_arr = input_arr
    .filter((e,i)=>{
      return e!=='0' && e!==0
    })
  __.clog(`input_arr:`);
  __.clog(input_arr);
  
}else{

  while(strarr.length>0){
      let s = strarr.shift();
      if(s.charAt(1)===','){
        input_arr = s.split(',')
          .filter((e,i)=>{
            return e!=='0' && e!==0
          })
          .map((e,i) =>{
            if(i===0) return e;
            return parseInt(e)
          });
      }else{
        input_arr = s.split('')
          .filter((e,i)=>{
            return e!=='0' && e!==0
          })
          .map((e,i) =>{
            if(i===0) return e;
            return parseInt(e)
          });
      }
      if('bB'.includes(input_arr[0])){
        // b: backward single
        //  b,2000,1 s,2000,1 d,2000,1 t,2000,1
        //  b,count,starting_value
        input_arr.shift();
        let count = 2000;
        let start   = 1;
        if(input_arr.length>0){
          count = input_arr.shift();
          if(count>2000) count = 2000;
          if(count<1) count = 1;
        }
        if(input_arr.length>0){
          start = input_arr.shift();
          if(start>999999) start = 999999;
          if(start<1) start = 1;
        } 
        input_arr = [];
        for(let i=1,k=start+count-1; i<=count; ++i,--k){
          input_arr.push(k);
        }
      }else if('sS'.includes(input_arr[0])){
        // s: single
        //  s,2000,1 d,2000,1 t,2000,1
        //  s,count,starting_value
  
        input_arr.shift();
        let count = 2000;
        let start   = 1;
        if(input_arr.length>0){
          count = input_arr.shift();
          if(count>2000) count = 2000;
          if(count<1) count = 1;
        }
        if(input_arr.length>0){
          start = input_arr.shift();
          if(start>999999) start = 999999;
          if(start<1) start = 1;
        } 
        input_arr = [];
        for(let i=1,k=start; i<=count; ++i,++k){
          input_arr.push(k);
        }
      }else if('dD'.includes(input_arr[0])){
        //  d: double
        //  s,2000,1 d,2000,1 t,2000,1
        //  d,count,starting_value
  
        input_arr.shift();
        let count = 2000;
        let start   = 1;
        if(input_arr.length>0){
          count = input_arr.shift();
          if(count>2000) count = 2000;
          if(count<1) count = 1;
        }
        if(input_arr.length>0){
          start = input_arr.shift();
          if(start>999999) start = 999999;
          if(start<1) start = 1;
        } 
        input_arr = [];
        for(let i=1,k=start;i<=count;++i,++k){
          input_arr.push(k); if(++i>count) break;
          input_arr.push(k);
        }
      }else if('tT'.includes(input_arr[0])){
        //  t: triple
        //  s,2000,1 d,2000,1 t,2000,1
        //  t,count,starting_value
  
        input_arr.shift();
        let count = 2000;
        let start   = 1;
        if(input_arr.length>0){
          count = input_arr.shift();
          if(count>2000) count = 2000;
          if(count<1) count = 1;
        }
        if(input_arr.length>0){
          start = input_arr.shift();
          if(start>999999) start = 999999;
          if(start<1) start = 1;
        } 
        input_arr = [];
        for(let i=1,k=start;i<=count;++i,++k){
          input_arr.push(k); if(++i>count) break;
          input_arr.push(k); if(++i>count) break;
          input_arr.push(k);
        }
      }else if('rR'.includes(input_arr[0])){
        // example input
        // r,2000,1,999999,10,15
        // create 2000 entries, value: min 1, max 999999
        // about 10% of time, for each new entry, slip in a copy... somewhere
        // about 15% of time also add 
        // r,count,min,max,%_doubles,%_smaller_values 
        input_arr.shift();
        let count = 2000;
        let min   = 1;
        let max   = 999999;
        let percentdups = 0;
        let percentExtraSmol = 0;
  
        if(input_arr.length>0){
          count = input_arr.shift();
          if(count>2000) count = 2000;
          if(count<1   ) count = 1;
        }
  
        if(input_arr.length>0){
          min = input_arr.shift();
          if(min>999999) min = 999999;
          if(min<1     ) min = 1;
        }
  
        if(input_arr.length>0){
          max = input_arr.shift();
          if(max>999999) max = 999999;
          if(max<1     ) max = 1;
        }
        if(min>max){
          let tmp = min;
          min = max;
          max = tmp;
        }
  
        if(input_arr.length>0){
          percentdups  = input_arr.shift();
          if(percentdups <   0) percentdups =   0;
          if(percentdups > 100) percentdups = 100;
        } 
        if(input_arr.length>0){
          percentExtraSmol  = input_arr.shift();
          if(percentExtraSmol <   0) percentExtraSmol =   0;
          if(percentExtraSmol > 100) percentExtraSmol = 100;
        }
        __.clog(`           count`, count);
        __.clog(`             min`, min);
        __.clog(`             max`, max );
        __.clog(`     percentdups`, percentdups);
        __.clog(`percentExtraSmol`, percentExtraSmol);
  
        input_arr = [];
        // let tmax = max;
        // max = 0;
        for(let i=1;i<=count;++i){
          // max = Math.trunc( max/10)
          // if( max <= 2) max = tmax
          let r = getRandomInt(min,max);
          input_arr.push(r);
  
          // make some dups
          let ddepth=0
          while(percentdups>0 && getRandomInt(0,100)<=percentdups && ddepth<100){
            ++i;
            ++ddepth;
            __.clog(`input_arr dup:`,r, ddepth);
            let idx = getRandomInt(0,input_arr.length-1);
            input_arr.splice(idx,0,r);
          }
          // make smaller keys
          let sdepth=0
          if(percentExtraSmol>0 && getRandomInt(0,100)<=percentExtraSmol){
            let tmax = max;
            for( 
              tmax = Math.trunc( tmax/10); 
              tmax>10; 
              tmax = Math.trunc( tmax/10) 
            ){
              ++i;
              ++sdepth;
              __.clog(`input_arr small:`, r ,sdepth);
              r = getRandomInt(min,tmax);
              input_arr.push(r);
              // make dups of sm
              let sddepth =0
              while(percentdups>0 && getRandomInt(0,100)<=percentdups && sddepth<100){
                ++i;
                ++sddepth;
                __.clog(`input_arr small dup:`,r,sdepth);
                let idx = getRandomInt(0,input_arr.length-1);
                input_arr.splice(idx,0,r);
              }
      
            }
          }
        }
      }
      if('cC'.includes(input_arr[0])){
        // c: just a list of values
        // c0123456789  <= just treat each digit as an item
        // c,0,10,11,999999 <= comma seperated values
        input_arr.shift();
      }
      // __.clog(`input_arr.length:`);
      // __.clog(input_arr.length);
      // __.clog(`input_arr:`);
      // __.clog(input_arr);
      // __.clog(`input_arr:`);
      // __.clog(input_arr.length);
  
      // let obj = solution(input_arr)
      // __.dlog(`array: ${obj.array}`);
      // __.dlog(`lucky triples count: ${obj.count}`);
      // __.dlog(`lucky triples:`);
  
      input_arr = input_arr
        .filter((e,i)=>{
          return e!==0
        })
        
        let obj = solution(input_arr)
        obj.triples.sort((a,b)=>{
          if(a[0]!=b[0]){return a[0]-b[0]}
          else{
            if(a[1]!=b[1]){return a[1]-b[1]}
            else{
              return a[2]-b[2]
            }
          }
        });
        let outputFilename = __.getOutputFilename();
        if(outputFilename !== ''){  
          __.clog(`writing out file:`,outputFilename);
          input_arr.sort((a,b)=>a-b)
          fs.writeFileSync(outputFilename, input_arr.join(' ')); 
        }
      __.clog(`lucky triples:`);
      obj.triples.forEach((e,i)=>{
        __.clog(`${i+1}: ${e}`);
      });
      __.clog(`input array:`, input_arr);
      __.clog(`input array count:`, input_arr.length);
      __.clog(`lucky triples count:`, obj.count);
      __.clog('================================');
      __.clog();
      if( __.getIsSilent()) console.log(obj.count)
  
    }
}
if(input_arr.length===0 || inputFilename !== ' '){
  if(input_arr.length===0){
    input_arr = [1,2,3,4,5,6];
  }

  let outputFilename = __.getOutputFilename();
  if(outputFilename !== ''){  
    __.clog(`writing out file:`,outputFilename);
    fs.writeFileSync(outputFilename, input_arr.join(' ')); 
  }

  let obj = solution(input_arr)
  obj.triples.sort((a,b)=>{
    if(a[0]!=b[0]){return a[0]-b[0]}
    else{
      if(a[1]!=b[1]){return a[1]-b[1]}
      else{
        return a[2]-b[2]
      }
    }
  });
  let otherFilename = __.getOtherFilename();
  if(otherFilename !== ''){  

    __.clog(`==================================`);
    __.clog(`writing out triplets to file:`,otherFilename);
    __.clog(`triplets:`) // obj.triples
    __.clog( obj.triples) // obj.triples
    __.clog(`triplets joined:`) // obj.triples
    let trip = obj.triples.join('\n'); 
    __.clog( trip ) // obj.triples
    __.clog()
    fs.writeFileSync(otherFilename, trip); 
  }
  __.clog(`lucky triples:`);
  obj.triples.forEach((e,i)=>{
    __.clog(`${i+1}: ${e}`);
  });
  __.clog(`input array:`, input_arr);
  __.clog(`input array coount:`, input_arr.length);
  __.clog(`lucky triples count:`, obj.count);
  __.clog('================================');
  __.clog();
  if( __.getIsSilent()) console.log(obj.count)

  let validateError = 0;
  __.clog(`validating:`)
  validateArr.forEach((triplet)=>{
    let errors = 0;
    let e0 = triplet[0];
    let e1 = triplet[1];
    let e2 = triplet[2];

    if( ! get_factors(e2).has(e1) ){
      __.clog(triplet,' *** error:',e1,' not a factor of: ',e2)
    }
    if( ! get_factors(e1).has(e0) ){
      __.clog(triplet,' *** error:',e0,' not a factor of: ',e1)
    }
    let vset = new Set(input_arr);
    if( ! vset.has(e0) ){ __.clog(triplet,' *** error:',e0,' not in list')}
    if( ! vset.has(e1) ){ __.clog(triplet,' *** error:',e1,' not in list')}
    if( ! vset.has(e2) ){ __.clog(triplet,' *** error:',e2,' not in list')}


  });

}



//   let e1;
//   let e2;
//   let e3;
//   const level_3=(j,e1,e2)=>{
//     for(let k=j+1; k<sarr.length; ++k){
  
//       let e3 = sarr[k]; // let e3 = sarr[k];
//       if(e3.factors.has(e2.key)){
//         if( !e2.pairs.has(e3.key) ){
//           e2.pairs.set(e3.key,e3)
//         }

//         let ltvalue = [e1.key,e2.key,e3.key];
//         let ltkey = `${ltvalue}`;

//         if(! lucky_triple_map.has(ltkey) ){
//           ++lucky_triple_count;
//           lucky_triple_map.set(ltkey,ltvalue);
//           lucky_triple_list.push(ltvalue);
//         }
//       }
//     }

//   }
//   for(let i=0; i<sarr.length-2; ++i){
//     let e1 = sarr[i]; // let e1 = sarr[i]; 
//     if( e1.pairs.size>0){
//       e1.pairs.forEach((e2,e2key)=>{
//         level_3(e2key,e1,e2)
//       })
//     }else{
//       for(let j=i+1; j<sarr.length-1; ++j){
//         let e2 = sarr[j]; // let e2 = sarr[j];
//         if(e2.factors.has(e1.key)){
//           level_3(j,e1,e2);
//         }
//       }
//     }
//   }
//   return {
//     array: sarr.map( e => e.key ),
//     count: lucky_triple_count,
//     triples: lucky_triple_list
//   };
// }

// if(!__.parseCommandLineArgs('solution')){
//   return 0;
// }
// let strarr = __.getStringsFromCommandLine();
// __.dlog(`strarr:`);
// __.dlog(strarr);

// while(strarr.length>0){
//     let s = strarr.shift();
//     let input_arr;
//     if(s.charAt(1)===','){
//       input_arr = s.split(',').map( e => parseInt(e));
//     }else{
//       input_arr = s.split('').map( e => parseInt(e));
//     }
//     input_arr.shift();
//     __.dlog(`input_arr:`);
//     __.dlog(input_arr);

//     let obj = solution(input_arr)
//     __.dlog(`array: ${obj.array}`);
//     __.dlog(`lucky triples count: ${obj.count}`);
//     __.dlog(`lucky triples:`);
//     obj.triples.forEach(e=>{
//       __.dlog(`${e}`);
//     })
//     __.dlog();
// }
/*

    1 = 1 1 1       111
    4 = 1 1 1 1 =   111x, 11x1, 1x11, x111

   10 = 1 1 1 1 1 = 111xx, 11x1x, 1x11x, x111x,
                    ||     11xx1, 1x1x1, x11x1, 
                    ||            1xx11, x1x11,  
                    ||                   xx111,  
      = n(n-1)/2!

      = n(n-1)(n-2)/3! =
      = 6*5*4/2*3 = 5*4 = 20 6!/3! /3!
    20 = 1 1 1 1 1 1 = 

    1    3*2     /1   /3*2  
    4    4*3*2   /1   /3*2
    10   5*4*3*2 /2 /3*2  
    20   6*5*4*3*2 /3*2 /3*2
          


...
    
    1 = 11                  : 1  : 2!/2 / 1
    3 = 111 = 11x, 1x1, 11x : n  : 3!/2 / 1
    6 = n(n-1)/2 = 4(3)/2 = 6   4!/2! /2!
      =   n(n-1)(n-2)/3*2         5!/2  / 3*2



    xxx111

    xx1x11
    xx11x1
    xx111x

    x1xx11
    x1x1x1
    x1x11x

    x11xx1
    x11x1x
    x111xx

    1xxx11
    1xx1x1
    1xx11x

    1x1xx1
    1x1x1x
    1x11xx

    11xxx1
    11xx1x
    11x1xx

    111xxx

    


      = n(n-1)(n-2)/3! = 6*5*2/3*2 = 


 
 */