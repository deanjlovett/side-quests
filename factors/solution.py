from math import sqrt
from math import log10
import time

def calc_runtime(lucky_triple_count,start_time):
    rt = time.time() - start_time

    lrt = round(log10(rt))
    if lrt > -1:
        return '{0}  {1:.3f}'.format(lucky_triple_count,rt)
    elif lrt > - 2:
        return '{0}  {1:.4f}'.format(lucky_triple_count,rt)
    elif lrt > - 3:
        return '{0}  {1:.5f}'.format(lucky_triple_count,rt)
    elif lrt > - 4:
        return '{0}  {1:.6f}'.format(lucky_triple_count,rt)
    elif lrt > - 5:
        return '{0}  {1:.7f}'.format(lucky_triple_count,rt)
    return '{0}  {1:.8f}'.format(lucky_triple_count,rt)


def solution(inlist):
    # Your code here
    # print ('inlist size: '+ str(len(inlist)))
    # print (str(inlist))
    start_time = time.time()

    class Node:
        def __init__(self,k,v):
            self.key     = k
            self.factors = v
            self.count   = 1
 
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                factors[n/i] = n/i
        factor_dict[n] = factors
        return factors

    smap = {}
    for key in inlist:
        if key in smap:
            smap[key].count += 1
        else:
            smap[key] = Node(key,get_factors(key))

    lucky_triple_count = 0

    arr = inlist
    keymap = {}
    lt_list =[]

    for gi in range(0,len(arr)-2):
        gk = arr[gi]
        # sgk =str(gk)
        for pi in range(gi+1,len(arr)-1):
            pk = arr[pi]
            # spk = str(pk)
            if not gk in smap[pk].factors:
                continue
            for ci in range(pi+1,len(arr)):
                ck = arr[ci]
                # sck = str(ck)
                if not pk in smap[ck].factors:
                    continue
                ka = [gk,pk,ck]
                ks = str(ka)
                if keymap.has_key(ks):
                    continue
                keymap[ks]=ka
                lt_list.append(ka)
                # if len(arr) < 20:
                #     print(ka)
                lucky_triple_count += 1

    # def masort(e):
    #     if e[0]!=
    # if(a[0]!==b[0]) return a[0]-b[0]; 
    # if(a[1]!==b[1]) return a[1]-b[1]; 
    # if(a[2]!==b[2]) return a[2]-b[2];
    # return 0; 


    # if len(lt_list)<30:
    #     lt_list.sort()
    #     for e in lt_list:
    #         print(str(e))


    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)

####################################################################################
####################################################################################
####################################################################################

def sol_1(inlist):
    start_time = time.time()

    # Your code here
    # print ('inlist size: '+ str(len(inlist)))
    # print (str(inlist))
    arr = inlist[:]
    arr.reverse()

    class Node:
        def __init__(self,k,v):
            self.key     = k
            self.factors = v
            #self.count   = 1
 
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                factors[n/i] = n/i
        factor_dict[n] = factors
        return factors

    smap = {}
    for key in inlist:
        if not key in smap:
            smap[key] = Node(key,get_factors(key))

    lucky_triple_count = 0

    keymap = {}

    for gi in range(0,len(arr)-2):
        gk = arr[gi]
        gfactors = smap[gk].factors
        for pi in range(gi+1,len(arr)-1):
            pk = arr[pi]
            if not pk in gfactors:
                continue
            pfactors = smap[pk].factors
            for ci in range(pi+1,len(arr)):
                ck = arr[ci]
                if not ck in pfactors:
                    continue
                ka = '['+str(gk)+','+str(pk)+','+str(ck)+']'
                if keymap.has_key(ka):
                    continue
                keymap[ka]=ka
                # if len(arr) < 20:
                #     print(ka)
                lucky_triple_count += 1


    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)


####################################################################################
####################################################################################
####################################################################################
def sol_2(inlist):
    start_time = time.time()

    # Your code here
    # print ('inlist size: '+ str(len(inlist)))
    # print (str(inlist))

    class Node:
        def __init__(self,k,v):
            self.key     = k
            self.factors = v
            self.count   = 1
 
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                factors[n/i] = n/i
        factor_dict[n] = factors
        return factors

    smap = {}
    for key in inlist:
        if key in smap:
            smap[key].count += 1
        else:
            smap[key] = Node(key,get_factors(key))

    lucky_triple_count = 0

    arr = inlist
    keymap = {}

    for gi in range(0,len(arr)-2):
        gk = arr[gi]
        for pi in range(gi+1,len(arr)-1):
            pk = arr[pi]
            if not gk in smap[pk].factors:
                continue
            for ci in range(pi+1,len(arr)):
                ck = arr[ci]
                if not pk in smap[ck].factors:
                    continue
                ka = '['+str(gk)+','+str(pk)+','+str(ck)+']'
                if keymap.has_key(ka):
                    continue
                keymap[ka]=ka
                # if len(arr) < 20:
                #     print(ka)
                lucky_triple_count += 1

    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)

