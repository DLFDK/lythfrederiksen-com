const rootsAndTypes = [["Blog", "posts"], ["Projects", "projects"]];
const categories = ["All", "Build", "Write", "Code"];
const combination = [];
for(const item of rootsAndTypes){
    for(const category of categories){
        combination.push([...item, category])
    }
}
module.exports = combination;