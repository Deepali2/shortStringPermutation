//given a smaller string s and a bigger string b, design an algorithm to find all the permutations of the shorter string within the longer one. Print the location of each permutation.

let s = 'aabc';
let b = 'cababadcbbabbcbaabaabccbabc';

const sSubStringInB = (s, b) => {
    //if length of b is less than the length of s, then swap b and s
    if (b.length < s.length) {
        let temp = b;
        b = s;
        s = temp;
    }
    //initialize variables
    let results = [];
    let hashtable = {};

    //make a hashtable using the s string
    for (let i = 0; i < s.length; i++) {
        if (hashtable.hasOwnProperty(s[i])) {
            hashtable[s[i]]++;
        } else {
            hashtable[s[i]] = 1;
        }
    }
    //iterate over b
    for (let i = 0; i < b.length; i++) {
        if (hashtable.hasOwnProperty(b[i])) {
            // create a substring  with b elements equal to the length of s
            let bSubstring = b.substring(i, i + s.length); 
            //create a deep copy of the hashtable
            let hashtableCopy = JSON.parse(JSON.stringify(hashtable));
            //iterate over the subString
            for (let j = 0; j < bSubstring.length; j++) {
                if (!hashtableCopy.hasOwnProperty(bSubstring[j])) {
                    break;
                } else {
                    hashtableCopy[bSubstring[j]]--;
                    if (hashtableCopy[bSubstring[j]] === 0) {
                        delete hashtableCopy[bSubstring[j]];
                    }
                    if (Object.keys(hashtableCopy).length === 0) {
                        results.push(`${bSubstring} is at index ${i}`);
                    }
                }
            }
        }        
    }
    return results.join(', \n');
}

console.log(sSubStringInB (s, b));