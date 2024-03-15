class StringUtils {
    getInfo() {
        return {
            id: 'stringutils',
            name: 'String Utils',
            blocks: [
                {
                    opcode: 'startsWithScratch',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[string1] starts with [string2]',
                    arguments: {
                        string1: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'apple'
                        },
                        string2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'app'
                        }
                    }
                },
                {
                    opcode: 'replaceScratch',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'replace in [string1], [string2] with [string3]',
                    arguments: {
                        string1: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hi, how are you?'
                        },
                        string2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hi'
                        },
                        string3: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello'
                        }
                    }
                },
                {
                    opcode: 'cutScratch',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'cut in [string1] from [start] to [end]',
                    arguments: {
                        string1: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hi, how are you?'
                        },
                        start: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                        end: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4'
                        }
                    }
                }
            ]
        };
    }
    startsWithScratch(args) {
        return args.string1.startsWith(args.string2);
    }
    replaceScratch(args) {
        return args.string1.replace(args.string2, args.string3);
    }
    cutScratch(args) {
        var x = (Number(args.start) - 1);
        var y = (Number(args.end) - 1);
        var str = args.string1;
        if (x != null && y != null) {
            if (x < 0 || y < 0 || x >= str.length || y >= str.length || x > y) {
                return "Invalid Inputs";
            }
            return str.slice(0, x) + str.slice(y + 1);
        } else {
            return "var is empty"
        }

    }
}

Scratch.extensions.register(new StringUtils());