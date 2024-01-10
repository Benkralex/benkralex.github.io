class CustomList {
    getInfo() {
        return {
            id: 'multidimenslist',
            name: '3D-List',
            blocks: [
                {
                    opcode: 'create',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'create empty 3D-List with [maxx] [maxy] [maxz]',
                    arguments: {
                        maxx: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4'
                        },
                        maxy: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4'
                        },
                        maxz: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4'
                        }
                    }
                },
                {
                    opcode: 'setValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'set at [x] [y] [z] in 3D-List [list] [value]',
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        y: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        z: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        list: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        },
                        value: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'thing'
                        }
                    }
                },
                {
                    opcode: 'getValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get from 3D-List [list] at [x] [y] [z]',
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        y: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        z: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        list: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'clearList',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'clear 3D-List [list]',
                    arguments: {
                        list: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'lengthOfList',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[xyz] length of 3D-List [list]',
                    arguments: {
                        list: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        },
                        xyz: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'xyzmenu'
                        }
                    }
                }
            ],
            menus: {
                xyzmenu: {
                    acceptReporters: false,
                    items: ['x', 'y', 'z']
                }
            }
        };
    }

    stringToList(listAsString) {
        var list = [];
        var temp = "";
        var char;
        for (let i = 0; i < listAsString.length; i++) {
            char = listAsString.charAt(i);
            if (char == '|') {
                list.push(temp);
                temp = "";
            } else if (char == '\\') {
                i++;
                temp += listAsString.charAt(i);
            } else {
                temp += char;
            }
        }
        return list;
    }

    listToString(list) {
        var stringList = "";
        for (const valueidx in list) {
            var value = list[valueidx].toString();
            if (value.includes("\\") || value.includes("|")) {
                for (let i = 0; i < value.length; i++) {
                    if (value.charAt(i) == "|" || value.charAt(i) == "\\") {
                        stringList += "\\";
                    }
                    stringList += value.charAt(i);
                }
                stringList += "|"
            } else {
                stringList += value + "|"
            }
        }
        return stringList;
    }

    create(args) {
        var returnvar = "3d-list|" + args.maxx + "|" + args.maxy + "|" + args.maxz + "|";
        for (let i = 1; i <= (args.maxx * args.maxy * args.maxz); i++) {
            returnvar += "|";
        }
        return returnvar;
    }

    getValue(args) {
        var list = this.stringToList(args.list);
        var prefix = list[0];
        var maxx = list[1];
        var maxy = list[2];
        var maxz = list[3];
        list.splice(0, 4);
        if (prefix == "3d-list") {
            if ((args.x <= maxx) && (args.y <= maxy) && (args.z <= maxz)) {
                return list[((args.x - 1) + ((args.y - 1) * maxx) + ((args.z - 1) * maxx * maxy))];
            } else {
                return "Index out of range";
            }
        } else {
            return "Not the right prefix";
        }
    }

    setValue(args) {
        var list = this.stringToList(args.list);
        var prefix = list[0];
        var maxx = list[1];
        var maxy = list[2];
        var maxz = list[3];
        if (prefix == "3d-list") {
            if ((args.x <= maxx) && (args.y <= maxy) && (args.z <= maxz)) {
                list[((args.x - 1) + ((args.y - 1) * maxx) + ((args.z - 1) * maxx * maxy))+4] = args.value;
                return this.listToString(list);
            } else {
                return "Index out of range";
            }
        } else {
            return "Not the right prefix";
        }
    }

    clearList(args) {
        var list = this.stringToList(args.list);
        for (let i = 4; i < list.length; i++) {
            list[i] = "";
        }
        return this.listToString(list);
    }

    lengthOfList(args) {
        var list = this.stringToList(args.list);
        if (list[0] == "3d-list") {
            if (args.xyz == "x") {
                return list[1];
            } else if (args.xyz == "y") {
                return list[2];
            } else if (args.xyz == "z") {
                return list[3];
            } else {
                return "The 1st Parm must be x, y or z"
            }
        } else {
            return "Not the right prefix"
        }
    }
}
Scratch.extensions.register(new CustomList());