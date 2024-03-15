class SaveCode {
    getInfo() {
        return {
            id: 'bensavecode',
            name: 'Save-Code',
            blocks: [
                {
                    opcode: 'create',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'create Save-Code [prefix]',
                    arguments: {
                        prefix: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'prefix'
                        }
                    }
                },
                {
                    opcode: 'addValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'add in Save-Code [sc] [value] with prefix [prefix]',
                    arguments: {
                        sc: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Save-Code'
                        },
                        value: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'thing'
                        },
                        prefix: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'prefix'
                        }
                    }
                },
                {
                    opcode: 'replaceValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'replace in Save-Code [sc] at [idx] [value] with prefix [prefix]',
                    arguments: {
                        sc: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Save-Code'
                        },
                        idx: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        value: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'thing'
                        },
                        prefix: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'prefix'
                        }
                    }
                },
                {
                    opcode: 'getValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get value in Save-Code [sc] at [idx] with prefix [prefix]',
                    arguments: {
                        sc: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Save-Code'
                        },
                        idx: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        prefix: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'prefix'
                        }
                    }
                },
                {
                    opcode: 'clearSC',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'clear Save-Code [sc] with prefix [prefix]',
                    arguments: {
                        sc: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Save-Code'
                        },
                        prefix: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'prefix'
                        }
                    }
                },
                {
                    opcode: 'lengthOfSC',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'max Save-Code [sc] index with prefix [prefix]',
                    arguments: {
                        sc: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Save-Code'
                        },
                        prefix: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'prefix'
                        }
                    }
                }
            ]
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
                stringList += "|";
            } else {
                stringList += value + "|";
            }
        }
        return stringList;
    }

    create(args) {
        return args.prefix + "|";
    }

    getValue(args) {
        var list = this.stringToList(args.sc);
        var prefix = list[0];
        if (prefix == args.prefix) {
            if ((args.idx < (list.lenght)) && (args.idx != 0)) {
                return list[args.idx];
            } else {
                return "Index out of range";
            }
        } else {
            return "Not the right prefix";
        }
    }

    addValue(args) {
        var list = this.stringToList(args.sc);
        var prefix = list[0];
        if (args.prefix == prefix) {
            list.push(args.value);
            return this.listToString(list);
        } else {
            return "Not the right prefix";
        }
    }

    replaceValue(args) {
        var list = this.stringToList(args.sc);
        var prefix = list[0];
        if (prefix == args.prefix) {
            if ((args.idx < (list.length)) && (args.idx != 0)) {
                list[args.idx] = args.value;
                return this.listToString(list);
            } else {
                return "Index out of range";
            }
        } else {
            return "Not the right prefix";
        }
    }

    clearSC(args) {
        var list = this.stringToList(args.sc);
        if (list[0] == args.prefix) {
            list.splice(1, (list.length - 1))
            return this.listToString(list);
        } else {
            return "Not the right prefix";
        }
    }

    lengthOfSC(args) {
        var list = this.stringToList(args.sc);
        if (list[0] == args.prefix) {
            return (list.length - 1);
        } else {
            return "Not the right prefix";
        }
    }
}
Scratch.extensions.register(new SaveCode());