####################################################################################
####################################################################################
####################################################################################



def sol_3(inlist):
    start_time = time.time()

    # print('inlist:')
    # print(inlist)
    # Your code here

    ########################
    #
    #   helper functions
    #
    ########################

    ########################
    #
    # get the factors
    #
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                factors[n/i] = n/i
        factor_dict[n] = factors
        return factors
    #
    ########################

    # solve the problem

    # reverse the inlist
    alist = inlist[:]
    alist.reverse()
    # print('alist:')
    # print(alist)

    triplet_list = []

    keyToFactorsMap = {}
    for key in alist:
        if not keyToFactorsMap.has_key(key):
            keyToFactorsMap[key] = get_factors(key)

    aleft  = []
    aright = []
    for idx in range(len(alist)):
        aleft.append({})
        aright.append({})

    for lidx in range(0,len(alist)-1):
        le = alist[lidx]
        lfactors = keyToFactorsMap[le]
        for ridx in range(lidx+1,len(alist)):
            re = alist[ridx]
            if not re in lfactors: 
                continue
            ( aleft[ridx])[le]=le
            (aright[lidx])[re]=re

    lucky_triple_count = 0
    lastval = 0
    for idx in range(1,len(alist)-1):
        val = alist[idx]
        # if val == lastval:
        #     continue
        lo =  aleft[idx]
        ro = aright[idx]
        lucky_triple_count += len(lo)*len(ro)

        for re in ro:
            s = ''+str(re)+','+str(alist[idx])
            for le in lo:
                r = s+','+str(le)
                # print(r)
        lastval = val

    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)


####################################################################################
####################################################################################
####################################################################################

#
# compressing duplicates
#

def sol_4(inlist):
    start_time = time.time()

    # print('inlist:')
    # print(inlist)
    # Your code here

    ########################
    #
    #   helper functions
    #
    ########################

    ########################
    #
    # get the factors
    #
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                factors[n/i] = n/i
        factor_dict[n] = factors
        return factors
    #
    ########################

    # solve the problem

    # reverse the inlist
    blist = inlist[:]
    blist.reverse()
    #print('blist:')
    #print(blist)

    lastkey = 0
    dlist = []
    alist = []
    for key in blist:
        if key==lastkey:
            dlist[-1] += 1
            continue
        else:
            dlist.append(1)
            alist.append(key)
        lastkey = key

    #print('alist:')
    #print(alist)
    #print('dlist:')
    #print(dlist)

    triplet_list = []

    keyToFactorsMap = {}
    for key in alist:
        if not keyToFactorsMap.has_key(key):
            keyToFactorsMap[key] = get_factors(key)

    aleft  = []
    aright = []
    for idx in range(len(alist)):
        aleft.append({})
        aright.append({})

    for lidx in range(0,len(alist)-1):
        le = alist[lidx]
        lfactors = keyToFactorsMap[le]
        for ridx in range(lidx+1,len(alist)):
            re = alist[ridx]
            if not re in lfactors: 
                continue
            ( aleft[ridx])[le]=le
            (aright[lidx])[re]=re

    lucky_triple_count = 0

    # # first element is a triple
    # if dlist[0] > 2:
    #     # print('first element is a triple')
    #     lucky_triple_count += 1
    #     # s = str(alist[0])
    #     # r= s+','+s+','+s
    #     # # print(r)

    # # first element is a double
    # if dlist[0]>1:
    #     # print('first element is a double... at least')
    #     me = str(alist[idx])
    #     lo =  aleft[idx]
    #     ro = aright[idx]

    #     lucky_triple_count += len(lo) #*len(ro)
    #     lucky_triple_count += len(ro) #*len(ro)

    #     # sme = me + ',' + me
    #     # for le in lo:
    #     #     s = sme + ',' + str(le)
    #     #     # print(s)
    #     # for re in ro:
    #     #     s = str(re) + ',' + sme
    #     #     # print(s)

    # print('regular elements')

    for idx in range(0,len(alist)):
        me = str(alist[idx])
        lo =  aleft[idx]
        ro = aright[idx]

        if dlist[idx]>2:
            # print('mid element is a triple... at least')
            lucky_triple_count += 1
            # s = me
            # r= s+','+s+','+s
            # # print(r)

        if dlist[idx]>1:
            # print('mid element is a double... at least')
            lucky_triple_count += len(lo) #*len(ro)
            lucky_triple_count += len(ro) #*len(ro)
            # sme = me + ',' + me
            # for le in lo:
            #     s = sme + ',' + str(le)
            #     # print(s)
            # for re in ro:
            #     s = str(re) + ',' + sme
            #     # print(s)

        else:
            lucky_triple_count += len(lo)*len(ro)

            # for re in ro:
            #     s = ''+str(re)+','+ me
            #     for le in lo:
            #         r = s + ',' +str(le)
            #         # print(r)

    # # last element is a double
    # if dlist[-1]>1:
    #     # print('last element is a double... at least')

    #     lucky_triple_count += len(lo) #*len(ro)
    #     lucky_triple_count += len(ro) #*len(ro)
    #     me  = str(alist[-1])
    #     sme = me + ',' + me
    #     for le in lo:
    #         s = sme + ',' + str(le)
    #         # print(s)
    #     for re in ro:
    #         s = str(re) + ',' + sme
    #         # print(s)

    # # last element is a triple
    # if dlist[-1] > 2 and alist[-1] != alist[0]:
    #     # print('last element is a triple')
    #     lucky_triple_count += 1
    #     s = str(alist[-1])
    #     r= s + ',' + s + ',' + s
    #     # print(r)


    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)


