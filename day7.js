import * as fs from 'fs';

const input = fs.readFileSync("day7.input").toString();

function createFolder(dirName, parentFolder)
{
    console.log("createDir", dirName);
    if (parentFolder)
        return { dir: dirName, files:{}, subFolders:{}, parentFolder, size:0 }
    else
        return { dir: dirName, files:{}, subFolders:{}, size:0 }
}
function createFile(fileName, size)
{
    console.log("createFile", fileName);
    return { file: fileName, size:parseInt(size) };
}

let root = createFolder("/");
let pwd = root;


let lines = input.split("\n");
lines.forEach(line => {
    let args = line.split(" ");
    if (args[0] == "$")
    {
        //command
        args.shift();
        switch (args[0])
        {
            case "cd":
                let dirName = args[1];
                if (dirName == "/")
                {
                    pwd = root;
                }
                else if (dirName == "..")
                {
                    pwd = pwd.parentFolder;
                }
                else
                {
                    let newDir = pwd.subFolders[dirName];
                    if (newDir == undefined) //just in case they cd to a folder but we didnt know it exists
                    {
                        pwd.subFolders[dirName] = createDir(dirName, pwd);
                    }
                    pwd = pwd.subFolders[dirName];
                }
                break;

            case "ls":
                //dont actually have to do anything really lol
                break;
        }
    }
    else
    {
        //folder
        if (args[0] == "dir")
        {
            let dirName = args[1];

            if (pwd.subFolders[dirName] == undefined)
                pwd.subFolders[dirName] = createFolder(args[1], pwd);
        }
        //file
        else
        {
            let size = args[0];
            let fileName = args[1];
            
            if (pwd.files[fileName] == undefined)
                pwd.files[fileName] = createFile(fileName, size);
        }
    }
});

let foldersAtMost100000 = []; //part 1
let allFolderSizes = [];//part 2

//calculate sizes by traversing the tree
function calculateSize(dir)
{
    let subFolderSize = Object.values(dir.subFolders).reduce((prev, curr) => prev+calculateSize(curr), 0);
    let filesSize = Object.values(dir.files).reduce((prev, curr) => prev+curr.size, 0);
    //console.log({ dir: dir.dir, subFolderSize, filesSize });
    dir.size = subFolderSize + filesSize;

    if (dir.size <= 100000)
        foldersAtMost100000.push(dir);
    allFolderSizes.push(dir);

    return dir.size;
}

calculateSize(root);

//print out the dirs
let levelsIn = 0;
function indent()
{
    var result = "";
    for (var i = 0; i < levelsIn; i++)
    {
        result += "\t";
    }
    return result;
}
function printDir(dir)
{
    console.log(indent()+" - "+dir.dir+" (dir)");
    levelsIn++;
    Object.values(dir.subFolders).forEach(printDir);
    Object.values(dir.files).forEach(f => console.log(indent()+" - "+f.file+" (file, size="+f.size+")"));
    levelsIn--;
}
printDir(root);



//max size
//console.log(root.size);

//part 1
let sum = foldersAtMost100000.reduce((prev, curr) => prev+curr.size, 0);
console.log({sum});

//part 2
allFolderSizes.sort((a,b) => a.size-b.size);

let requiredSize = -1 * (70000000 - 30000000 - root.size); //don't @ me about the -1
console.log({requiredSize});

for (var i = 0; i < allFolderSizes.length; i++)
{
    let size = allFolderSizes[i].size
    if (size >= requiredSize)
    {
        console.log("CHOOSE "+size); // 26391313 was wrong!
        break;
    }
}