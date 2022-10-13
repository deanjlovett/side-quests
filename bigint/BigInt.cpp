//#ifdef __GNUC__ 
// #include <bits/stdc++.h>
// #endif
#include <cstdlib>
#include <iostream>
#include <cstring> // strlen
#include <fstream> // ofstream
#include <deque> 
#include <vector> 
#include <string> 
#include <algorithm>

// todo: 
//  
//  note: BigInt is built on char, 1 byte, works with one digit at a time 0 -> 9
//
//  todo: BigInt built on short,   2 bytes, work with 2 digits:          00 -> 99
//  todo: BigInt built on int,     4 bytes, work with 4 digits:        0000 -> 9999
//  todo: BigInt built on long,    8 bytes, work with 9 digits: 000 000 000 -> 999 999 999
//
//  2 byte version should work 2x as fast
//  4 byte version should work 4x as fast, using 4 digits at a time
//  8 byte version should work 9x as fast, using 9 digits at a time


using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/** 
BitInt
stolen from 
https://www.geeksforgeeks.org/bigint-big-integers-in-c-with-example/ 

*/

class BigInt{
protected: // added
    // string digits;
    vector<int> digits;
    // int myIntStrlen(string s)const;
public:
 
    //Constructors:
    BigInt(unsigned long long n = 0);
    BigInt(string &);
    BigInt(const char *);
    BigInt(const BigInt &);
 
    //Helper Functions:
    friend void divide_by_2(BigInt &a);
    friend bool Null(const BigInt &);
    friend int Length(const BigInt &);
    int operator[](const size_t )const; // corrected to size_ from unsigned long int
 
               /* * * * Operator Overloading * * * */
 
    //Direct assignment
    BigInt &operator=(const BigInt &);
 
    //Post/Pre - Incrementation
    BigInt &operator++();
    BigInt operator++(int temp);
    BigInt &operator--();
    BigInt operator--(int temp);
 
    //Addition and Subtraction
    friend BigInt &operator+=(BigInt &, const BigInt &);
    friend BigInt operator+(const BigInt &, const BigInt &);
    friend BigInt operator-(const BigInt &, const BigInt &);
    friend BigInt &operator-=(BigInt &, const BigInt &);
 
    //Comparison operators
    friend bool operator==(const BigInt &, const BigInt &);
    friend bool operator!=(const BigInt &, const BigInt &);
 
    friend bool operator>(const BigInt &, const BigInt &);
    friend bool operator>=(const BigInt &, const BigInt &);
    friend bool operator<(const BigInt &, const BigInt &);
    friend bool operator<=(const BigInt &, const BigInt &);
 
    //Multiplication and Division
    friend BigInt &operator*=(BigInt &, const BigInt &);
    friend BigInt operator*(const BigInt &, const BigInt &);
    friend BigInt &operator/=(BigInt &, const BigInt &);
    friend BigInt operator/(const BigInt &, const BigInt &);
 
    //Modulo
    friend BigInt operator%(const BigInt &, const BigInt &);
    friend BigInt &operator%=(BigInt &, const BigInt &);
 
    //Power Function
    friend BigInt &operator^=(BigInt &,const BigInt &);
    friend BigInt operator^(BigInt &, const BigInt &);
     
    //Square Root Function
    friend BigInt sqrt(BigInt &a);
 
    //Read and Write
    friend ostream &operator<<(ostream &,const BigInt &);
    friend istream &operator>>(istream &, BigInt &);
 
    //Others
    friend BigInt NthCatalan(int n);
    friend BigInt NthFibonacci(int n);
    friend BigInt Factorial(int n);

};
 
BigInt::BigInt(string & s){
    // digits = ""; // using string
    digits.clear(); // using vector<int>
    
    int n = s.size();
    for (int i = n - 1; i >= 0;i--){
        if(!isdigit(s[i]))
            throw("ERROR");
        digits.push_back(s[i] - '0');
    }
}

BigInt::BigInt(unsigned long long nr){
    do{
        digits.push_back(nr % 10);
        nr /= 10;
    } while (nr);
}
// // move this
// int inline BigInt::myIntStrlen(string s)const{
//     return static_cast<int> ( strlen(s) );
// }

