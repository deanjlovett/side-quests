import sys

def fizzbuzz(n: int) -> str:
    myStr = ""
    if n%3==0:
        myStr += "Fizz"
    if n%5==0:
        myStr += "Buzz"
    if len(myStr)==0:
        myStr = n
    return myStr


def main(argv):
    n = len(sys.argv)
    if n == 1:
        print( f"Usage: {sys.argv[0]} [list of space separated integers]")
    else:
        for i in range(1, n):
            try:
                arg = int(sys.argv[i])
            except ValueError:
                print( sys.argv[i], ":", "not an integer, can't run FizzBuzz !!")
            else:
                print( arg, ":", fizzbuzz( arg ) ) 

if __name__ == "__main__":
    main(sys.argv[1:])