const students = [
  { name: "Pranav", score: 59 },
  { name: "Dewansh", score: 92 },
  { name: "Yash", score: 74 },
  { name: "Saumya", score: 80 },
  { name: "Shivam", score: 70 },
];

const classScore = students.map((sc) => sc.score);

function avgMarks(students) {
  const sumMarks = classScore.reduce((sum, score) => sum + score, 0);
  const avgMarks = sumMarks / classScore.length;
  console.log("Average Score:", avgMarks);
}

function maxMinMarks(students) {
  const maxScore = classScore.reduce((max, marks) => Math.max(max, marks));
  const topScorers = students.filter((n) => n.score === maxScore);
  console.log("Highest score:");
  topScorers.forEach((s) => {
    console.log(s.name, s.score);
  });

  const minScore = classScore.reduce((min, marks) => Math.min(min, marks));
  const minStudents = students.filter((n) => n.score === minScore);
  console.log("Lowest score:");
  minStudents.forEach((s) => {
    console.log(s.name, s.score);
  });
}

function gradeFrequency(classScore) {
  let grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };

  classScore.forEach((score) => {
    if (score > 90 && score < 100) {
      grades.A += 1;
    } else if (score > 80 && score < 89) {
      grades.B += 1;
    } else if (score > 70 && score < 79) {
      grades.C += 1;
    } else if (score > 60 && score < 69) {
      grades.D += 1;
    } else if (score < 60) {
      grades.F += 1;
    }
  });
  console.log("Grade Distribution:", grades);
}

function retakeStudents(students) {
  let retakeList = [];

  students.forEach((s) => {
    if (s.score < 60) {
      retakeList.push(s.name);
    }
  });

  console.log("Students needing retake:", retakeList);
}

avgMarks(students);
maxMinMarks(students);
gradeFrequency(classScore);
retakeStudents(students);
