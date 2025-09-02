import fs from "fs";
import seedrandom from "seedrandom";

const rng = seedrandom("my-fixed-seed");

function randomInt(min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function generateLoans(count: number) {
  const statuses = ["Pending", "Approved", "Rejected"] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    borrowerName: `Name ${i + 1}`,
    amount: randomInt(5000, 100000),
    term: randomInt(6, 60),
    status: randomChoice(statuses),
    closeDate: new Date(
      2025,
      randomInt(0, 11),  
      randomInt(1, 28)    
    ).toISOString().split("T")[0], 
  }));
}

const loans100 = generateLoans(100);
fs.writeFileSync("data/loans_100.json", JSON.stringify(loans100, null, 2));

const loansFull = generateLoans(50000);
fs.writeFileSync("data/loans.json", JSON.stringify(loansFull, null, 2));
