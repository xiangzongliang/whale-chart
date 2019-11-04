module.exports = (Mock) => {
    const Random = Mock.Random;
    Mock.setup({
        timeout: '100-200' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
    })
    Mock.mock('/api/chart','post', (req, res) => {
        return Mock.mock({
            "data|5":[{
                'name': '@cword(2)',
                // 'name': '@string(3)',
                "key|-100-100": 2,
                "val|-5-5.2-2":0,
                "pre|-100-100":0,
                "age|20-40":20,
                "time":Random.date('yyyy-MM-dd')
            }]
        })
    })
}