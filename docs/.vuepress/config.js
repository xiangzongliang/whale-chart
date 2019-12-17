module.exports = {
    title: 'Chart DOC',
    description: 'Just playing around',
    configureWebpack: {
        resolve: {
          alias: {
            // '@assets': 'pu'
          }
        }
    },
    themeConfig: {
        smoothScroll: true,
        // logo: '/assets/img/logo.png',
        nav: [
            { text: '文档', link: '/doc/' },
            { text: '设计', link: '/desgin/' },
            { text: '案例', link: '/case/' },
            { text: '插件', link: '/cPlugin/' },
            { text: '开发者', link: '/dev' },
            { text: 'Git', link: 'https://google.com' },
        ],
        sidebar:{
            '/desgin/': [
                {
                    title: 'aaa',
                    children: [
                      '/desgin/line', // 以docs为根目录来查找文件 
                      // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                      // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
                    ]
                } 
            ],
            '/doc/': [
                '/doc/',
                {
                title: '柱状图',
                children: [
                    '/doc/bar/dpr',
                    '/doc/bar/init',
                    '/doc/bar/box',
                    '/doc/bar/selectTheme',
                    '/doc/bar/colors',
                    '/doc/bar/columns',
                    '/doc/bar/chartData',
                    '/doc/bar/grid',
                ]
            },{
                title: '折线图',
                children: [
                    '/doc/line/init'
                ]
            },{
                title: '混合图',
                children: [
                    '/doc/line/init'
                ]
            },{
                title: '环形图',
                children: [
                    '/doc/line/init'
                ]
            }]
          },
          '/':[
              '/'
          ]
    }
}