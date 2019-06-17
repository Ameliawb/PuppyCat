/*hello amelia's onboarding world*/
//referencing Shy's awesome onboarding guide here: https://gist.github.com/Shy/9e8fca4d30f6b31eef84e23e1c5a955b 
//Content must be retrieved using the space cfexampleapi and the access token b4c0n73n7fu1 to connect to the Contentful space that Shy setup
//node BeapuppyCat.js and shy's credentials (normally I wouldn't include this in the comments or code but this is a test space)

//STEP 1 - SET UP. require contentful, pass API credentials, and create a contentful client
var contentful = require('contentful');
const fs = require('fs');
var handlebars = require('handlebars');
/* this will register the handlebars-fs helpers on your handlebars instance */
//0 thing i write is node and the 1 renderspace.js so then the 2 and 3 is my space ID and my 
//the way you get things from the command line in JS as the 3rd and 4th variable
const space = process.argv[2];
const token = process.argv[3];

//then use those variables to build our contentful client node beapuppycat.js spaceid and access token enter that will run this program
const client = contentful.createClient({
    space: space,
    accessToken: token
});

//STEP 2 - SEE WHAT puppy cats GOT. first we get all the entries in the space:
client.getEntries()
    .then((response) => response.items.forEach(function(entry) {
        var data = entry.fields;
        var id = entry.sys.id;
        var ct = entry.sys.contentType.sys.id;
        //console log some things if you are worried this part may not work
        //console.log(entry.fields.bestFriend);
        //console.log('\n');
        getim(ct, id, data);

    }))
    .catch(console.error)

// Step 3 the gitim function was created to read the template file appropriate to each entry and then compiles the source with handlebars and creates a new function to take the data 
function getim(contentType, id, data) {
    var inFile = './templates/' + contentType + '.hbs';
    var outFile = './output/' + id + '.html';
    var source = fs.readFileSync(inFile, 'utf8');
    var template = handlebars.compile(source);
    //handlebars declares a new function that can take data
    const result = template(data);
    fs.writeFileSync(outFile, result);
    //log it if you'd like to
    //console.log(result);
    //console.log('\n')
}