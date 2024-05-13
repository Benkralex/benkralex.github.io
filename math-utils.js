class MathUtils {
    getInfo() {
        return {
            id: 'mathutils',
            name: 'Math Utils',
            blocks: [
                {
                    opcode: 'potenz',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[x]^[y]',
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '10'
                        },
                        y: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '5'
                        }
                    }
                }
            ]
        };
    }
    potenz(args) {
	return Math.pow(args.x, args.y);
    }
}

Scratch.extensions.register(new MathUtils());