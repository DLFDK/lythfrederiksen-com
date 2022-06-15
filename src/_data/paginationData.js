const rootsAndTypes = [["Blog", "posts"], ["Projects", "projects"]];
const categories = ["All", "Build", "Write", "Code"];
const combination = [];
for(const rootAndType of rootsAndTypes){
    for(const category of categories){
        combination.push([...rootAndType, category])
    }
}
module.exports = combination;