BigInt::BigInt(const char *s){
    // digits = ""; // using string
    digits.clear(); // using vector<int>
    
    for (int i = static_cast<int> (strlen(s)) - 1; i >= 0;i--)
    {
        if(!isdigit(s[i]))
            throw("ERROR");
        digits.push_back(s[i] - '0');
    }
}
BigInt::BigInt(const BigInt & a){
    digits = a.digits;
}
 
bool Null(const BigInt& a){
    if(a.digits.size() == 1 && a.digits[0] == 0)
        return true;
    return false;
}
int Length(const BigInt & a){
    return a.digits.size();
}

int BigInt::operator[](const size_t index)const{ // corrected to size_t from long unsigned
    if(digits.size() <= index || index < 0)
        throw("ERROR");
    return digits[index];
}

bool operator==(const BigInt &a, const BigInt &b){
    return a.digits == b.digits;
}
bool operator!=(const BigInt & a,const BigInt &b){
    return !(a == b);
}
bool operator<(const BigInt&a,const BigInt&b){
    int n = Length(a), m = Length(b);
    if(n != m)
        return n < m;
    while(n--)
        if(a.digits[n] != b.digits[n])
            return a.digits[n] < b.digits[n];
    return false;
}
bool operator>(const BigInt&a,const BigInt&b){
    return b < a;
}
bool operator>=(const BigInt&a,const BigInt&b){
    return !(a < b);
}
bool operator<=(const BigInt&a,const BigInt&b){
    return !(a > b);
}
 
BigInt &BigInt::operator=(const BigInt &a){
    digits = a.digits;
    return *this;
}
 
BigInt &BigInt::operator++(){
    int i, n = digits.size();
    for (i = 0; i < n && digits[i] == 9;i++)
        digits[i] = 0;
    if(i == n)
        digits.push_back(1);
    else
        digits[i]++;
    return *this;
}
BigInt BigInt::operator++(int temp){
    BigInt aux;
    aux = *this;
    ++(*this);
    return aux;
}
 
BigInt &BigInt::operator--(){
    if(digits[0] == 0 && digits.size() == 1)
        throw("UNDERFLOW");
    int i, n = digits.size();
    for (i = 0; digits[i] == 0 && i < n;i++)
        digits[i] = 9;
    digits[i]--;
    if(n > 1 && digits[n - 1] == 0)
        digits.pop_back();
    return *this;
}
BigInt BigInt::operator--(int temp){
    BigInt aux;
    aux = *this;
    --(*this);
    return aux;
}
 
BigInt &operator+=(BigInt &a,const BigInt& b){
    int t = 0, s, i;
    int n = Length(a), m = Length(b);
    if(m > n) {
        // a.digits.append(m - n, 0); // from when digits was a string
        auto p = a.digits.end();
        auto pRet = a.digits.insert(p,m-n,0);
    }
    n = Length(a);
    for (i = 0; i < n;i++){
        if(i < m)
            s = (a.digits[i] + b.digits[i]) + t;
        else
            s = a.digits[i] + t;
        t = s / 10;
        a.digits[i] = (s % 10);
    }
    if(t)
        a.digits.push_back(t);
    return a;
}
BigInt operator+(const BigInt &a, const BigInt &b){
    BigInt temp;
    temp = a;
    temp += b;
    return temp;
}
 
BigInt &operator-=(BigInt&a,const BigInt &b){
    if(a < b)
        throw("UNDERFLOW");
    int n = Length(a), m = Length(b);
    int i, t = 0, s;
    for (i = 0; i < n;i++){
        if(i < m)
            s = a.digits[i] - b.digits[i]+ t;
        else
            s = a.digits[i]+ t;
        if(s < 0)
            s += 10,
            t = -1;
        else
            t = 0;
        a.digits[i] = s;
    }
    while(n > 1 && a.digits[n - 1] == 0)
        a.digits.pop_back(),
        n--;
    return a;
}
BigInt operator-(const BigInt& a,const BigInt&b){
    BigInt temp;
    temp = a;
    temp -= b;
    return temp;
}
 
