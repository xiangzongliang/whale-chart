// module.exports = api => {
//     return {
//         presets:[
//             ['@babel/env', {
//                 targets: {
//                     edge: "17",
//                     firefox: "60",
//                     chrome: "67",
//                     safari: "11.1",
//                     opera:'10',
//                     ie:"10",
//                     ios:"7.0",
//                     android:"4.0",
//                     // node:"current"
//                 },
//                 modules:true, //开启 | 关闭 ES6模块的转换
//                 useBuiltIns: "usage",
//             }]
//         ],
//         plugins:["@babel/plugin-transform-runtime"]
//     } 
// };
const presets = [
    ["@babel/env",
        // "@babel/env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
                opera:'10',
                ie:"9",
                ios:"7.0",
                android:"4.0.0",
                node:"current",
                browsers: [
                    "iOS >= 7",
                    "Android >= 4.0",
                    "ie >= 9"

                ]
            },
            // modules:true,
            // useBuiltIns: "usage",
        },
    ]
];


const plugins = [
    ["@babel/plugin-transform-runtime"] //
]
  
module.exports = { 
    presets,
    plugins
};