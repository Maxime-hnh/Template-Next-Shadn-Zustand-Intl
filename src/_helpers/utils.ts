export function isPrefixOfWord(sentence: string, searchWord: string): number {

  const wordsArray = sentence.split(" ");
  let result = -1;

  for (let i = 0; i < wordsArray.length; i++) {
    let temp = result;
    const word = wordsArray[i];
    if (word.startsWith(searchWord)) {
      temp = (i + 1);

      if (result !== -1) {
        temp > result ? result : result = temp
      } else {
        result = temp;
      }
    }
  };

  return result
};

export function countPossiblePairs(n: number) {
  return (n * (n - 1) / 2)
}

export function kadane(data: number[]) {
  let maxSum = data[0];
  let currentSum = data[0];
  let start = 0;
  let tempStart = 0;
  let end = 0;

  for (let i = 1; i < data.length; i++) {
    if (currentSum < 0) {
      currentSum = data[i];
      tempStart = i;
    } else {
      currentSum += data[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return [start, end];
}