####################################################################################
####################################################################################
####################################################################################

#
# compressing duplicates
#

def sol_5(inlist):
    start_time = time.time()

    # Your code here

    # print('inlist:')
    # print(inlist)

    if len(inlist)<3:
        return 0

    ########################
    #
    #   helper functions
    #
    ########################

    ########################
    #
    # get the factors
    #
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                factors[n/i] = n/i
        factor_dict[n] = factors
        return factors
    #
    ########################

    # solve the problem

    # reverse the inlist
    blist = inlist[:]
    blist.reverse()

    #
    # take note of duplicate runs
    # count duplicates in run
    # compress duplicate runs to one element
    #
    dlist = [] # count for each element in alist
    alist = [] # main list, without dup runs
    #
    # todo: turn dlist & alist into single list with an object
    #
    lastkey = 0
    for key in blist:
        if key==lastkey:
            dlist[-1] += 1
            continue
        else:
            dlist.append(1)
            alist.append(key)
        lastkey = key
    
    keyToFactorsMap = {}
    for key in alist:
        if not keyToFactorsMap.has_key(key):
            keyToFactorsMap[key] = get_factors(key)


    aleft  = []
    aright = []
    for idx in range(len(alist)):
        aleft.append({})
        aright.append({})

    for lidx in range(0,len(alist)-1):
        le = alist[lidx]
        lfactors = keyToFactorsMap[le]
        for ridx in range(lidx+1,len(alist)):
            re = alist[ridx]
            if not re in lfactors: 
                continue
            ( aleft[ridx])[le]=le
            (aright[lidx])[re]=re

    # if len(alist)<30:
    #     print('inlist: '+str(inlist))
    #     print(' alist: '+str(alist))
    #     print(' dlist: '+str(dlist))

    triplet_list = []
    triplet_map = {}

    lt_count = 0 # lucky triples count

    ########################
    #
    #   more helper functions
    #
    ########################

    def check_for_dups(re,me,le,scomment):
        tripa = [re,me,le]
        trips = str(tripa)
        if triplet_map.has_key(trips):
            # print('duplicate found: ' + trips + scomment)
            return 0
        else:
            triplet_map[trips] = tripa
            triplet_list.append(tripa)
        return 1

    for idx in range(0,len(alist)):
        me = alist[idx]
        sme = str(me) 
        lo =  aleft[idx]
        ro = aright[idx]

        if dlist[idx]>2:
            lt_count += check_for_dups(me,me,me,'  ... with a triplet number')

        if dlist[idx]>1:
            for le in lo:
                lt_count += check_for_dups(me,me,le,'  ... with leading double number')
            for re in ro:
                lt_count += check_for_dups(re,me,me,'  ... with trailing double number')

        for re in ro:
            for le in lo:
                lt_count += check_for_dups(re,me,le,'  ... a single')

    # if len(triplet_list)<30 and len(triplet_list)>0:
    #     triplet_list.sort()
    #     print('')
    #     for e in triplet_list:
    #         print(str(e))

    # return lt_count
    # return [lt_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lt_count,start_time)