BigInt &operator*=(BigInt &a, const BigInt &b)
{
    if(Null(a) || Null(b)){
        a = BigInt();
        return a;
    }
    int n = a.digits.size(), m = b.digits.size();
    vector<int> v(n + m, 0);
    for (int i = 0; i < n;i++)
        for (int j = 0; j < m;j++){
            v[i + j] += (a.digits[i] ) * (b.digits[j]);
        }
    n += m;
    a.digits.resize(v.size());
    for (int s, i = 0, t = 0; i < n; i++)
    {
        s = t + v[i];
        v[i] = s % 10;
        t = s / 10;
        a.digits[i] = v[i] ;
    }
    for (int i = n - 1; i >= 1 && !v[i];i--)
            a.digits.pop_back();
    return a;
}
BigInt operator*(const BigInt&a,const BigInt&b){
    BigInt temp;
    temp = a;
    temp *= b;
    return temp;
}
 
BigInt &operator/=(BigInt& a,const BigInt &b){
    if(Null(b))
        throw("Arithmetic Error: Division By 0");
    if(a < b){
        a = BigInt();
        return a;
    }
    if(a == b){
        a = BigInt(1);
        return a;
    }
    int i, lgcat = 0, cc;
    int n = Length(a); // corrected code: remove m = Length(b); // m unused
    vector<int> cat(n, 0);
    BigInt t;
    for (i = n - 1; t * 10 + a.digits[i]  < b;i--){
        t *= 10;
        t += a.digits[i] ;
    }
    for (; i >= 0; i--){
        t = t * 10 + a.digits[i];
        for (cc = 9; cc * b > t;cc--);
        t -= cc * b;
        cat[lgcat++] = cc;
    }
    a.digits.resize(cat.size());
    for (i = 0; i < lgcat;i++)
        a.digits[i] = cat[lgcat - i - 1];
    a.digits.resize(lgcat);
    return a;
}
BigInt operator/(const BigInt &a,const BigInt &b){
    BigInt temp;
    temp = a;
    temp /= b;
    return temp;
}
 
BigInt &operator%=(BigInt& a,const BigInt &b){
    if(Null(b))
        throw("Arithmetic Error: Division By 0");
    if(a < b){
        a = BigInt();
        return a;
    }
    if(a == b){
        a = BigInt(1);
        return a;
    }
    int i, lgcat = 0, cc;
    int n = Length(a); // corrected code: removed m = Length(b); // unused m
    vector<int> cat(n, 0);
    BigInt t;
    for (i = n - 1; t * 10 + a.digits[i] < b;i--){
        t *= 10;
        t += a.digits[i];
    }
    for (; i >= 0; i--){
        t = t * 10 + a.digits[i];
        for (cc = 9; cc * b > t;cc--);
        t -= cc * b;
        cat[lgcat++] = cc;
    }
    a = t;
    return a;
}
BigInt operator%(const BigInt &a,BigInt &b){
    BigInt temp;
    temp = a;
    temp %= b;
    return temp;
}
 
BigInt &operator^=(BigInt & a,const BigInt & b){
    BigInt Exponent, Base(a);
    Exponent = b;
    a = 1;
    while(!Null(Exponent)){
        if(Exponent[0] & 1)
            a *= Base;
        Base *= Base;
        divide_by_2(Exponent);
    }
    return a;
}
BigInt operator^(BigInt & a,BigInt & b){
    BigInt temp(a);
    temp ^= b;
    return temp;
}
 
void divide_by_2(BigInt & a){
    int add = 0;
    for (int i = a.digits.size() - 1; i >= 0;i--){
        int digit = (a.digits[i] >> 1) + add;
        add = ((a.digits[i] & 1) * 5);
        a.digits[i] = digit;
    }
    while(a.digits.size() > 1 && !a.digits.back())
        a.digits.pop_back();
}
 
BigInt sqrt(BigInt & a){
    BigInt left(1), right(a), v(1), mid, prod;
    divide_by_2(right);
    while(left <= right){
        mid += left;
        mid += right;
        divide_by_2(mid);
        prod = (mid * mid);
        if(prod <= a){
            v = mid;
            ++mid;
            left = mid;
        }
        else{
            --mid;
            right = mid;
        }
        mid = BigInt();
    }
    return v;
}
 
