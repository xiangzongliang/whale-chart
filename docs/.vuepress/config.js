module.exports = {
    title: 'Chart DOC',
    description: 'Just playing around',
    themeConfig: {
        smoothScroll: true,
        // logo: '/assets/img/logo.png',
        nav: [
            { text: '文档', link: '/' },
            { text: '设计', link: '/desgin/' },
            { text: '案例', link: '/case/' },
            { text: '开发者', link: '/dev' },
            { text: 'Git', link: 'https://google.com' },
        ],
        sidebar:{
            '/desgin/': [
                {
                    title: '开始',
                    children: [
                      '/desgin/line', // 以docs为根目录来查找文件 
                      // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                      // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
                    ]
                } 
            ],
      
            // fallback
            '/': [{
                title: '柱状图',
                children: [
                  '/desgin/line', // 以docs为根目录来查找文件 
                  // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                  // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
                ]
            }]
          }
    }
}