####################################################################################
####################################################################################
####################################################################################

#
# don't remove duplicate triples
#

def sol_6(inlist):
    start_time = time.time()

    # Your code here

    if len(inlist)<3:
        #return 0
        return [0, (time.time() - start_time)]


    ########################
    #
    #   helper functions
    #
    ########################

    ########################
    #
    # get the factors
    #
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                tmp = n/i
                factors[tmp] = tmp
        factor_dict[n] = factors
        return factors
    #
    ########################

    # solve the problem

    # reverse the inlist
    alist = inlist[:]
    alist.reverse()
    # print('alist:')
    # print(alist)

    triplet_list = []

    keyToFactorsMap = {}
    for key in alist:
        if not keyToFactorsMap.has_key(key):
            keyToFactorsMap[key] = get_factors(key)

    aleft  = []
    aright = []
    for idx in range(len(alist)):
        aleft.append([])
        aright.append([])

    for lidx in range(0,len(alist)-1):
        le = alist[lidx]
        lfactors = keyToFactorsMap[le]
        for ridx in range(lidx+1,len(alist)):
            re = alist[ridx]
            if not re in lfactors: 
                continue
            ( aleft[ridx]).append(le)
            (aright[lidx]).append(re)

    lucky_triple_count = 0
    lastval = 0
    for idx in range(1,len(alist)-1):
        val = alist[idx]
        # if val == lastval:
        #     continue
        lo =  aleft[idx]
        ro = aright[idx]
        lucky_triple_count += len(lo)*len(ro)

        # for re in ro:
        #     s = ''+str(re)+','+str(alist[idx])
        #     for le in lo:
        #         r = s+','+str(le)
        #         # print(r)
        lastval = val

    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)

####################################################################################
####################################################################################
####################################################################################

#
# don't remove duplicate triples
#

def sol_7(inlist):
    start_time = time.time()

    # Your code here
    
    if len(inlist)<3:
        #return 0
        return [0, (time.time() - start_time)]


    ########################
    #
    #   helper functions
    #
    ########################

    ########################
    #
    # get the factors
    #
    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        for i in range(2,stop,1):
            if (n % i) == 0:
                factors[i] = i
                tmp = n/i
                factors[tmp] = tmp
        factor_dict[n] = factors
        return factors
    #
    ########################

    # solve the problem

    alist = inlist[:]
    alist.reverse()

    # make a map (a dictionary) of the every item's factors
    keyToFactorsMap = {}
    for key in alist:
        if not keyToFactorsMap.has_key(key):
            keyToFactorsMap[key] = get_factors(key)

    aleft  = []
    aright = []
    for idx in range(len(alist)):
        aleft.append(0)
        aright.append(0)

    for lidx in range(0,len(alist)-1):
        le = alist[lidx]
        lfactors = keyToFactorsMap[le]
        for ridx in range(lidx+1,len(alist)):
            re = alist[ridx]
            if not re in lfactors: 
                continue
            ( aleft[ridx]) += 1
            (aright[lidx]) += 1

    lucky_triple_count = 0
    for idx in range(1,len(alist)-1):
        lucky_triple_count += aleft[idx] * aright[idx]

    # return [lucky_triple_count, (time.time() - start_time)]
    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)

####################################################################################
####################################################################################
####################################################################################

#
# don't remove duplicate triples
#

