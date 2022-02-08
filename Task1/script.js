// Iurco Tiberiu-Iulian
// Task 1

class Profile{
    #age = 0;
    #position = '';
    #message = '';
    constructor(name, age, position, company, message){
        this.name = name;
        this.#age = age;
        this.#position = position;
        this.company = company;
        this.#message = message;
    }
    profile(){
        console.log(`${this.name} is ${this.#age} years old. He works as a ${this.#position} for ${this.company} and says "${this.#message}" to everybody! :D`);
    }
    getAge (){return this.#age;}
    getPosition (){return this.#position;}
}

class Person extends Profile{
    #address = '';
    #contact = '';
    constructor(name, age, position, company, message, address, contact){
        super(name, age, position, company, message);
        this.#address = address;
        this.#contact = contact;
    }

    getInfo(){
        console.log(`${this.name}: ${this.getAge()} | ${this.#address} | ${this.#contact}`);
    }
}

main();

function main(){
    // Standard Deviation
    console.log('### Standard Deviation ###');
    grades = [4, 7, 8, 7.5, 6.9, 9.1, 9.8, 4.49, 5.25, 7.89, 9.1, 10, 2, 5.5, 7.9];
    console.log('Original Grades  : ', JSON.stringify(grades) );

    console.log('Standard Deviation of the provided grades : ', stdev(grades));

    // Deep copy
    console.log('\n### Deep Copy ###');
    gradesRectified = JSON.parse(JSON.stringify(grades));
    gradesRectified.push(8.5);
    console.log('Original Grades  : ', JSON.stringify(grades) );
    console.log('Rectified Grades Array : ', JSON.stringify(gradesRectified));
    console.log('Standard Deviation of the rectified grades : ', stdev(gradesRectified));

    // Add a new series of grades
    console.log('\n### Spread Operator ###');
    newGrades = [4.5, 4.6, 5.9, 5.8, 9.4, 2.9, 5.5, 7.8, 5.8, 8.6 ,8.5, 6.7, 8.1, 5.7, 8.4, 7.5, 4.5, 6.5, 7.4, 6.3];
    grades = [...gradesRectified, ...newGrades];
    console.log('Grades after new series added : ', JSON.stringify(grades));

    // Calculate the mean of students' grades
    console.log('\n### Objects ###');
    students = {"Iurco Tiberiu": 10,"Marcel Ioan": 7.6, "Augustin Ionut": 7.8, "Mara Ioana": 8.7, "Constantin Gabriel": 9.4};
    console.log('Students : ', JSON.stringify(students));
    console.log("Mean Grade : ", meanGrades(students));

    // Promises
    console.log('\n### Promises ###');
    areNumbers([1, 2, 3, 4, 7]);

    // Async Await
    async function asyncAwaitFunc() {
        let myPromise = new Promise(function(resolve) {
          setTimeout(function() {resolve("Hooray !!");}, 3000);
        });
        console.log('\n### Async Await ###\n', await myPromise);
    }
    asyncAwaitFunc();

    // Closures
    console.log('\n### Closures ###');
    var addRand = addRandomGrade();
    grades = addRand(grades);
    console.log(`Grades with one randomly added at the end: \n${JSON.stringify(grades)}`);

    // Classes OOP
    console.log('\n### Classes OOP ###');
    let profile = new Profile("Tiberiu", 21, "Full Stack Developer", "AquaSoft", "Glad to be working with you guys!");
    let person = new Person("Iulian", 25, "Full Stack Developer", "AquaSoft", "Glad to be working with you guys!", "Bucuresti", "email@gmail.com");
    profile.profile();
    person.getInfo();

}

// Standard Deviation
function stdev(grades){
    let standardDev = 0;
    let mean = 0;
    const len = grades.length;

    grades.forEach(element => {mean += element;});
    mean = mean/len;


    grades.forEach(element => {
        standardDev += Math.pow(element - mean, 2);
    });
    standardDev = Math.sqrt(standardDev/len);
    return standardDev;
}

function meanGrades(students){
    let len = 0;
    let mean = 0;

    for(const [key, value] of Object.entries(students)){
        mean += value;
        len += 1;
    }

    return mean/len;
}

function areNumbers(arr){
    return new Promise(function (resolve, reject) {
            let ok = 1;
            arr.forEach(element => {if(typeof element !== "number") {ok = 0;return reject(new TypeError("The given elements are not numbers!"));}});
            if(ok == 1)resolve(console.log("The given elements are numbers!"));
    });
}

function addRandomGrade(grades){
    var rand = 2 + Math.random() * 8;
    function addRand(grades){
        grades.push(Math.floor(rand));
        return grades;
    }
    return addRand;
}
