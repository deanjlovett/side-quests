'use strict';
const { assert } = require('console');
const fs = require('fs');
let __ = require('./util');


let p=[2,3,5];
let ps = new Set(p);
let max_prime_index = p.length-1;
let max_prime_value = p[max_prime_index]

// need an ordered hash map of primes
function getprimes(limit){
    debug_log(`inside getprimes(lim:${limit})`);
    
    for(let i=p[p.length-1]+2; i<=limit; i+=2){
        let stop=Math.ceil( Math.sqrt( i ) ) + 1;
        let isItPrime=true;
        for( let j=0; j<p.length && p[j]<stop; ++j){
            if( i % p[j] === 0 ){
                isItPrime = false;
                break;
            }
        }
        if( isItPrime ){
            p.push(i);
            ps.add(i);
        }
    }  
    // debug_log('primes:');
    // debug_log(p);
}

function getprimeatindex(maxindex){
    while(p.length <= maxindex){
        getnextprime();
    }
    return p[maxindex];
}


function getnextprime(){
    // debug_log(`inside getnextprime()`);
    let foundIt = false;
    let i=p[p.length-1]+2;
    for(; !foundIt; i+=2){
        let stop=Math.ceil( Math.sqrt( i ) ) + 1;
        let isItPrime=true;
        for( let j=0; j<p.length && p[j]<stop; ++j){
            if( i % p[j] === 0 ){
                isItPrime = false;
                break;
            }
        }
        if( isItPrime ){
            p.push(i);
            ps.add(i);
            foundIt = true;
            break;
        }
    }
    let nextPrime = i;
    // debug_log('  next prime: ', nextPrime);

    max_prime_index = p.length-1;
    max_prime_value = p[max_prime_index]

    return nextPrime;
}
function debug_log(...args){
    return __.dlog(...args)
}

function getsomeprimes(limit){
    // debug_log(`inside getsomeprimes(limit:${limit})`);

    if(p[p.length-1]>=limit) {
        return;
    } 
    debug_log();
    debug_log(`number of primes: ${p[p.length-1]}`);
    debug_log(`      max  prime: ${p.length}`);
    debug_log(`getting more primes upto: `,limit);
    debug_log();

    let i=p[p.length-1]+2;
    let ic = 0;
    let lic = 2;
    let it = 1;
    for( ; p[p.length-1]<limit; i+=2,++it){
        // for(let i=p[p.length-1]+2; p[p.length-1]<limit; i+=2){

        let stop=Math.ceil( Math.sqrt( i ) ) + 1;
        let isItPrime=true;
        for( let j=0; j<p.length && p[j]<stop; ++j){
            if( i % p[j] === 0 ){
                isItPrime = false;
                // process.stdout.write('.')
                break;
            }
        }
        if( isItPrime ){
            p.push(i);
            ps.add(i);
            ++ic;
            let tic = Math.trunc( Math.log2(ic) );
            if( tic > lic ){
                // lic = lic*2;
                ++lic;
                process.stdout.write(` ${ic}`)
            }
        }
    }  
    debug_log();
    debug_log(`this many more tested: `, it)
    debug_log(`this many more found:  `, ic)
    debug_log();
    // let arrps = [...p].sort((a,b)=>a-b)
    // debug_log('primes set:');
    // debug_log(arrps);
    // debug_log('primes:');
    // debug_log(p);
    max_prime_index = p.length-1;
    max_prime_value = p[max_prime_index]

}

function isItPrime(n){
    if( n > max_prime_value ){
        getsomeprimes( n );
    }
    return ps.has(n);
}


let _factorsmap = new Map();
const get_factors=(n)=>{
    if(_factorsmap.has(n)){
      return _factorsmap.get(n);
    }
    let factors = new Set([1,n]);
    if( isItPrime(n) ){
        return factors;
    }
    let stop = Math.ceil( Math.sqrt(n) );
    let last = n;
    // for(let i=2; i<last && i<=stop; ++i){
    for(let i=2; i<=last; ++i){
        if( n % i === 0 ){ 
           factors.add(i);
           last = n/i;
           factors.add(last);
        }
    }
    factors = new Set([
        Array
            .from(factors)
            .sort((a,b)=>a-b)
    ]);
    _factorsmap.set(n,factors)
    return factors;
}

let _primefactorsmap = new Map();
const get_prime_factors=(n)=>{
    if(_primefactorsmap.has(n)){
      return _primefactorsmap.get(n);
    }
    if( isItPrime(n) ){
        return new Set([n]);
    }
    let stop = Math.ceil( Math.sqrt(n) )+1;
    __.clog(`stop: `,stop)
    let pfactors = new Set();
    let w = n;
    for(let i=0; w>1 && p[i]<=stop; ++i){
        let tp = p[i];
        __.clog(`w: `,w,`  tp: `,tp)
        if( w % tp === 0 ){
            __.clog(`w: `,w,`  %  tp: `,tp,`  == 0 !!`)
            __.clog(`          tp: `,tp,` <<== a prime factor`)
            pfactors.add(tp);
            w /= tp;
            while( w % tp === 0 )
                w /= tp;
            if( isItPrime(w) ){
                __.clog(`w: `,w,`        <<== a prime factor`)

                pfactors.add(w);
                break;
            }
        }
        getprimeatindex(i+1);
    }
    _primefactorsmap.set(n,pfactors)
    return pfactors;
}
  
    
 
if(!__.parseCommandLineArgs('solution')){
    return 0;
}
let nums = __.getNumbersFromCommandLine();
while(nums.length>0){
    let n = nums.shift();
    let facters = get_factors(n);
    let ptime_factors = get_prime_factors(n)

    __.clog();
    __.clog(n, `:       factors: `, facters )
    __.clog(n, `: prime factors: `, ptime_factors )

    __.slog(n, ptime_factors, facters)
}
