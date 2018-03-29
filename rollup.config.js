
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtIns from 'rollup-plugin-node-builtins';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/geoplatform.client.js',
        format: 'umd',
        name: "GeoPlatformClient"
    },
    sourceMap: 'inline',
    plugins: [
        builtIns(),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        babel({ exclude: 'node_modules/**' })
    ]
};