def sol_8(inlist):
    start_time = time.time()
    # Your code here
    if len(inlist)<3:
        #return 0
        return [0, (time.time() - start_time)]

    factor_dict = {}
    factor_dict[1] = {1:1}
    def get_factors(n):
        if n in factor_dict:
            return factor_dict[n]
        stop = int( sqrt(n) )+1
        factors = {}  #factor_set
        factors[1] = 1
        factors[n] = n
        if (n % 2) == 0: # evens
            i=2
            factors[i] = i
            tmp = n/i 
            factors[tmp] = tmp
            for i in range(4,stop,2):
                if (n % i) == 0:
                    factors[i] = i
                    tmp = n/i 
                    factors[tmp] = tmp
        for i in range(3,stop,2): # odds
            if (n % i) == 0:
                factors[i] = i
                tmp = n/i 
                factors[tmp] = tmp
        factor_dict[n] = factors
        return factors

    alist = inlist[:]
    alist.reverse()     # new logic:  i>j>k instead of i<j<k
                        # easier to see if key to the right is a factor of the item on the left
    keyToFactorsMap = {}
    factorToIdxMap = {}
    for idx in range(0,len(alist)):
        factors = 0
        key = alist[idx]

        # first, get the factors. Map: key: value -> factors for that value
        if not keyToFactorsMap.has_key(key):
            factors = get_factors(key)
            keyToFactorsMap[key] = factors
        else:
            factors = keyToFactorsMap[key]

        # second, idx map. Map: key: val/factor -> idx whose value has factor as a factor
        for factor in factors.keys():
            if not factorToIdxMap.has_key(factor):
                tmap = {}
                tmap[idx] = key
                factorToIdxMap[factor] = tmap
            else:
                (factorToIdxMap[factor])[idx]=key

    aleft  = []
    aright = []
    for idx in range(len(alist)):
        aleft.append(0)
        aright.append(0)

    for lidx,lval in enumerate(alist):
        for ridx in factorToIdxMap[lval]:
            if ridx < lidx :
                ( aleft[ridx]) += 1
                (aright[lidx]) += 1

    #
    # below is the same speed as above code
    #
    # for lidx,lval in enumerate(alist):
    #     idxmap = factorToIdxMap[lval]
    #     for ridx in list(sorted(idxmap.keys())):
    #         if ridx >= lidx :
    #             break
    #         ( aleft[ridx]) += 1
    #         (aright[lidx]) += 1



    lucky_triple_count = 0
    for idx in range(1,len(alist)-1):
        lucky_triple_count += aleft[idx] * aright[idx]

    # return lucky_triple_count
    return calc_runtime(lucky_triple_count,start_time)


#
# sol_8 is the best so far
#
#
# read file: pyin02.txt


# use the read in data

# input: 2000 # times in seconds
# s1  #: [748, 0.490994930267334]
# s3  #: [824, 0.19689607620239258]
# s4  #: [811, 0.19690299034118652]
# s5  #: [748, 0.20474600791931152]
# s6  #: [961, 0.209122896194458]
# s7  #: [961, 0.21336698532104492]
# s8  #: [961, 0.06973791122436523]


# append random list, to previously read in file

# input: 4000
# s1  #: [2786, 2.784945011138916]
# s3  #: [3182, 0.6909689903259277]
# s4  #: [3153, 0.7074389457702637]
# s5  #: [2786, 0.6833810806274414]
# s6  #: [3915, 0.7526640892028809]
# s7  #: [3915, 0.7401139736175537]
# s8  #: [3915, 0.14220595359802246]


# another random list, with more small keys

# input: 2000
# s1  #: [370, 0.6236579418182373]
# s3  #: [370, 0.2226250171661377]
# s4  #: [370, 0.22028183937072754]
# s5  #: [370, 0.22216105461120605]
# s6  #: [375, 0.21912813186645508]
# s7  #: [375, 0.2183828353881836]
# s8  #: [375, 0.0666971206665039]

# input: 6000
# s1  #: [7436, 6.928092002868652]
# s3  #: [8847, 1.49714994430542]
# s4  #: [8818, 1.511861801147461]
# s5  #: [7436, 1.5282220840454102]
# s6  #: [10224, 1.4946482181549072]
# s7  #: [10224, 1.5490729808807373]
# s8  #: [10224, 0.2142620086669922]

append random list, to previously read in file

# input: 4000

# Algo#: chains  runtime
# s1  #: 2863  2.871
# s3  #: 3277  0.678
# s4  #: 3237  0.683
# s5  #: 2863  0.666
# s6  #: 4100  0.746
# s7  #: 4100  0.770
# s8  #: 4100  0.1457


# another random list, with more small keys

# input: 2000

# Algo#: chains  runtime
# s1  #: 385  0.604
# s3  #: 391  0.2233
# s4  #: 391  0.2219
# s5  #: 385  0.2251
# s6  #: 391  0.2203
# s7  #: 391  0.2195
# s8  #: 391  0.0666

# input: 6000

# Algo#: chains  runtime
# s1  #: 5415  6.708
# s3  #: 6482  1.498
# s4  #: 6442  1.502
# s5  #: 5415  1.519
# s6  #: 8878  1.483
# s7  #: 8878  1.538
# s8  #: 8878  0.2138