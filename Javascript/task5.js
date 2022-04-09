//На базата на масив с ученици и техните оценки трябва да създадете нов масив, само с учениците, които имат оценка над 5.50.

let students = [
	{ name: "Ivan", socre: 5 },
	{ name: "Dimitar", socre: 5.5 },
	{ name: "Kristian", socre: 4 },
	{ name: "Valentin", socre: 6 },
	{ name: "Veselin", socre: 3 },
	{ name: "Genadi", socre: 5 },
	{ name: "Yavor", socre: 3 },
	{ name: "Marin", socre: 5.5 },
	{ name: "Kalin", socre: 3 },
	{ name: "Yavor", socre: 6 }
];

let newArrayOfStudents = students.filter(s => s.socre > 5.5);
console.log(newArrayOfStudents);