from math import sqrt

def solution_02(inlist):
    # Your code here

    def get_factors(n):
        stop = int( sqrt(n) )+1
        flist = [1,n]
        for i in range(2,stop,1):
            if (n % i) == 0:
                flist.append(i)
                flist.append(n/i)
        return flist

    mastermap = {}
    multi = {}
    for key in inlist:
        if key in mastermap:
            multi[key] += 1
        else:
            mastermap[key] = {}
            multi[key] = 1

    for key,val in mastermap.iteritems():
        factors = get_factors(key)
        for i in factors:
            if i in mastermap:
                val[i]=i
    
    lucky_triple_count = 0
    for child_key, childs_parent_map in mastermap.iteritems() :
        for parent_key in childs_parent_map :
            if      parent_key  < child_key \
                or (parent_key == child_key and multi[child_key]>1 ) :
                grandparent_map = mastermap[parent_key]
                for grandp_key in grandparent_map :
                    if      grandp_key  < parent_key \
                        or (grandp_key == parent_key and parent_key  <  child_key and multi[parent_key]>1 ) \
                        or (grandp_key == parent_key and parent_key == child_key  and multi[parent_key]>2) :

                        lucky_triple_count += multi[child_key] * multi[parent_key] * multi[grandp_key]


    return lucky_triple_count
