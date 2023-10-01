export function generateRandomWord(length: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let randomWord = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomWord += alphabet.charAt(randomIndex);
  }

  return randomWord;
}
