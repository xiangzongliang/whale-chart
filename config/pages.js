module.exports = {
    index: {
        title:'whale-chart',
	    entry: './pages/line/line.js',
	    template: './template/index.html',
        //chunks  //function(...list) | array    手动注入 chunks 支持
        //favicon
        //excludeChunks  //function(...list) | array | RegExp  手动排除不需要的 chunks 
        //htmlOutputPath // string  将 ***.html 文件输出到指定的路径,相对路径,必须以 / 结尾,例: '../newPage/'
    },
    // index_d3: {
    //     title:'whale-chart',
	//     entry: './pages/d3line/d3line.js',
	//     template: './template/index.html',
    //     //chunks  //function(...list) | array    手动注入 chunks 支持
    //     //favicon
    //     //excludeChunks  //function(...list) | array | RegExp  手动排除不需要的 chunks 
    //     //htmlOutputPath // string  将 ***.html 文件输出到指定的路径,相对路径,必须以 / 结尾,例: '../newPage/'
    // }
}