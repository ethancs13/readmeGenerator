// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        err ? console.log(err) : console.log("File Created Successfully.")
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "Github author's username: ",
                name: 'name',
            },
            {
                type: 'input',
                message: 'Title: ',
                name: 'title',
            },
            {
                type: 'input',
                message: 'image source: ',
                name: 'src',
            },
            {
                type: 'input',
                message: 'Description: ',
                name: 'desc',
            },
            {
                type: 'input',
                message: 'Basic Instructions: ',
                name: 'instructions'
            },
            {
                type: 'input',
                message: `Table of Contents: \n| item,item,ect. |\n`,
                name: 'nav',
            },
            {
                type: 'input',
                message: 'Are you using Nodejs? | y-n ',
                name: 'node',
            },
            {
                type: 'input',
                message: 'Are you using NPM packages? | y-n ',
                name: 'npm',
                when: (response) => response.node === 'y',
            },
            {
                type: 'input',
                message: `NPM packages: \n| name desc, name desc, ect. |\n`,
                name: 'packages',
                when: (response) => response.npm === 'y',
            },
            {
                type: 'input',
                message: 'Acknowledgements: ',
                name: 'mentions',
            },
            
        ])
        .then((userData) => {
            var src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/2560px-Markdown-mark.svg.png'
            if (userData.src !== ''){
                src = userData.src
            }
            
            var mentions = "";
            var packagesOutput = "";
            var nodeBuild = "";
            var nodeInject = 
`
### Prerequisites 📂
No Prerequisites Required.

### Installation 📁
No Installation Required.
`;
            // Using Nodejs?
            if (userData.node.toLowerCase() === 'y'){
                // setup node in Built With section
                nodeBuild = `* [Node.js](https://nodejs.org/en/) - javascript runtime`
                // setup Installation instructions if using Nodejs
                nodeInject = 
`
### Prerequisites 📂
You will need \`node\` installed on your computer in order to run this app.

### Installation 📁
Inside your terminal or command prompt, navigate to the location of the cloned repo. Install the necessary dependencies by running - 
\`\`\`
npm i
\`\`\`
`

                // setup packages in readme for NPM
                
                if (userData.npm.toLowerCase() === 'y'){
                    if (userData.packages.split(' ').length < 2){
                        var packages = [userData.packages]
                    } else {
                        var packages = [...userData.packages.split(',')]
                    }

                    packagesOutput = `### NPM Packages\n`;

                    for(let i = 0; i < packages.length; i+=1){
                        // split name from desc
                        let comp = packages[i].split(' ')
                        let desc = '';
                        for (let f=1;f<comp.length;f++){
                            desc += (comp[f] + ' ')
                        }
                        packagesOutput += `* [${comp[0]}](https://www.npmjs.com/package/${comp[0]}) - ${desc}\n`
                    }    
                }
            }

            if (userData.mentions){
                mentions = `## Acknowledgments 🙏\n${userData.mentions}`
            }
            
            let filename = 'README.md'
            let output =
`
<h1 align="center">
<img src="${src}" alt="app icon" style="width:50%;"/>
</h1>
<h1 align="center">${userData.title}</h1>

#### ${userData.desc}.

## Getting Started 🌱

${userData.instructions}

If you want to run your own local instance, follow the installation instructions included in this document.

${nodeInject}

## Built With 🌱
* HTML and CSS
* [Javascript](https://www.javascript.com/) - programming language
${nodeBuild}

${packagesOutput}

## Author 🔑
* **${userData.name}** - [${userData.name}](https://github.com/${userData.name.split(' ').join('-')})

${mentions}
`
        writeToFile(filename, output);
        });
}

// Function call to initialize app
init();