BigInt NthCatalan(int n){
    BigInt a(1),b;
    for (int i = 2; i <= n;i++)
        a *= i;
    b = a;
    for (int i = n + 1; i <= 2 * n;i++)
        b *= i;
    a *= a;
    a *= (n + 1);
    b /= a;
    return b;
}
 
BigInt NthFibonacci(int n){
    BigInt a(1), b(1), c;
    if(!n)
        return c;
    n--;
    while(n--){
        c = a + b;
        b = a;
        a = c;
    }
    return b;
}
 
BigInt Factorial(int n){
    BigInt f(1);
    for (int i = 2; i <= n;i++)
        f *= i;
    return f;
}
 
istream &operator>>(istream &in,BigInt&a){
    string s;
    in >> s;
    int n = s.size();
    for (int i = n - 1; i >= 0;i--){
        if(!isdigit(s[i]))
            throw("INVALID NUMBER");
        a.digits[n - i - 1] = s[i];
    }
    return in;
}
 
ostream &operator<<(ostream &out,const BigInt &a){
    for (int i = a.digits.size() - 1; i >= 0;i--)
        out << (short)a.digits[i]; // corrected: was cout, should have been out
    return out;                    // corrected: was cout, should have been out
}
 

/* end BigInt */

/*
 * Complete the 'fibonacciModified' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER t1
 *  2. INTEGER t2
 *  3. INTEGER n
 */

// int fibonacciModified(int t1, int t2, int n) {
BigInt fibonacciModified(int t1, int t2, int n) {
    // deque<BigInt> a;
    vector<BigInt> a;
    
    BigInt bt1(t1);
    BigInt bt2(t2);
    
    a.push_back( BigInt(t1) );
    a.push_back( BigInt(t2) );

    BigInt last;    
    int n1 = 0;
    int n2 = 1;
    cout << "a[0]: " << a[0] << endl; 
    cout << "a[1]: " << a[1] << endl;
    size_t stn(n);
    while(a.size()<stn) {
        last = a[n1];
        last += a[n2]*a[n2]; 
        cout << "a[" << a.size() << "]: " << last << endl; 
        a.push_back(last);
        ++n1;
        ++n2;
    }
    return a.back();
        
    // deque<BigInt> b;
    // b.push_back( t1 );
    // b.push_back( t2 );
    
    // int count = 2;
    // cout << endl;
    // cout << "b[0]: " << b[0] << endl; 
    // cout << "b[1]: " << b[1] << endl;
    // for( ; count<n; ++count,b.pop_front()){
    //     b.push_back(b[0]+ b[1]*b[1]);
    //     cout << "b[" << count << "]: " << b[2] << endl; 
    // }
    // return b[1]; 
}

int main()
{
    // todo: put together a unit test for BigInt

    string outputPath(getenv("OUTPUT_PATH"));
    if(outputPath.empty()) outputPath="./output.txt";
    ofstream fout(getenv("OUTPUT_PATH"));



    string first_multiple_input_temp;
    getline(cin, first_multiple_input_temp);

    vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

    int t1 = stoi(first_multiple_input[0]);

    int t2 = stoi(first_multiple_input[1]);

    int n = stoi(first_multiple_input[2]);

    // int result = fibonacciModified(t1, t2, n);
    BigInt result = fibonacciModified( t1, t2, n);
    
    cout << "result: " << result << endl;

    fout << result << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    // s.erase(
    //     s.begin(),
    //     find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    //     // find_if(s.begin(), s.end(), not1(std::function<int, int>(isspace)))
    // );
    s.erase(
        std::find_if(
            s.rbegin(), 
            s.rend(), 
            [](unsigned char ch) {return !std::isspace(ch);}
        ).base(), 
        s.end()
    );
    return s;
}

string rtrim(const string &str) {
    string s(str);

    // s.erase(
    //     find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
    //     s.end()
    // );
    s.erase(
        s.begin(), 
        std::find_if(
            s.begin(), 
            s.end(), 
            [](unsigned char ch) {return !std::isspace(ch);}
        )
    );


    return s;
}

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}