// import { sign_num,adjacent } from '../_components/util/algorithms'
import { sign_num } from '../components/algorithms/sign_num'

/**
 * 测试 sign_num
 */
let sign_num_mock = [
    [0,0],
    [undefined,0],
    [null,0],
    [41,45],
    [2,2],
    [1,1],
    [1.2,2],
    [103,110],
    [1390,1400],
    [1390.423,1400],
    ['husihui',0],
    [{
        a:123,
        b:'hduei'
    },0],
    ['472deidje',480],
    [0.1234,0.12],
    [0.1362,0.14],
    [-0.2322,-0.23],
    [-102,-110],
    [-102.432,-110],
    [-121,-130],
    ['-102.432',-110],
    [10.5,15],
    [16.5,20],
]

describe.each(sign_num_mock)(`算法 => .sign_num(%i) callback(%i)`,(input, output) => {
        test(`returns ${output}`, () => {
            expect(sign_num(input)).toBe(output);
        });
    },
);



/**
 * 测试 adjacent
 */
// describe('定位 => adjacent',()=>{
//     let arr = [0,1,2,3,4,5,6,7,8,9]
//     it('测试小数 取下', () => {
//         expect(adjacent(3.2,1,arr)).toEqual(expect.objectContaining({
//             position:3,
//             index:3
//         })) 
//     });
//     it('测试小数 取上', () => {
//         expect(adjacent(3.5,1,arr)).toEqual(expect.objectContaining({
//             position:4,
//             index:4
//         })) 
//     });

//     let b_arr = [0,10,20,30,40,50,60,70,80,90]
//     it('测试整数 向上', () => {
//         expect(adjacent(36,10,b_arr)).toEqual(expect.objectContaining({
//             position:40,
//             index:4
//         })) 
//     });
// })


